const socket=io('/')

const button=document.getElementById("btn")
const locate=document.getElementById("location")
const tempVal=document.getElementById("temperature")
const tempmin_max=document.getElementById("tempmin_max")
const feelsVal=document.getElementById("feels")

button.addEventListener("click",()=>{
    fetchData()
})

document.getElementById("txt").addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        fetchData()
    }
})
function fetchData(){
    const txtVal=document.getElementById("txt").value
    //console.log(txtVal)
    if(txtVal==="")console.log("invalid entry.....")
    else{
        //console.log(txtVal)
        socket.emit('message',txtVal)
        socket.on('announcements',(data)=>{
            //console.log(data.main.temp)
            //addWeathericon(data.weather[0].main)

            locate.innerHTML=`${data.name} , ${data.sys.country}`
            tempVal.innerHTML= `${Math.round((data.main.temp-273.15)*100)/100}&deg;C`
            tempmin_max.innerHTML=`Min ${Math.round((data.main.temp_min-273.15)*100)/100}&deg;C | Max ${Math.round((data.main.temp_max-273.15)*100)/100}&deg;C`
            feelsVal.innerHTML=`Feels Like ${Math.round((data.main.feels_like-273.15)*100)/100}&deg;C`
            //locate.value=Math.round((data.main.temp-273.15)*100)/100

        })
    }
}

//function addWeathericon(){
//    let weathericon=document.getElementById("weathericon");
//    if(tempStatus=="Sunny"){
//        weathericon.innerHTML="<i class='fas fa-sun' style='color: #f1c40f;'></i>";
//    }
//    else if(tempStatus=="Clouds"){
//        weathericon.innerHTML="<i class='fas fa-cloud' style='color: #95a5a6;'></i>";
//    }
//}
