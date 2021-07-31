const express = require('express');

const app = express();

const Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

app.post('/getday',(req,res,next) => {
    console.log(req.body.Date);
    const TempDate = new Date(req.body.Date);
    console.log(TempDate.getDay())
    res.send(JSON.stringify({Day : TempDate.getDay(), Name : Days[TempDate.getDay()]}));
})
app.listen(4000, () => console.log("Starting server at port 4000"));