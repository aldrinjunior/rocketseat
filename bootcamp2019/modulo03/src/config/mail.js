export default {
    host: process.env.MAIL_HOST,// host: 'smtp.mailtrap.io',
    port: process.env.MAIL_PORT,  // port: '2525',
    secure: false,
    auth: {             
        user: process.env.MAIL_USER,//user: "6478331c066fcc",
        pass: process.env.MAIL_PASS,//pass: "cc59877edcd70a"
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>',
    },
};


/*
(PARA APLICAÇÕES ONLINE)
Amazon SES
Mailgun
Sparkpost
Mandril (Mailchimp)
Gmail
==================
Mailtrap (SOMENTE PARA DEV)
*/