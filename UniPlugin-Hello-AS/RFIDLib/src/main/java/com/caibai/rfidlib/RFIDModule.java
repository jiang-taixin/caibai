package com.caibai.rfidlib;

import android.app.Application;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.UiThread;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;

import io.dcloud.feature.uniapp.common.UniModule;
import com.ubx.usdk.USDKManager;
import com.ubx.usdk.rfid.RfidManager;

public class RFIDModule extends UniModule {

    JSCallback callback;
    String rString = "";

    public  boolean RFID_INIT_STATUS = false;
    public RfidManager mRfidManager;

    /**
     * 回调方法
     * 传入参数
     * 返回参数
     */

    @JSMethod(uiThread = true)
    public void getRFID(String arg, JSCallback jsCallBack){
        this.callback = jsCallBack;
        rString = "JAVA to UNIAPP "+arg;
        com.alibaba.fastjson.JSONObject object = new com.alibaba.fastjson.JSONObject();
        object.put("res",rString);
        String[] list = {"rfid12222222222222","rfid12222222222222","rfid12222222222222","rfid12222222222222","rfid12222222222222",
                "rfid12", "rfid12", "rfid12", "rfid12", "rfid33434", "rfid33434", "rfid33434", "rfid33434", "rfid33434"};


        ArrayList arrayList = new ArrayList();
        for (int i = 0; i < list.length; i++) {
            String array = list[i];
            if (!arrayList.contains(array)) {
                arrayList.add(array);
            }
        }
        String[] b = (String[]) arrayList.toArray(new String[arrayList.size()]);

        object.put("rfidList",b);
        jsCallBack.invoke(object);
        System.out.println("*****************************:JS call JAVA");
    }

    @JSMethod(uiThread  = true)
    public  void initRFID(JSCallback callback){
        //初始化RFID SDK

        //初始化结束返回初始化结果
        USDKManager.getInstance(BaseApplication.getContext()).getFeatureManagerAsync(USDKManager.FEATURE_TYPE.RFID, (featureType, status) -> {
            if (featureType == USDKManager.FEATURE_TYPE.RFID && status == USDKManager.STATUS.SUCCESS) {
                mRfidManager = (RfidManager) USDKManager.getInstance(BaseApplication.getContext()).getFeatureManager(USDKManager.FEATURE_TYPE.RFID);
//                mRfidManager.registerCallback(callback);
                // 设置波特率
                if (mRfidManager.connectCom("/dev/ttyHSL0", 115200)) {
                    RFID_INIT_STATUS = true;

                    callback.invoke("success");
                }
            }
        });
    }
}