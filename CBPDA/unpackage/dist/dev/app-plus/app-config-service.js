
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/application/application","pages/mine/mine","pages/spare/spare","pages/home/qualityTesting","pages/home/frontTesting","pages/home/damageTesting","pages/home/pickingManagement","pages/home/picking/picking","pages/home/wholeOrderDistribution","pages/home/wholePicking/wholePicking","pages/home/submissionManagement"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#009029","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/logo.png","selectedIconPath":"static/logo.png"},{"text":"应用","pagePath":"pages/application/application","iconPath":"static/logo.png","selectedIconPath":"static/logo.png"},{"text":"备用","pagePath":"pages/spare/spare","iconPath":"static/logo.png","selectedIconPath":"static/logo.png"},{"text":"我的","pagePath":"pages/mine/mine","iconPath":"static/logo.png","selectedIconPath":"static/logo.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"CBPDA","compilerVersion":"3.4.15","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/application/application","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/spare/spare","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/home/qualityTesting","meta":{},"window":{"navigationBarTitleText":"初检信息录入","enablePullDownRefresh":false}},{"path":"/pages/home/frontTesting","meta":{},"window":{"navigationBarTitleText":"入库前质检","enablePullDownRefresh":false}},{"path":"/pages/home/damageTesting","meta":{},"window":{"navigationBarTitleText":"有损检验","enablePullDownRefresh":false}},{"path":"/pages/home/pickingManagement","meta":{},"window":{"navigationBarTitleText":"逐条拣货配货","enablePullDownRefresh":false}},{"path":"/pages/home/picking/picking","meta":{},"window":{"navigationBarTitleText":"逐条拣货配货","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":">","float":"right"},{"text":"<","float":"right"}]}}},{"path":"/pages/home/wholeOrderDistribution","meta":{},"window":{"navigationBarTitleText":"整单拣货配货","enablePullDownRefresh":false}},{"path":"/pages/home/wholePicking/wholePicking","meta":{},"window":{"navigationBarTitleText":"整单拣货配货","enablePullDownRefresh":false}},{"path":"/pages/home/submissionManagement","meta":{},"window":{"navigationBarTitleText":"送检管理","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
