const nodemailer = require('nodemailer');

const Transporter = nodemailer.createTransport({
    
    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
    service: 'naver',
    // host를 gmail로 설정
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력, 'testmail@gmail.com'
      user: 'jos881@naver.com',
      // Gmail 패스워드 입력
      pass: 'spdlqj881!',
    },
});



export default Transporter;