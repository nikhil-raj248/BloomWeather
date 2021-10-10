const express=require('express')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)
const path=require('path')
const requests=require('requests')


app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.render('room')
})

io.on('connection',(socket)=>{
    console.log('connected.....')
    socket.on('message',(temp)=>{
        //console.log(temp)
        requests(`http://api.openweathermap.org/data/2.5/weather?q=${temp}&appid=93644f04924fdf5d0fc8726d256e5083`)
        .on('data', function (chunk) {
            const objData=JSON.parse(chunk);
            //const arrData=[objData];
            //console.log(arrData[0].main.temp);
            socket.emit('announcements', objData);
            //const realTimeData=arrData.map((val)=> replaceVal(homeFile,val)).join("");
            ////console.log(realTimeData);
            //res.write(realTimeData);
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
        });
    })
})



server.listen(3000,()=>{
    console.log('listening on port 3000')
})