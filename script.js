let audioContext;
let analyser;
let microfono;
let datos;
let soplado = false;

function iniciar(){

document.getElementById("inicio").style.display="none";
document.getElementById("velaSection").style.display="flex";

activarMicrofono();

}

function activarMicrofono(){

navigator.mediaDevices.getUserMedia({audio:true})

.then(stream=>{

audioContext = new AudioContext();

microfono = audioContext.createMediaStreamSource(stream);

analyser = audioContext.createAnalyser();

microfono.connect(analyser);

datos = new Uint8Array(analyser.frequencyBinCount);

detectarSoplido();

})

.catch(error=>{

console.log("No se pudo activar el micrófono");

});

}

function detectarSoplido(){

analyser.getByteFrequencyData(datos);

let volumen = datos.reduce((a,b)=>a+b)/datos.length;

if(volumen > 45 && !soplado){

soplado = true;

apagarVela();

}

requestAnimationFrame(detectarSoplido);

}

function apagarVela(){

document.getElementById("vela").src="img/vela_apagada.png";

document.getElementById("humo").style.display="block";

document.getElementById("musica").play();

setTimeout(()=>{

document.getElementById("velaSection").style.display="none";
document.getElementById("fiesta").style.display="block";

},3000);

}

function abrirCarta(){

document.getElementById("fiesta").style.display="none";
document.getElementById("mensajeCarta").style.display="block";

}

function final(){

document.getElementById("mensajeCarta").style.display="none";
document.getElementById("finalMensaje").style.display="block";

}