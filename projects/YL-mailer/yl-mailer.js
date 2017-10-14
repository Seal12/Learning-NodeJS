var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/*var transporter = nodemailer.createTransport(smtpTransport({
	service: 'Gmail',
	auth: {
		user: '',
		pass: ''
	}
}));*/

var Client_ID = "387621655729-am7q19lmm18rmmbtco3l6bsovga85alp.apps.googleusercontent.com";
var CLIENT_SECRETE = "j1pIZAXuQnxPfFsHOESFKDmf";
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'slimseal@gmail.com',
		clientId: Client_ID,
		clientSecret: CLIENT_SECRETE,
		refreshToken: '1/z-rM2iQS3YYQcrdldI9M5vj4nsTjDMConNF0_-Yz8Xk',
		//accessToken:"ya29.GlvkBF_5LLS0dEbVr9A5sa-yEEgAC4udMMGBZuR5mUBjrXuU2Nkl3YkN6R9Yl1R4jwxiantTAH6nP0jKAICjLY5wRQfA71hATXyyOsf5qYuOaShEbs8kiFqZlKOD",
		expires:3600
	}
});

var mailOptions = {
	from: 'slimseal@gmail.com',
	to: "rapolaiseale@gmail.com",
	subject: "Test emial",
	text: 'This is a test email!' 
}

transporter.sendMail(mailOptions, function(error, info) {
	if(error){
		console.log(error);
	}else{
		console.log('Email sent: ' + info.response);
	}
});
