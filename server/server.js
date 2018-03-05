import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config.json';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || config.serverPort;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'formsenderio@gmail.com',
        pass: 'formsender'
    }
});

app.set("view options", { layout: false });
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/:email', (req, res) => {
    let output = '';

    for (let element in req.body) {
        output += element + ': ' + req.body[element] + '<br>';
    }
    const mailOptions = {
        from: 'formsenderio@gmail.com',
        to: req.params.email,
        subject: 'Formsender io (ykondrat)',
        html: `<div>${output}</div>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(400).send({ text : "OMG" });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ text : "OK" });
        }
    });
});

app.listen(port, function(){
    console.log(`Server listening on port: ${port}`);
});
