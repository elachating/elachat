package com.eladapps.cloudchat.application;

import android.app.Application;

import com.eladapps.cloudchat.MessageManager;
import com.eladapps.cloudchat.carrierapi.Synchronizer;
import com.eladapps.cloudchat.carrierapi.TestOptions;
import android.content.Context;

import org.elastos.carrier.AbstractCarrierHandler;
import org.elastos.carrier.Carrier;
import org.elastos.carrier.ConnectionStatus;
import org.elastos.carrier.UserInfo;
import org.elastos.carrier.exceptions.ElastosException;
import org.elastos.carrier.session.AbstractStreamHandler;
import org.elastos.carrier.session.Manager;
import org.elastos.carrier.session.ManagerHandler;
import org.elastos.carrier.session.Session;
import org.elastos.carrier.session.Stream;
import org.elastos.carrier.session.StreamState;
import org.elastos.carrier.session.StreamType;

import android.content.Intent;
import android.database.Cursor;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.util.Log;

import java.io.BufferedOutputStream;
import java.io.File;

import android.database.sqlite.SQLiteDatabase;
import android.content.ContentValues;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import android.os.Message;

public class CloudchatApp extends Application{
    Carrier carrierInst = null;
    String carrierAddr = null;
    String carrierUserID = null;
    String TAG = "Carrier Cloudchat Output：";
    static String sender = "";
    static String contents = "";
    private MessageManager chatManager;
    static byte[] filebyte;
    static int filenum;
    static int filetranid;
    Manager sessionMgra;
    Session activsession;
    String sessionRequestSdp;
    Context mcontext;
    @Override
    public void onCreate() {
        super.onCreate();
        //判断文件是否存在
        /*
        File filea = new File("data/data/com.eladapps.cloudchat/voice.txt");
        if (filea.exists()) {}else{
            try{
                String msg = "1";
                filea.createNewFile();
                OutputStream outputStream = openFileOutput("data/data/com.eladapps.cloudchat/voice.txt",Context.MODE_APPEND);
                outputStream.write(Integer.parseInt(msg));
                outputStream.flush();
                outputStream.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        */
        //判断数据库
        SQLiteDatabase db = SQLiteDatabase.openOrCreateDatabase("/data/data/com.eladapps.cloudchat/chat.db",null);
        String sqla="create table if not exists messagelist ("
                + "id integer primary key autoincrement,"
                + "sender text, "
                + "content text, "
                + "yn integer,"
                + "curtime datetime,"
                + "reciver text)";
        String sqlb="create table if not exists firendlist("
                + "id integer primary key autoincrement, "
                + "userid text, "
                + "remark text,"
                + "nickname text)";
        String sqlc ="create table if not exists newfirendlist("
                + "id integer primary key autoincrement,"
                + "userid text,"
                + "yn integer,"
                + "hello text,"
                + "nickname text)";

        String sqld ="create table if not exists newmessagelist ("
                + "id integer primary key autoincrement,"
                + "sender text, "
                + "content text, "
                + "yn integer,"
                + "curtime datetime,"
                + "reciver text)";

        db.execSQL(sqla);
        db.execSQL(sqlb);
        db.execSQL(sqlc);
        db.execSQL(sqld);

        db.close();
        TestOptions options = new TestOptions(getAppPath());
        TestHandler handler = new TestHandler();
        //1.初始化实例，获得相关信息
        try {
            //1.1获得Carrier的实例
            Carrier.initializeInstance(options, handler);
            carrierInst = Carrier.getInstance();
            //1.2获得Carrier的地址
            carrierAddr = carrierInst.getAddress();
            //Log.i(TAG,"address: " + carrierAddr);
            //1.3获得Carrier的用户ID
            carrierUserID = carrierInst.getUserId();
            //Log.i(TAG,"userID: " + carrierUserID);
            //1.4启动网络
            carrierInst.start(1000);
            handler.synch.await();
           // Log.i(TAG,"carrier client is ready now");
            setUp(carrierInst);
        } catch (ElastosException e) {
            e.printStackTrace();
        }
    }
    public String getsender(){
        //System.out.println("获取到的发送者："+sender);
        return sender;
    }
    public  String getcontents(){
        return contents;
    }
    public void setsender(){
        //System.out.println("初始化发送者");
        sender="";
    }
    /* 文件传输相关 */
    //文件传输正文开始标志
    public void setfiletranid(int a){
        filetranid = a;
    }
    //获取文件传输正文标志
    public int getfiletranid(){
        return filetranid;
    }
    //清空文件传输正文标志
    public void clearfiletranid(){
        filetranid = 0;
    }
    //设置传输文件的字节大小
    public void setfilenum(int a){
        filenum = a;
    }
    //获取传输文件的字节大小
    public int getfilenum(){
        return filenum;
    }
    //清空传输文件的字节大小
    public void clearfilenum(){
         filenum=0;
    }
    //清空传输文件正文
    public void clearfilebyte(){
        filebyte = null;
    }
    //合并文件传输正文
    public void setfilebyte(byte[] bt1, byte[] bt2){
        byte[] bt3 = new byte[bt1.length+bt2.length];
        System.arraycopy(bt1, 0, bt3, 0, bt1.length);
        System.arraycopy(bt2, 0, bt3, bt1.length, bt2.length);
        filebyte = bt3;
    }
    //第一次设置
    public void setfilebyteone(byte[] bt){
            filebyte = bt;
    }

