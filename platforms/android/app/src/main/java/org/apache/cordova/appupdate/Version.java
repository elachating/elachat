package org.apache.cordova.appupdate;

/**
 * Created by LuoWen on 2015/12/14.
 */
public class Version {
    private int local;
    private int remote;
    private String ucontents;

    public Version(int local, int remote,String ucontents) {
        this.local = local;
        this.remote = remote;
        this.ucontents = ucontents;
    }

    public int getLocal() {
        return local;
    }

    public int getRemote() {
        return remote;
    }
    public String getUcontents() {
        return ucontents;
    }
}