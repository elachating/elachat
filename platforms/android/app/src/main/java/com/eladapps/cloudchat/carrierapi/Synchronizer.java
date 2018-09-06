package com.eladapps.cloudchat.carrierapi;
import java.util.concurrent.Semaphore;
/**
 * Created by liuming on 2018/5/27.
 */

public class Synchronizer {
    Semaphore sema;

    public Synchronizer() {
        sema = new Semaphore(0);
    }

    public void wakeup() {
        sema.release();
    }

    public void await() {
        try {
            sema.acquire();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}