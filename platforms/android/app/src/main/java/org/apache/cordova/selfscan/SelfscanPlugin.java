package org.apache.cordova.selfscan;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.PluginResult;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import static android.app.Activity.RESULT_OK;

public class SelfscanPlugin extends CordovaPlugin {
    //String  result = "";
    private CallbackContext callbackContext;
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if("scan".equals(action)){
            try {
                //下面两句最关键，利用intent启动新的Activity
                Intent intent = new Intent().setClass(cordova.getActivity(), Class.forName("org.apache.cordova.selfscan.ScanActivity"));
                this.cordova.startActivityForResult(this, intent, 1);
                //下面三句为cordova插件回调页面的逻辑代码
               // PluginResult mPlugin = new PluginResult(PluginResult.Status.OK);
                //System.out.println("扫码结果是："+result);
               // PluginResult mPlugin = new PluginResult(PluginResult.Status.OK,result);
                //mPlugin.setKeepCallback(true);
                //callbackContext.sendPluginResult(mPlugin);
                //callbackContext.success(result);
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
                this.callbackContext.success(result);
                break;
            default:
                this.callbackContext.error("error");
                break;
        }
    }
}