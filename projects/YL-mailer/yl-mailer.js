var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: '@gmail.com',
		pass: ''
	}
});

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