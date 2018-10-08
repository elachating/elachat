/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.eladapps.cloudchat;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Bundle;
import android.view.KeyEvent;

import org.apache.cordova.*;
import java.util.List;

public class CloudchatActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        if(isApplicationInBackground()){
            loadUrl("file:///android_asset/www/indexs.html");
        }else{
            loadUrl(launchUrl);
        }
    }
    public Boolean isApplicationInBackground() {
    		ActivityManager am = (ActivityManager) this.getSystemService(Context.ACTIVITY_SERVICE);
    		String curPackageName = getApplicationContext().getPackageName();
    		List<ActivityManager.RunningAppProcessInfo> app = am.getRunningAppProcesses();
    		if(app==null){
                return false;
    		}
    		for(ActivityManager.RunningAppProcessInfo a:app){
    		   if(a.processName.equals(curPackageName)&& a.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND){
                  return true;
                }
    		}
    		return false;
        }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_HOME:
            System.out.println("当前时间戳："+System.currentTimeMillis());
            break;
        }
         return super.onKeyDown(keyCode, event);
    }
    /*
    public String isApplicationInBackground() {
        //this.mcontext = context;
        Context context= this.getApplicationContext();
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> taskList = am.getRunningTasks(1);
        System.out.println("提示1:");
        if (taskList != null && !taskList.isEmpty()) {
            System.out.println("提示2:");
            ComponentName topActivity = taskList.get(0).topActivity;
            System.out.println("提示3:"+topActivity.getPackageName());
            if (topActivity != null && !topActivity.getPackageName().equals(context.getPackageName())){
                return "1";
            }
        }
        return "0";
    }
    */
}
