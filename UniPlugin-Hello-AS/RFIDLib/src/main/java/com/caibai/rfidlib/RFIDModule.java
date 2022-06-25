package com.caibai.rfidlib;

import android.widget.Toast;

import androidx.annotation.UiThread;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;

import io.dcloud.feature.uniapp.common.UniModule;

public class RFIDModule extends UniModule {

    JSCallback callback;
    String rString = "";

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
        callback.invoke("success");
    }
}
