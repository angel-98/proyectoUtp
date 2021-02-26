const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var mqtt=require('mqtt');
//Carga de schemas
const Dispositivo=require('./models/dispositivo');

const app=express();
mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection database success!');
});

var mqttOptions={
  clientId:"nodeserver1",
  //username:"steve",
  //password:"password",
  //clean:true
};
var mqttClient = mqtt.connect("mqtt://192.168.2.246",mqttOptions)

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,XMLHttpRequest, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
  });


//Mqtt
mqttClient.on("connect",function(){
  console.log("Mqtt connected");
  mqttClient.subscribe('room1/#');
  });

//actions
app.get("/",(req, resp, next)=>{
  resp.send('Hello from express');
});
app.get("/api/hola",(req, resp, next)=>{
  console.log('Api ejecutandose');
  var objr={msj:'Ok'};
  resp.status(200).json(objr);
});

app.post("/api/disp",(req, resp, next)=>{
  const disp=new Dispositivo();

  disp.nombre=req.body.nombre;
  disp.descripcion=req.body.descripcion;
  disp.estatus=req.body.estatus;
  disp.tipo=req.body.tipo;
  disp.nivel=req.body.nivel;

  disp.save(function(err,dato){
    if(err){
      console.error(err);
      resp.status(500).json({msj:'Error con la base de datos'});
    }
    else
      resp.status(200).json(dato);
  });
});

app.get("/api/disp",(req, resp, next)=>{
  Dispositivo.find(function(err, disps){
    if(err){
      console.error(err);
      resp.status(500).json({msj:'Error con la base de datos'});
    }
    else
      resp.status(200).json(disps);
  });
});
app.get("/api/disp/:id",(req, resp, next)=>{
  Dispositivo.findById(req.params.id,function(err, disp){
    if(err){
      console.error(err);
      resp.status(500).json({msj:'Error con la base de datos'});
    }
    else{
      if(disp==null){
        resp.status(500).json('No se encontro el dispositivo!');
      }else {
        var options={
          retain:true,
          qos:1
          };
        if (mqttClient.connected==true){
          //  room1/kitchen/tv1
          mqttClient.publish(disp.descripcion, "off", options);
          resp.status(200).json('Mensaje enviado!');
        }else{
          resp.status(500).json('No se encontro el broker!');
        }
      }
    }
  });

});


//Mqtt events
mqttClient.on('message',function(topic, message, packet){
	console.log("message is "+ message);
  console.log("topic is "+ topic);
  Dispositivo.findOne({descripcion: topic},function(err, disp){
    if(err){
      console.error(err);
    }
    else{
      if(disp==null){
        console.error('No se encontro el dispositivo!');
      }else {
        if(message=='encendido'){
          disp.estatus=true;
          disp.last_conn=Date.now;
          disp.save(function(err,dato){
            if(err){
              console.error(err);
            }
            else
            console.log('Evento registrado!');
          });
        }
        if(message=='apagado'){
          disp.estatus=false;
          disp.last_conn=Date.now;
          disp.save(function(err,dato){
            if(err){
              console.error(err);
            }
            else
            console.log('Evento registrado!');
          });
        }
      }
    }
  });
});



module.exports=app;
