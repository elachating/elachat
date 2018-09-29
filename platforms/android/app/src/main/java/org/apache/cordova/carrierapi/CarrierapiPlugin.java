package org.apache.cordova.carrierapi;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.elastos.carrier.FriendInfo;
import org.elastos.carrier.session.AbstractStreamHandler;
import org.elastos.carrier.session.Manager;
import org.elastos.carrier.session.ManagerHandler;
import org.elastos.carrier.session.SessionRequestCompleteHandler;
import org.elastos.carrier.session.Stream;
import org.elastos.carrier.session.StreamState;
import org.elastos.carrier.session.StreamType;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.os.Environment;
import com.eladapps.cloudchat.application.CloudchatApp;
import com.eladapps.cloudchat.carrierapi.Synchronizer;
import com.eladapps.cloudchat.untils.FileUtils;

import org.elastos.carrier.Carrier;
import org.elastos.carrier.UserInfo;
import org.elastos.carrier.FriendInfo;
import org.elastos.carrier.exceptions.ElastosException;
import org.elastos.carrier.session.Session;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;


public class CarrierapiPlugin extends CordovaPlugin {
    UserInfo myinfo;
     Manager sessionMgra;
     Session activsession;
     String fromuid;
     Stream activstream;
     String sessionRequestSdp;

    private String s1;
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        Carrier curcarrier = Carrier.getInstance();

