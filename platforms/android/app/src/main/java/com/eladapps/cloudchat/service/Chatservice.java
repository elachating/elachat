package com.eladapps.cloudchat.service;


import android.annotation.SuppressLint;
import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;

import com.eladapps.cloudchat.application.CloudchatApp;
public class Chatservice extends Service {
    private final String TAG = this.getClass().getSimpleName();
    Messenger mMessenger = new Messenger(
    new Handler() {
        @Override
        public void handleMessage(final Message msg) {
                //回复消息给客户端
                Message replyMsg = Message.obtain();
                Bundle bundle = new Bundle();
                CloudchatApp myapp = (CloudchatApp) getApplication();
                String sender = myapp.getsender();
                String contents = myapp.getcontents();
                System.out.println("Serive的获取SENDER"+sender);
                bundle.putString("sender", sender);
                bundle.putString("contents", contents);
                replyMsg.setData(bundle);
                try {
                    msg.replyTo.send(replyMsg);
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            }
    });
    @Override
    public IBinder onBind(final Intent intent) {
        return mMessenger.getBinder();
    }
}