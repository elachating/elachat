package org.apache.cordova.toastapi;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.json.JSONException;

public class StoastapiPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if("showtoast".equals(action)){
            showToast(args.getString(0),args.getInt(1));
        }
        return true;
    }
    private void showToast(String text, int type) {
        android.widget.Toast.makeText(cordova.getActivity(), text, type).show();
    }
}