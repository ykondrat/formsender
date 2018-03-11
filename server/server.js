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

app.post('/contact-form', (req, res) => {
    const mailOptions = {
        from: 'formsenderio@gmail.com',
        to: 'kondratyev.yevhen@gmail.com',
        subject: 'Formsender io (ykondrat)',
        html: `
            <div>
                <h1 style="text-align: center; font-weight: bold; color: #9000ff;"> Formsender io (ykondrat) </h1>
                <p style="font-weight: bold; color: #727272; margin: 5px 0;">Somebody wrote you:</p>
                <div>
                    Name: ${req.body.name}
                </div>
                <div>
                    Email: ${req.body.email}
                </div>
                <div>
                    Msg: ${req.body.msg}
                </div>
            </div>`
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

app.post('/:email', (req, res) => {
    let output = '';

    for (let element in req.body) {
        output +=   `<p class="info" style="font-weight: normal; color: black; margin-left: 10px;">
                        <span class="key" style="font-weight: bold; color: #727272;">${element}: </span>
                        <span class="text">${req.body[element]} </span>
                    </p>`;
    }
    const mailOptions = {
        from: 'formsenderio@gmail.com',
        to: req.params.email,
        subject: 'Formsender io (ykondrat)',
        html: `
            <div>
                <h1 style="text-align: center; font-weight: bold; color: #9000ff;"> Formsender io (ykondrat) </h1>
                <p style="font-weight: bold; color: #727272; margin: 5px 0;">Somebody wrote you:</p>
                <div>
                    ${output}
                </div>
            </div>`
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
