package com.caibai.rfidlib;

import android.os.RemoteException;
import android.util.Log;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.ubx.usdk.USDKManager;
import com.ubx.usdk.rfid.RfidManager;
import com.ubx.usdk.rfid.aidl.IRfidCallback;
import com.ubx.usdk.rfid.aidl.RfidDate;
import com.ubx.usdk.rfid.util.CMDCode;
import com.ubx.usdk.rfid.util.ErrorCode;

import io.dcloud.feature.uniapp.common.UniModule;

public class RFIDModule extends UniModule {

    JSCallback uniCallBack;

    public RfidManager rfidManager;
    public RfidDate rfidDate;
    private ScanCallback callback;
    List rfidList = new ArrayList();

    @JSMethod(uiThread = true)
    public void startScan(JSCallback jsCallBack){
        this.uniCallBack = jsCallBack;
        System.out.println("====================start scan");
        setCallback();
        System.out.println("*************************5");
        RFIDProxy.rfidManager.customizedSessionTargetInventory(RFIDProxy.rfidManager.getReadId(), (byte) 0, (byte) 0, (byte) 1);
        System.out.println("*************************6"+RFIDProxy.rfidManager.getReadId());
    }

    @JSMethod(uiThread = true)
    public void stopScan(){
        RFIDProxy.rfidManager.stopInventory();
    }

    private void setCallback(){
        System.out.println("*************************1:"+RFIDProxy.rfidManager);
        if (RFIDProxy.rfidManager!=null) {
            System.out.println("*************************2");
            if (callback == null){
                System.out.println("*************************3");
                callback = new ScanCallback();
            }
            System.out.println("*************************4");
            RFIDProxy.rfidManager.registerCallback(callback);
        }
    }


    class ScanCallback extends IRfidCallback.Stub {

        /**
         * 盘存数据回调（Inventory TAG Callback）
         *
         * @param b  cmd
         * @param s  pc值
         * @param s1 CRC Check Value
         * @param s2 EPC Data
         * @param b1 Ant
         * @param s3 RSSI
         * @param s4 Frequency
         * @param i
         * @param i1 Inventory Count
         * @param s5 Read id
         * @throws RemoteException
         */
        @Override
        public void onInventoryTag(byte b, String s, String s1, String s2, byte b1, String s3, String s4, int i, int i1, String s5) throws RemoteException {

            com.alibaba.fastjson.JSONObject object = new com.alibaba.fastjson.JSONObject();
            rfidList.add(s2);
            System.out.println("======================= list:"+rfidList);
            object.put("rfidList",rfidList);

            uniCallBack.invoke(object);
        }

        /**
         * 盘存结束回调(Inventory Command Operate End)
         *
         * @param i  当前天线ID
         * @param i1 当前指令盘存标签数量
         * @param i2 读取速度
         * @param i3 总共读取次数
         * @param b  指令cmd
         * @throws RemoteException
         */
        @Override
        public void onInventoryTagEnd(int i, int i1, int i2, int i3, byte b) throws RemoteException {

        }

        @Override
        public void onOperationTag(String s, String s1, String s2, String s3, int i, byte b, byte b1) throws RemoteException {

        }

        @Override
        public void onOperationTagEnd(int i) throws RemoteException {

        }

        @Override
        public void refreshSetting(RfidDate rfidDate) throws RemoteException {

        }

        /**
         * (指令操作状态回调)Command operate status
         * @param b  指令cmd对应CMDCode.class
         * @param b1 执行状态对应ErrorCode.class
         * @throws RemoteException
         */
        @Override
        public void onExeCMDStatus(byte b, byte b1) throws RemoteException {

        }
    }

}
