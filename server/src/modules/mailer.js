const nodemailer = require('nodemailer')
const Path = require('path');
const handlebars = require('nodemailer-express-handlebars');

const {host, port, user, pass, service} = require('../Config/Mail.json');


var transport = nodemailer.createTransport({

    host,
    port,
    service,
    secure:false,
    auth: { user, pass},
    tls: {
        rejectaUnauthorized: false,
    }
  });

  transport.use('compile', handlebars({
      viewEngine: 'handlebars',
      viewPath: Path.resolve('../server/src/Resources/Mail/'),
      extName: '.html'
  }));

  module.exports = transport;