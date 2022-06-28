package com.caibai.rfidlib;

import android.app.Application;
import android.content.Context;
import android.os.RemoteException;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.ubx.usdk.USDKManager;
import com.ubx.usdk.rfid.RfidManager;
import com.ubx.usdk.USDKManager;
import com.ubx.usdk.rfid.RfidManager;
import com.ubx.usdk.rfid.aidl.IRfidCallback;
import com.ubx.usdk.rfid.aidl.RfidDate;

import java.util.ArrayList;
import java.util.List;

import io.dcloud.feature.uniapp.UniAppHookProxy;
import io.dcloud.feature.uniapp.common.UniModule;

public class RFIDProxy implements UniAppHookProxy {
    static public RfidManager rfidManager;

    @Override
    public void onSubProcessCreate(Application application) {

    }

    @Override
    public void onCreate(Application application) {
        USDKManager.getInstance(application.getBaseContext()).getFeatureManagerAsync(USDKManager.FEATURE_TYPE.RFID, (featureType, status) -> {
            System.out.println("=====================init RFID");
            if (featureType == USDKManager.FEATURE_TYPE.RFID && status == USDKManager.STATUS.SUCCESS) {
                try {
                    rfidManager = (RfidManager) USDKManager.getInstance(application.getBaseContext()).getFeatureManager(USDKManager.FEATURE_TYPE.RFID);
                    if (rfidManager.connectCom("/dev/ttyHSL0", 115200)) {
                        System.out.println("=====================success init rfid");
                        //设置功率  功率越大扫描范围越大  范围0-33
                        rfidManager.setOutputPower(rfidManager.getReadId(), (byte)30);
                    }
                }
                catch (Exception e){
                    System.out.println("=====================exception init rfid :"+e);
                }

            }
            else{
                System.out.println("=====================featureType :"+featureType+", status :"+status);
            }
        });
    }
}
