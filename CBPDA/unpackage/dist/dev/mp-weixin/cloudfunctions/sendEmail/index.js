// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env:"caibai-dev-8gi415mp2b8cd338"
})


//引入邮件类库
var nodemailer = require('nodemailer')
//创建smtp客户端配置
var config = {
	host:'smtp.163.com',
	port:25,
	auth:{
		user:'caibai_dev@163.com',
		pass:'XMEAPSRAAPQKQPWT'
	}
}

//创建SMTP对象
var transporter = nodemailer.createTransport(config);


// 云函数入口函数
exports.main = async (event, context) => {
	let _text;
	let _recipients;
	let _html;
	
  const wxContext = cloud.getWXContext()
  
  _text = event._text;
  _recipients = event._recipients;
  _html = event._html;
  
  //创建邮件对象
  var mail = {
	  from:'来自菜百<caibai_dev@163.com>',
	  subject:'测试邮件',
	  to:'jiangtaixin123@126.com',       //接收人
	  text:_text,
	  html:_html,
  }
  
  let res = await transporter.sendMail(mail);
  return res;
}