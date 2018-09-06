package com.eladapps.cloudchat.carrierapi;
/**
 * Created by liuming on 2018/5/27.
 */

public class ElastosException extends Exception {

    private static final long serialVersionUID = -1729415961509977814L;
    private int errorCode;

    public ElastosException(int errorCode) {
        super();
        this.errorCode = errorCode;
    }

    public ElastosException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}