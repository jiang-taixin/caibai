package com.caibai.rfidlib;

import android.app.Application;
import com.ubx.usdk.USDKManager;
import com.ubx.usdk.rfid.RfidManager;
import io.dcloud.feature.uniapp.UniAppHookProxy;

public class RFIDProxy implements UniAppHookProxy {
    //将rfidManager创建为静态实例
    static public RfidManager rfidManager;
    static public  boolean RFID_INIT_STATUS = false;

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
                        RFID_INIT_STATUS = true;
                        //设置功率  功率越大扫描范围越大  范围0-33
                        rfidManager.setOutputPower(rfidManager.getReadId(), (byte)30);
                    }
                }
                catch (Exception e){
                }
            }
            else{
                RFID_INIT_STATUS = false;
                System.out.println("=====================featureType :"+featureType+", status :"+status);
            }
        });
    }
}
