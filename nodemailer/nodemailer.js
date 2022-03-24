// var nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//     user: 'omari.reynolds14@ethereal.email',
//     pass: 'h99tsDpw2WbXg26dp6'
    
//     }
//     });
  
//   var mailOptions = {
//     from: 'omari.reynolds14@ethereal.email',
//     to: 'prasha.pk@gmail.com',
//     subject: 'Sending Email using Node.js',
//     html:'<h1>Hello how are you </h1> <p>I"am sending message using Html</p>'
//   };
  
//  var mailer= transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

//   module.exports=mailer;