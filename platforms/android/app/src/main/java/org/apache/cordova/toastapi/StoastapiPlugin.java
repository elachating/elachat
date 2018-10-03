package org.apache.cordova.toastapi;

import android.Manifest;
import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.json.JSONException;

import java.util.List;

public class StoastapiPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if("showtoast".equals(action)){
            showToast(args.getString(0),args.getInt(1));
        }else if("judgestorage".equals(action)){
            requestPermission();
        }
        return true;
    }
    private void showToast(String text, int type) {
        android.widget.Toast.makeText(cordova.getActivity(), text, type).show();
    }
    /**
     * * 申请权限
     */
    private void  requestPermission(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            if (ContextCompat.checkSelfPermission(cordova.getActivity(), "Manifest.permission.CAMERA")
                    != PackageManager.PERMISSION_GRANTED) {
                //注意第二个参数没有双引号
                ActivityCompat.requestPermissions(cordova.getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
                ActivityCompat.requestPermissions(cordova.getActivity(), new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
            }
        }
        //return "1";
    }
}