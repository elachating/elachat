package org.apache.cordova.micrvideo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONException;

public class SelfmicrvideoPlugin extends CordovaPlugin {
    //String  result = "";
    private CallbackContext callbackContext;
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if("start".equals(action)){
            try {
                //下面两句最关键，利用intent启动新的Activity
                Intent intent = new Intent().setClass(cordova.getActivity(), Class.forName("org.apache.cordova.micrvideo.MicrvodeoActivity"));
                this.cordova.startActivityForResult(this, intent, 1);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }
    //onActivityResult为第二个Activity执行完后的回调接收方法
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent){
        switch (resultCode) { //resultCode为回传的标记，我在第二个Activity中回传的是RESULT_OK
            case Activity.RESULT_OK:
                Bundle b=intent.getExtras();  //data为第二个Activity中回传的Intent
                String result = b.getString("result");//str即为回传的值
                System.out.println("视频存放地址："+result);
                this.callbackContext.success(result);
                break;
            default:
                this.callbackContext.error("error");
                break;
        }
    }
}