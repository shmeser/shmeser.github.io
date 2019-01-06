const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res)=>{
    // res.sendFile(__dirname+'/client/public/index.html');
    res.send(view);
});

app.post('/get_matrix', (req, res)=>{
    const {day, month, year} = req.body;
    console.log(typeof day);
    const _0 =''+day+month+year;
    const _1 = ''+(Number(day[0])+Number(day[1])+Number(month[0])+Number(month[1])+Number(year[0])+Number(year[1])+Number(year[2])+Number(year[3]));
    const _2 = ''+(Number(_1[0])+Number(_1[1]));
    const _3 = ''+(_1 - (2*(day[0]?day[0]:day[1])));
    const _4 = ''+(Number(_3[0])+Number(_3[1]));
    const full = _0+_1+_2+_3+_4;

    let arr = [0,0,0,0,0,0,0,0,0,0];

    for(let i = 0; i<full.length;i++){
        arr[Number(full.charAt(i))]++;
    }

    // console.log(_0);
    // console.log(_1);
    // console.log(_2);
    // console.log(_3);
    // console.log(_4);
    console.log(full);
    console.log(arr);

    const result = {
        matrix: arr,
        status: 200
    };
    res.send(JSON.stringify(result));
});

app.listen(1000);
console.log('Server started');
