var mqtt;
var reconnectTimeout = 2000;
var host="localhost"; //change this
var port=9001;

function onFailure(message) {
  console.log("Connection Attempt to Host "+host+"Failed");
  setTimeout(MQTTconnect, reconnectTimeout);
    }
function onMessageArrived(msg){
  // document.getElementById("changeText").innerHTML = "<h1>"+msg.payloadString+"</h1>";
  var topic = ""+msg.destinationName
  console.log(topic);
  if (topic == "/rtl_433"){
    var pesan = ""+msg.payloadString;
    var parsePesan = JSON.parse(msg.payloadString);
    var idBan = parsePesan["wheel"];
    var pressure = parsePesan["pressure_kPa"];
    pressure = Math.round(pressure * 100) / 100;
    var temperature = parsePesan["temperature_C"];
    temperature = Math.round(temperature * 100) / 100


    if(idBan == 1){
      document.getElementById("suhu1").innerHTML = temperature;
      document.getElementById("tekanan1").innerHTML = pressure;
    }
    else if(idBan == 2){
      document.getElementById("suhu2").innerHTML = temperature;
      document.getElementById("tekanan2").innerHTML = pressure;
    }
    else if(idBan == 3){
      document.getElementById("suhu3").innerHTML = temperature;
      document.getElementById("tekanan3").innerHTML = pressure;
    }
    else{
      document.getElementById("suhu3").innerHTML = temperature;
      document.getElementById("tekanan3").innerHTML = pressure;
    }
    // console.log(""+parsePesan["idTruck"])
    // console.log("masuk sini");
    // console.log(pesan);
  }
  
}

 function onConnect() {
// Once a connection has been made, make a subscription and send a message.

console.log("Connected ");
mqtt.subscribe("/");
}
function MQTTconnect() {
console.log("connecting to "+ host +" "+ port);
var x=Math.floor(Math.random() * 10000); 
var cname="orderform-"+x;
mqtt = new Paho.MQTT.Client(host,port,cname);
//document.write("connecting to "+ host);
var options = {
  timeout: 3,
  onSuccess: onConnect,
  onFailure: onFailure,
   };
mqtt.onMessageArrived = onMessageArrived

mqtt.connect(options); //connect
}