       if("getmyinfo".equals(action)){
            try {
                String uid = curcarrier.getSelfInfo().getUserId();
                String uaddress = curcarrier.getAddress().toString();
                String nickname = curcarrier.getSelfInfo().getName();
                //System.out.println();
                JSONObject uinfo = new JSONObject();
                uinfo.put("uid",uid);
                uinfo.put("uaddress",uaddress);
                uinfo.put("nickname",nickname);
               // System.out.println("当前账户信息："+uinfo.toString());
                callbackContext.success(uinfo);
                //curcarrier.getFriend(fromuid).setLabel();
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取当前信息失败！");
                return true;
            }
        }else if("setmyinfo".equals(action)){
            try {
                String nickname = args.getString(0);
                //System.out.println("设置的昵称为："+nickname);
                String email = args.getString(1);
                String headimg = args.getString(2);
                try{
                    UserInfo  myinfos = curcarrier.getSelfInfo();
                    myinfos.setName(nickname);
                    myinfos.setEmail("");
                    myinfos.setGender("");
                    myinfos.setPhone("");
                    myinfos.setDescription("");
                    myinfos.setRegion("");
                    curcarrier.setSelfInfo(myinfos);
                }catch(ElastosException e){
                    e.printStackTrace();
                }
                callbackContext.success();
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("设置用户相关信息失败！");
                return true;
            }
        }else if("joinfriend".equals(action)){
           String flag = "1";
           try {
               String faddress = args.getString(0);
               String hellomessage = args.getString(1);
               //System.out.println("地址："+faddress);
               //System.out.println("备注："+hellomessage);
               //curcarrier.addFriend(faddress,hellomessage);
               if( !Carrier.isValidAddress(faddress)){
                   //无效地址
                   flag = "-1";
               }else{
                   curcarrier.addFriend(faddress,hellomessage);
                   //好友请求发送成功
                   flag = "1";
               }
               callbackContext.success(flag);
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("removefriend".equals(action)){
           try {
               String fuid = args.getString(0);
               curcarrier.removeFriend(fuid);
               callbackContext.success("1");
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("acceptfriend".equals(action)){
           try {
               String fuid = args.getString(0);
               curcarrier.AcceptFriend(fuid);
               callbackContext.success("1");
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("friendlist".equals(action)){
           List<FriendInfo> friendlists;
           JSONArray frinedlistjson = new JSONArray();
           try {
               try{
                   Integer j = 0;
                   friendlists= curcarrier.getFriends();
                   for(j=0;j<friendlists.size();j++){
                       UserInfo u = friendlists.get(j);
                       JSONObject subjson = new JSONObject();
                       subjson.put("uid",u.getUserId());
                       System.out.println("昵称："+u.getName());
                       if(!u.getName().equals("") && !u.getName().equals(null)){
                           subjson.put("nickname",u.getName());
                           String fristzm = converterToFirstSpell(u.getName());
                           String f = fristzm.substring(0,1).toUpperCase();
                           String fzm ="";
                           if(f.matches("^[A-Z]+$")){
                               fzm = f.substring(0,1).toUpperCase();
                           }else{
                               fzm = "#";
                           }
                           subjson.put("alpha",fzm);
                           subjson.put("on",1);
                       }else{
                           subjson.put("nickname",u.getUserId().substring(0,5)+"...(Offline)");
                           String fzm = "#";
                           subjson.put("alpha",fzm);
                           subjson.put("on",0);
                       }
                       frinedlistjson.put(subjson);
                   }
               }catch (ElastosException e){
                   e.printStackTrace();
               }
               callbackContext.success(frinedlistjson.toString());
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("sendmessage".equals(action)){
           try {
               String fuid = args.getString(0);
               String msg = args.getString(1);
               try{
                   curcarrier.sendFriendMessage(fuid,msg);
               }catch (ElastosException e){
                   e.printStackTrace();
               }
               callbackContext.success("1");
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("getfriendlist".equals(action)){
           try {
               List<FriendInfo> finfo = curcarrier.getFriends();
               JSONArray json = new JSONArray();
               for(int i=0;i<finfo.size();i++){
                   JSONObject obj = new JSONObject();
                   obj.put("userid", finfo.get(i).getUserId());
                   obj.put("nickname",finfo.get(i).getName());
                   json.put(obj);
               }
               callbackContext.success(json.toString());
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("sendfile".equals(action)){
           try {
               //文件类型
               String fcate = args.getString(0);
               //文件路径
               String fdir = args.getString(1);
               //文件扩展名
               String exten = args.getString(2);
               //接受端UID
               String fuid = args.getString(3);
               //此处处理文件发送功能
               sendfiles(curcarrier,fuid,fdir,exten,fcate);
               callbackContext.success("1");
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("0");
               return true;
           }
       }else if("getfriendinfo".equals(action)){
           try {
               String userId = args.getString(0);
               FriendInfo friendInfo = curcarrier.getFriend(userId);
               String nickname = friendInfo.getName();
               JSONObject uinfo = new JSONObject();
               System.out.println("userId11111 = "+userId);
               if(!friendInfo.getName().equals("") && !friendInfo.getName().equals(null)){
                   //System.out.println("nickname11111 = "+nickname);
                   uinfo.put("nickname",nickname);
               }else{
                   //System.out.println("aaaaaaaaa = "+nickname);
                   uinfo.put("nickname",userId);
               }
               callbackContext.success(uinfo);
               return true;
           } catch (Exception e) {
               e.printStackTrace();
               callbackContext.error("获取当前信息失败！");
               return true;
           }

       }
        return super.execute(action, args, callbackContext);
    }
    /**
     * 汉字转换位汉语拼音首字母，英文字符不变
     *
     * @param chines
     *            汉字
     * @return 拼音
     */
    public static String converterToFirstSpell(String chines) {
        chines = cleanChar(chines);
        String pinyinName = "";
        char[] nameChar = chines.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            if (nameChar[i] > 128) {
                try {
                    pinyinName += PinyinHelper.toHanyuPinyinStringArray(nameChar[i], defaultFormat)[0].charAt(0);
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } else {
                pinyinName += nameChar[i];
            }
        }
        return pinyinName;
    }

    /**
     * 清理特殊字符以便得到
     * @param chines
     * @return
     */
    public static String cleanChar(String chines) {
        chines = chines.replaceAll("[\\p{Punct}\\p{Space}]+", ""); // 正则去掉所有字符操作
        // 正则表达式去掉所有中文的特殊符号
        String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}<>《》【】‘；：”“’。，、？]";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(chines);
        chines = matcher.replaceAll("").trim();
        return chines;
    }
    //文件发送功能
     Manager sessionMgr;
    //建立链接过程
    public  void setUps(Carrier mycarrier) {
        try {
           sessionMgr = Manager.getInstance(mycarrier);
        } catch (ElastosException e) {
             e.printStackTrace();
        }
    }
    //测试过程
    public void sendfiles(Carrier curcarrier,String fuid,String fdir,String exten,String fcate) {
        setUps(curcarrier);
        try {
            //newsession

            Session session = sessionMgr.newSession(fuid);
            //实例化流的handler处理
            TestStreamHandler streamHandler = new TestStreamHandler();
            //指明传输  流 的类型

            Stream  stream = session.addStream(StreamType.Text, 0, streamHandler);


            //排队等待处理
            streamHandler.synch.await();
            //实例化完成session请求的实例
            TestSessionRequestCompleteHandler reqCompleteHandler = new TestSessionRequestCompleteHandler();
            // 请求
            System.out.println("SESSION开始发送数据：");
            session.request(reqCompleteHandler);
            // 排队等待
            streamHandler.synch.await();
            System.out.println("request_received");
            //排队等待
            reqCompleteHandler.synch.await();
            //session开始发送完成的handler
            session.start(reqCompleteHandler.sdp);
            System.out.println("session.start");
            //排队等待
            streamHandler.synch.await();
            streamHandler.synch.await();
            //开始发送
            //String string = "hello world";
            //byte[] dataa = string.getBytes();
            //System.out.println("文件路径是："+fdir);
           // byte [] dataa = getBytes(fdir);
            String fdira = "/storage/emulated/0/Download/1.txt";
            byte[] dataa = getfilebyte(fdira);
            String ss = new String(dataa);
            System.out.println("文件转化为字节后转化的字符串是1："+dataa);
            System.out.println("文件转化为字节后转化的字符串是2："+ss);
            stream.writeData(dataa);

            /*
            System.out.println("writeData："+datab);
            int num = 2038;
            System.out.println("filelength = "+len);
            System.out.println("datab.length = "+datab.length);
            streamHandler.setDataLength(0);


            byte[] senddata = new byte[num];
            byte[] head = new byte[10];

            while(len > 0){
                int n = streamHandler.getSendSize();
                for(int i = 0;i<n;i++ ){
                    for(int a = 0;a<num;a++){
                        senddata[a] = datab[(int)(i*num)+ a];
                    }
                    System.out.println("senddata.length ="+senddata.length);
                    streamHandler.setDataLength((i+1) * num);
                    for(int a = 0 ;a < Integer.toString(i+1).getBytes().length; a++){
                        head[a] = Integer.toString(i+1).getBytes()[a];
                    }
                }
                streamHandler.synch.await();
            }
            */
            //排队等待
            System.out.println("session to close");
            //释放  字节流 的内存
            session.removeStream(stream);
            //关闭session
            session.close();
            System.out.println("session.close()");
        } catch (ElastosException e) {
            e.printStackTrace();
        }
    }
    //处理流handler 监听接收状态
    class TestStreamHandler extends AbstractStreamHandler {
        Synchronizer synch = new Synchronizer();
        Stream stream;
        StreamState state;

        byte[] receivedData;
        int dataLength;
        int sendSize = 20;

        @Override
        public void onStateChanged(Stream stream, StreamState state) {
            this.stream = stream;
            this.state = state;
            synch.wakeup();
        }

        @Override
        public void onStreamData(Stream stream, byte[] receivedData) {
           this.stream = stream;
            this.receivedData = receivedData;
            int datasLength = Integer.parseInt(new String(this.receivedData));
        }

        private int getSendSize (){
            return this.sendSize;
        }

        private void setDataLength (int length){
            this.dataLength = length;
        }
    }
    // session请求完成的handler 处理
    static class TestSessionRequestCompleteHandler implements SessionRequestCompleteHandler {
        Synchronizer synch = new Synchronizer();

        Session session;
        int status;
        String reason;
        String sdp;

        public void onCompletion(Session session, int status, String reason, String sdp) {
            this.session = session;
            this.status = status;
            this.reason = reason;
            this.sdp = sdp;
            synch.wakeup();
        }
    }
    /**
     * 获得指定文件的byte数组
     */
    private byte[] getBytes(String filePath){
        byte[] buffer = null;
        try {
            File file = new File(filePath);
            FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream(167772);
            byte[] b = new byte[167772];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();
            buffer = bos.toByteArray();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return buffer;
    }
    public byte[] getfilebyte(String fdir){
        try {
            File file = new File(fdir);
            InputStream in = new FileInputStream(file);
            byte[] curfilebyte = new byte[(int) file.length()];
            return curfilebyte;
        }catch (Exception e){
            e.printStackTrace();
            byte[] a = new byte[0];
            a[0] = 0;
            return a;
        }
    }    /**
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
}