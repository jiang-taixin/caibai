package com.caibai.rfidlib;

import android.os.RemoteException;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;
import java.util.List;

import com.ubx.usdk.rfid.RfidManager;
import com.ubx.usdk.rfid.aidl.IRfidCallback;
import com.ubx.usdk.rfid.aidl.RfidDate;

import io.dcloud.feature.uniapp.common.UniModule;

public class RFIDModule extends UniModule {

    JSCallback uniCallBack;

    public RfidManager rfidManager;
    public RfidDate rfidDate;
    private ScanCallback callback;
    List rfidList = new ArrayList();
    private com.alibaba.fastjson.JSONObject object = new com.alibaba.fastjson.JSONObject();

    @JSMethod(uiThread = false)
    public void startScan(JSCallback jsCallBack){
        this.uniCallBack = jsCallBack;
        if (RFIDProxy.RFID_INIT_STATUS){
            setCallback();
            RFIDProxy.rfidManager.customizedSessionTargetInventory(RFIDProxy.rfidManager.getReadId(), (byte) 0, (byte) 0, (byte) 1);
        }
        else{
            object.put("code","201");
            object.put("message","RFID未初始化");
            this.uniCallBack.invokeAndKeepAlive(object);
        }

    }

    @JSMethod(uiThread = false)
    public void stopScan(){
        RFIDProxy.rfidManager.stopInventory();
        this.rfidList.clear();
    }

    private void setCallback(){
        if (RFIDProxy.rfidManager!=null) {
            if (callback == null){
                callback = new ScanCallback();
            }
            RFIDProxy.rfidManager.registerCallback(callback);
        }
    }

    //内部类实现回调
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
            object.put("code","200");
            object.put("message","success");
            if (rfidList.contains(s2)){
            }
            else{
                rfidList.add(s2);
                object.put("rfidList",rfidList);
                object.put("count",rfidList.size());
                uniCallBack.invokeAndKeepAlive(object);
            }

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
