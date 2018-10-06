package org.apache.cordova.chatdb;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.ContentValues;
import android.database.SQLException;
import android.os.Environment;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import android.database.sqlite.SQLiteDatabase;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import android.database.Cursor;

public class DbapiPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        List<Map<String, String>> list=new ArrayList<Map<String,String>>();
        SQLiteDatabase sqldb = SQLiteDatabase.openOrCreateDatabase("/data/data/com.eladapps.cloudchat/chat.db",null);
        if("newfriendlist".equals(action)){
            try {
                Cursor result = sqldb.query ("newfirendlist",new String[]{"userid,yn,hello"},null,null,null,null,null);
                JSONArray json = new JSONArray();
                if(result.moveToFirst()){
                    while(!result.isAfterLast()){
                        String fuserid = result.getString(result.getColumnIndex("userid"));
                        String hello = result.getString(result.getColumnIndex("hello"));
                        Integer yn = result.getInt(result.getColumnIndex("yn"));
                       // Map<String, String> maps = new HashMap<String, String>();
                        JSONObject obj = new JSONObject();
                        obj.put("userid", fuserid);
                        obj.put("yn",yn.toString());
                        obj.put("message",hello);
                        //System.out.println("数据："+maps.toString());
                        json.put(obj);
                        result.moveToNext();
                    }
                }
                result.close();
                sqldb.close();
                callbackContext.success(json.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("friendlist".equals(action)){
            try {
                Cursor result = sqldb.query ("firendlist",new String[]{"userid"},null,null,null,null,null);
                JSONArray json = new JSONArray();
                if(result.moveToFirst()){
                    while(!result.isAfterLast()){
                        String fuserid = result.getString(result.getColumnIndex("userid"));
                        JSONObject obj = new JSONObject();
                        obj.put("userid", fuserid);
                        json.put(obj);
                        result.moveToNext();
                    }
                }
                result.close();
                sqldb.close();
                callbackContext.success();
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("updatenewfriend".equals(action)){
            try {
                String uid = args.getString(0);
                ContentValues valb = new ContentValues();
                valb.put("yn",1);
                sqldb.update("newfirendlist", valb, "userid=?", new String[] { uid});
                addfirendlist(sqldb,uid);
                sqldb.close();
                callbackContext.success(1);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("insertchat".equals(action)){
            try {
                String fuid = args.getString(0);
                String myuid = args.getString(1);
                String contents = args.getString(2);

                System.out.println("发送者："+myuid);

                ContentValues valb = new ContentValues();
                Date date = new Date();
                SimpleDateFormat curtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                valb.put("curtime", curtime.format(date));
                valb.put("sender", myuid);
                valb.put("content", contents);
                valb.put("yn", 1);
                valb.put("curtime", curtime.format(date));
                valb.put("reciver", fuid);
                sqldb.insert("messagelist", null, valb);
                sqldb.close();
                callbackContext.success(1);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("newchatlist".equals(action)){
            try {
                updatechatstatus(sqldb);
                String uid = args.getString(0);
                Cursor result = sqldb.query ("messagelist",new String[]{"sender,content,curtime"},"sender=? or reciver=? ",new String[]{uid,uid},null,null,"id DESC,curtime ASC","0,10");
                JSONArray json = new JSONArray();
                JSONArray jsona = new JSONArray();
                if(result.moveToFirst()){
                    while(!result.isAfterLast()) {
                        String sender = result.getString(result.getColumnIndex("sender"));
                        String content = result.getString(result.getColumnIndex("content"));
                        String ctime = result.getString(result.getColumnIndex("curtime"));
                        //String regEx_style="<hr><button[^>]*?>[\\s\\S]*?<\\/button>"; //定义style的正则表达式
                        String regEx_style="<img[^>]*?\\/><div style='float:left;width:120px;height:50px;margin-left:10px;'>"; //定义style的正则表达式

                        Pattern p_style=Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE);
                        Matcher m_style=p_style.matcher(content);
                        content=m_style.replaceAll(""); //过滤style标签
                        content=content.replace("</div>","");
                       // Integer yn = result.getInt(result.getColumnIndex("yn"));
                        JSONObject obj = new JSONObject();
                        if (sender.equals(uid)) {
                            System.out.println("SEND：" + uid);
                            obj.put("whos", "received");
                        } else {
                            //System.out.println("RECEIVED");
                            obj.put("whos", "send");
                        }
                        obj.put("sender", sender);
                        obj.put("content", content.trim());
                        String[] ctimea = ctime.split(" ");
                        obj.put("ctime", ctimea[0]);
                        //obj.put("cate", cate);
                        json.put(obj);
                        result.moveToNext();
                    }
                    for(int jsonlen=json.length()-1;jsonlen>=0;jsonlen--){
                        jsona.put(json.get(jsonlen));
                    }
                }
                result.close();
                sqldb.close();
                callbackContext.success(jsona.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("nchatlist".equals(action)){
            try {
                String uid = args.getString(0);
                 Cursor result = sqldb.query ("messagelist",new String[]{"sender,content,yn"},"sender=? or reciver=? ",new String[]{uid,uid},null,null,null);
                JSONArray json = new JSONArray();
                if(result.moveToFirst()){
                    while(!result.isAfterLast()) {
                        String sender = result.getString(result.getColumnIndex("sender"));
                        String content = result.getString(result.getColumnIndex("content"));
                        Integer yn = result.getInt(result.getColumnIndex("yn"));
                        JSONObject obj = new JSONObject();
                      if(yn==0){
                            if (sender.equals(uid)) {
                                System.out.println("SEND：" + uid);
                                obj.put("whos", "received");
                            } else {
                                //System.out.println("RECEIVED");
                                obj.put("whos", "send");
                            }
                            obj.put("sender", sender);
                            obj.put("content", content);
                            //obj.put("cate", cate);
                            json.put(obj);
                       }
                        result.moveToNext();
                    }
                }
                updatechatstatus(sqldb);
                result.close();
                sqldb.close();
                callbackContext.success(json.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("newmessage".equals(action)){
            try {
                String myuid = args.getString(0);
                System.out.println("myuid = " + myuid);

                Cursor result = sqldb.query ("messagelist",new String[]{"sender,reciver,content,curtime,yn"},null,null,null,null,null);
                JSONObject json = new JSONObject();
                if(result.moveToFirst()){
                    while(!result.isAfterLast()) {
                        System.out.println("result.isAfterLast():");
                        String sender = result.getString(result.getColumnIndex("sender"));
                        String receiver = result.getString(result.getColumnIndex("reciver"));
                        String content = result.getString(result.getColumnIndex("content"));
                        String curtime = result.getString(result.getColumnIndex("curtime"));
                        Integer yn = result.getInt(result.getColumnIndex("yn"));
                        JSONObject obj = new JSONObject();
                        if(myuid.equals(sender)){
                            obj.put("friendId", receiver);
                        }else{
                            obj.put("friendId", sender);
                        }
                        obj.put("content", content);
                        obj.put("curtime", curtime);
                        obj.put("num",0);
                        System.out.println("json.length = "+json.length());
                        Iterator iterator = json.keys();
                        while(iterator.hasNext()){
                            String key = (String) iterator.next();
                            if(key.equals(obj.get("friendId").toString())){
                                if(yn.equals(0)){
                                    int num = json.getJSONObject(key).getInt("num");
                                    obj.put("num",num+1);
                                }else{
                                    obj.put("num",0);
                                }
                            }
                        }
                        json.put(obj.get("friendId").toString(),obj);
                        result.moveToNext();

                    }
                }
                result.close();
                sqldb.close();
                callbackContext.success(json.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("nnchatlist".equals(action)){
            try {
                String uid = args.getString(0);
                String json = getnewmessagelist(sqldb,uid);
                callbackContext.success(json.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }else if("getmessageoflimit".equals(action)){
            try {
                String uid = args.getString(0);
                String limitstr = args.getString(1);
                String json = getmessageslist(sqldb,uid,limitstr);
                callbackContext.success(json.toString());
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
        }
        return super.execute(action, args, callbackContext);
    }
    public void addfirendlist(SQLiteDatabase sqldb,String userid){
        ContentValues values = new ContentValues();
        values.put("userid", userid);
        sqldb.insert("firendlist", null, values);
    }
    public void updatechatstatus(SQLiteDatabase sqldb){
        ContentValues values = new ContentValues();
        values.put("yn", 1);
        //sqldb.update("messagelist", null, values);
        sqldb.update("messagelist", values, null,null);
    }
    //删除新消息列表信息
    public void delnewmessage(SQLiteDatabase sqldb,String uid){
        try {
            sqldb.delete("newmessagelist", "sender=? or reciver=? ", new String[]{uid, uid});
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
    //获取新消息表信息
    public String getnewmessagelist(SQLiteDatabase sqldb,String uid) throws Exception{
            Cursor result = sqldb.query("newmessagelist", new String[]{"sender,content,yn"}, "sender=? or reciver=? ", new String[]{uid, uid}, null, null, null);
            JSONArray json = new JSONArray();
            if (result.moveToFirst()) {
                while (!result.isAfterLast()) {
                    String sender = result.getString(result.getColumnIndex("sender"));
                    String content = result.getString(result.getColumnIndex("content"));
                    Integer yn = result.getInt(result.getColumnIndex("yn"));
                    JSONObject obj = new JSONObject();
                    //if (yn == 0) {
                        if (sender.equals(uid)) {
                            System.out.println("SEND：" + uid);
                            obj.put("whos", "received");
                        } else {
                            //System.out.println("RECEIVED");
                            obj.put("whos", "send");
                        }
                        obj.put("sender", sender);
                        obj.put("content", content);
                        //obj.put("cate", cate);
                        json.put(obj);
                    //}
                    result.moveToNext();
                }
            }
            delnewmessage(sqldb,uid);
            result.close();
            sqldb.close();
            return json.toString();
    }
    //获取指定条件下的有限条数据
    public String getmessageslist(SQLiteDatabase sqldb,String uid,String limitstr) throws Exception{
            //updatechatstatus(sqldb);
            Cursor result = sqldb.query ("messagelist",new String[]{"sender,content,curtime"},"sender=? or reciver=? ",new String[]{uid,uid},null,null,"id desc",limitstr);
            JSONArray json = new JSONArray();
            JSONArray jsona = new JSONArray();
            if(result.moveToFirst()){
                while(!result.isAfterLast()) {
                    String sender = result.getString(result.getColumnIndex("sender"));
                    String ctime = result.getString(result.getColumnIndex("curtime"));
                    String content = result.getString(result.getColumnIndex("content"));
                    String regEx_style="<img[^>]*?\\/><div style='float:left;width:120px;height:50px;margin-left:10px;'>";
                    Pattern p_style=Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE);
                    Matcher m_style=p_style.matcher(content);
                    content=m_style.replaceAll(""); //过滤style标签
                    content=content.replace("</div>","");
                    JSONObject obj = new JSONObject();
                    if (sender.equals(uid)) {
                        System.out.println("SEND：" + uid);
                        obj.put("whos", "received");
                    } else {
                        obj.put("whos", "send");
                    }
                    obj.put("sender", sender);
                    obj.put("content", content.trim());
                    String[] ctimea = ctime.split(" ");
                    obj.put("ctime", ctimea[0]);

                    json.put(obj);
                    result.moveToNext();
                }
                for(int jsonlen=json.length()-1;jsonlen>=0;jsonlen--){

                   jsona.put(json.get(jsonlen));
                }

            }
            result.close();
            sqldb.close();
            return jsona.toString();
    }
}
