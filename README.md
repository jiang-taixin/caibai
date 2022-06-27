# caibai
caibai-pda

CBPDA---uniapp工程
API---接口文档
UniPlugin-Hello-AS---RFID安卓插件工程

其中AS工程配置如下

**demo相关配置**
manifest中：
<meta-data
android:name="dcloud_appkey"            android:value="0d3749e40b8682f2a072cc10965d0bcf" />

dccloud_uniplugins.json
dccloud_control.xml
build.gradle

打包用jks SHA1在DCloud中做配置，SHA1、包名一致生成appkey
https://dev.dcloud.net.cn/app/build-config

**module相关配置**
build.gradle
proguard-rules.pro
consumer-rules.pro

RFIDLib为RFID库，编译成aar后作为uniapp插件使用
