//wysyłka maila
const dotevn = require('dotenv')
dotevn.config()
module.exports.mail = () => {

    console.log(process.env.GMAIL_PASSWORD)
}

// zakładamy plik .env i montujemy paczkę  npm install donenv@^8.2.0
// paczka do wysyłki maila npm install nodemailer@^6.4.16