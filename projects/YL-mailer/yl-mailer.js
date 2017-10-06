var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'Gmail',
	auth: {
		user: '',
		pass: ''
	}
}));

var mailOptions = {
	from: '@gmail.com',
	to: "@gmail.com",
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