    //获取文件传输正文
    public byte[] getfilebyte(){
        return  filebyte;
    }
    /* 文件传输结束 */
    public void setcontents(){
        contents = "";
    }
    public  MessageManager getMessageManager(){
        chatManager = new MessageManager();
        return chatManager;
    }
    private String getAppPath() {
        Context context=this;
        File file=context.getFilesDir();
        String path=file.getAbsolutePath();
        //System.out.println("路径："+path);
        return path;
    }

     class TestHandler extends AbstractCarrierHandler {
        Synchronizer synch = new Synchronizer();
        String from;
        ConnectionStatus friendStatus;
        String CALLBACK="call back";
        public void onReady(Carrier carrier) {
            synch.wakeup();
        }
        public void onFriendConnection(Carrier carrier, String friendId, ConnectionStatus status) {
           // Log.i(CALLBACK,"friendid:" + friendId + "connection changed to: " + status);
            from = friendId;
            friendStatus = status;
            if (friendStatus == ConnectionStatus.Connected)
                synch.wakeup();
        }
        //2.2 通过好友验证
        public void onFriendRequest(Carrier carrier, String userId, UserInfo info, String hello) {
                SQLiteDatabase sqldba = SQLiteDatabase.openOrCreateDatabase("/data/data/com.eladapps.cloudchat/chat.db",null);
                ContentValues valuesa = new ContentValues();
                valuesa.put("userid", userId);
                valuesa.put("yn", 0);
                valuesa.put("hello", hello);
               // System.out.println("新增的字段数据："+valuesa.toString());
                sqldba.insert("newfirendlist", null, valuesa);
        }
        @Override
        //3.2 接受好友信息
        public void onFriendMessage(Carrier carrier,String fromId, String message) {
            //Log.i(CALLBACK,"address:" + fromId + "connection changed to: " + message);
            try {
                String reveiverid = carrier.getUserId().toString();
                SQLiteDatabase sqldb = SQLiteDatabase.openOrCreateDatabase("/data/data/com.eladapps.cloudchat/chat.db",null);
                Date date = new Date();
                SimpleDateFormat curtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                curtime.format(date);
                ContentValues values = new ContentValues();
                values.put("sender", fromId);
                values.put("content", message);
                values.put("yn", 0);
                values.put("curtime",curtime.format(date).toString());
                values.put("reciver",reveiverid);
                System.out.println("当前时间为："+values.toString());
                sqldb.insert("messagelist", null, values);
                sqldb.insert("newmessagelist", null, values);
                sender = fromId;
                contents = message;


                List<String> var1 = new ArrayList<String>();
                var1.add(fromId);
                var1.add(message);

                startAlarm();

                chatManager.onMessageReceived(var1);

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    /* 以下是文件传输功能 */

    //准备接受数据，建立session
    public void setUp(Carrier curcarrier) {
        //System.out.println("准备建立Session!");
        try {
            sessionMgra = Manager.getInstance(curcarrier, new ManagerHandler(){
                @Override
                public void onSessionRequest(Carrier carrier, String s, String s1) {
                    //System.out.println("来自"+s);
                    //System.out.println("状态"+s1);
                    sessionRequestSdp = s1;
                    //System.out.println("开始在此处创建newsession，并且添加steam"+s1);
                    createsessionjoinstream(s);
                }
            });
        } catch (ElastosException e) {
            e.printStackTrace();
        }
    }
    /*
     *
     * 以下功能是接受数据
     *
     * */
    public void createsessionjoinstream(String s){
        try{
            activsession = sessionMgra.newSession(s);
            activsession.addStream(StreamType.Text,0,new AbstractStreamHandler() {
                Synchronizer synch1 = new Synchronizer();
                Stream stream1;
                StreamState state;
                byte[] receivedData1;
                byte[] datas = null;
                int position;
                @Override
                public void onStateChanged(Stream stream, StreamState state) {
                    //System.out.println("当前的Stream " + "'s state changed1111 to be " + state.name());
                    try {
                        switch (state.name()) {
                            case "Initialized":
                                activsession.replyRequest(0, null);
                                break;
                            case "TransportReady":
                                activsession.start(sessionRequestSdp);
                                break;
                            case "Connected":
                                datas = null;
                                System.out.println("建立连接");
                                break;
                            case "Closed":
                                break;
                            default:
                                break;
                        }
                    } catch (ElastosException e) {
                        e.printStackTrace();
                    }
                    synch1.wakeup();
                }
                @Override
                public void onStreamData(Stream stream, byte[] data) {
                    this.stream1 = stream;
                    this.receivedData1 = data;
                    String ss = new String(data);
                    //System.out.println("接受到的数据结果："+data);
                    String filepath = "/storage/emulated/0/Download/";
                    String filename = "1.txt";
                    getFile(data,filepath,filename);
                }
            });
        }catch (ElastosException e){
            e.getMessage();
        }
    }
    /**
     * 根据byte数组，生成文件
     */
    public static void getFile(byte[] bfile, String filePath,String fileName) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            File dir = new File(filePath);
            if(!dir.exists()&&dir.isDirectory()){//判断文件目录是否存在
                dir.mkdirs();
            }
            file = new File(filePath+"//"+fileName);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(bfile);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
    }
    private void startAlarm() throws IOException {
        File file = new File("data/data/com.eladapps.cloudchat/voice.txt");
        if (file.exists()) {

            FileInputStream fis = new FileInputStream(file);
            int length = fis.available();
            byte [] buffer = new byte[length];
            fis.read(buffer);
            String res = new String(buffer, "UTF-8");
            fis.close();
            if(res.equals("0")){

            }else{
                Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                if (notification == null) return;
                Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
                r.play();
            }
        }else{
            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            if (notification == null) return;
            Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
            r.play();
        }
    }
    //读取指定文件
    public String getmvsinfo () throws IOException {
        File file = new File("data/data/com.eladapps.cloudchat/voice.txt");
        FileInputStream fis = new FileInputStream(file);
        int length = fis.available();
        byte [] buffer = new byte[length];
        fis.read(buffer);
        String res = new String(buffer, "UTF-8");
        fis.close();
        return res;
    }
}