
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/application/application","pages/mine/mine","pages/spare/spare","pages_login/login","pages_home/qualityTesting","pages_home/frontTesting","pages_home/damageTesting","pages_home/pickingManagement","pages_home/picking/picking","pages_home/wholeOrderDistribution","pages_home/wholePicking/wholePicking","pages_home/createInspection","pages_home/provisionalReceipt","pages_home/inspectionDetail","pages_home/inspectionConfirm","pages_home/RFIDDemo","pages_home/handover","pages_home/launch","pages_home/stockLaunch","pages_home/implementLaunch/implementLaunch","pages_home/stockCheck","pages_home/implementStockCheck/implementStockCheck","pages_home/positionAdjustment","pages_home/locationAdjustment","pages_home/packing","pages_home/stockSearch"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#54639c","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"text":"首页","pagePath":"pages/home/home","iconPath":"static/home.png","selectedIconPath":"static/homeed.png"},{"text":"应用","pagePath":"pages/application/application","iconPath":"static/app.png","selectedIconPath":"static/apped.png"},{"text":"备用","pagePath":"pages/spare/spare","iconPath":"static/spare.png","selectedIconPath":"static/spared.png"},{"text":"我的","pagePath":"pages/mine/mine","iconPath":"static/me.png","selectedIconPath":"static/meed.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"CBPDA","compilerVersion":"3.4.18","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/application/application","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/spare/spare","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages_login/login","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages_home/qualityTesting","meta":{},"window":{"navigationBarTitleText":"初检信息录入","enablePullDownRefresh":false}},{"path":"/pages_home/frontTesting","meta":{},"window":{"navigationBarTitleText":"入库前质检","enablePullDownRefresh":false}},{"path":"/pages_home/damageTesting","meta":{},"window":{"navigationBarTitleText":"有损检验","enablePullDownRefresh":false}},{"path":"/pages_home/pickingManagement","meta":{},"window":{"navigationBarTitleText":"逐条拣货配货","enablePullDownRefresh":false}},{"path":"/pages_home/picking/picking","meta":{},"window":{"navigationBarTitleText":"逐条拣货配货","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":">","float":"right"},{"text":"<","float":"right"}]}}},{"path":"/pages_home/wholeOrderDistribution","meta":{},"window":{"navigationBarTitleText":"整单拣货配货","enablePullDownRefresh":false}},{"path":"/pages_home/wholePicking/wholePicking","meta":{},"window":{"navigationBarTitleText":"整单拣货配货","enablePullDownRefresh":false}},{"path":"/pages_home/createInspection","meta":{},"window":{"navigationBarTitleText":"创建送检单","enablePullDownRefresh":false}},{"path":"/pages_home/provisionalReceipt","meta":{},"window":{"navigationBarTitleText":"回货暂收","enablePullDownRefresh":false}},{"path":"/pages_home/inspectionDetail","meta":{},"window":{"navigationBarTitleText":"送检单明细","enablePullDownRefresh":false}},{"path":"/pages_home/inspectionConfirm","meta":{},"window":{"navigationBarTitleText":"取检确认","enablePullDownRefresh":false}},{"path":"/pages_home/RFIDDemo","meta":{},"window":{"navigationBarTitleText":"RFID测试","enablePullDownRefresh":false}},{"path":"/pages_home/handover","meta":{},"window":{"navigationBarTitleText":"交接","enablePullDownRefresh":false}},{"path":"/pages_home/launch","meta":{},"window":{"navigationBarTitleText":"上架","enablePullDownRefresh":false}},{"path":"/pages_home/stockLaunch","meta":{},"window":{"navigationBarTitleText":"库存上架","enablePullDownRefresh":false}},{"path":"/pages_home/implementLaunch/implementLaunch","meta":{},"window":{"navigationBarTitleText":"库存上架","enablePullDownRefresh":false}},{"path":"/pages_home/stockCheck","meta":{},"window":{"navigationBarTitleText":"盘点","enablePullDownRefresh":false}},{"path":"/pages_home/implementStockCheck/implementStockCheck","meta":{},"window":{"navigationBarTitleText":"盘点","enablePullDownRefresh":false}},{"path":"/pages_home/positionAdjustment","meta":{},"window":{"navigationBarTitleText":"仓位调整","enablePullDownRefresh":false}},{"path":"/pages_home/locationAdjustment","meta":{},"window":{"navigationBarTitleText":"库位调整","enablePullDownRefresh":false}},{"path":"/pages_home/packing","meta":{},"window":{"navigationBarTitleText":"装箱","enablePullDownRefresh":false}},{"path":"/pages_home/stockSearch","meta":{},"window":{"navigationBarTitleText":"库存查询","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
