let mic = document.getElementById("mic");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');

let empleados = {
    "usuarios": {},
    "imagenes": ""
};

let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let intro = ["Un gusto conocerte, soy Violette, estoy para servirte.", "¿Que tal?, Yo soy Violette, espero tus órdenes.", "Hola, mí nombre es Violette, ¿que deseas hacer hoy?", "Buen día, soy un robot llamado Violette programado para cumplir tus necesidades laborales."];
let help = ["¿Cómo puedo ayudarte?", "¿Que deseas hacer el día de hoy?"];
let greetings = ["Estoy felíz de poderte ayudar hoy, en que te puedo servir.", "Excelente, espero que tu también lo estés.", "Estoy muy bien, gracias por preguntar, ¿En que te puedo ayudar el día de hoy."];
let hobbies = ["Yo amo ayudar a los demás", "Me gusta hacer amigos como tu.", "Me gusta cocinar en mis tiempos libres."];
let thank = ["Es todo un placer.", "Me encanta ayudar.", "Soy felíz ayudante.", "Ni lo menciones."];
let closing = ['Bien, cuidate.', 'Que te vaya muy bien.', 'Chao chao, nos vemos luego.', "Acá estoy por si necesitas algo más."];
let plantilla = ['Acá tienes.', 'Por supuesto.', 'Claro que si.'];
let hacer = ['Esperando a cumplir tus ordenes.', 'Aprendiendo más para poderte ser más útil.'];
let funciones = ['Mí función principal es darte plantillas.', 'Solo tengo la funcion de suministrate plantillas.'];
let nombre = ['Me llamo Violette, estoy para servirte.', 'Violette para servirte.'];
let fundadores = ["Fui creada el 19 de julio del 2020 por Bryan Vélez y Andrés Gutiérrez.", "Mis creadores son Bryan Vélez y Andrés Gutiérrez."]

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth() + 1;
var yyyy = hoy.getFullYear();
//dia de hoy
//console.log(dias[hoy.getDay()] + " " + dd + " de " + meses[mm - 1] + " del " + yyyy);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


function showusermsg(usermsg) {
    let output = '';
    output += `<div class="chatarea-inner user">${usermsg}</div>`;

    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function showchatbotmsg(chatbotmsg, image, description) {
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}${image}${description}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}
chatbotvoice("ana");

function chatbotvoice(message) {
    const voices = window.speechSynthesis.getVoices();
    const speech = new SpeechSynthesisUtterance();

    speech.voice = voices[4];
    speech.lang = "es-ES";
    speech.text = "Comunicate con el administrador";
    if (message.includes('hola')) {
        let finalresult = intro[Math.floor(Math.random() * intro.length)];
        speech.text = finalresult;
    }
    if (message.includes('ana ')) {
        $.ajax({
            type: "GET",
            url: "https://raw.githubusercontent.com/andrespro00/ApiChatBot/master/api",
            success: function(response) {
                var image = "";
                var description = "";
                image = `<br><img src="${JSON.parse(response).Personas.Ana.imagen}" alt="" style="width: 130px;height: 100px;border-radius: 20px;"<br>`;
                description = `<span id="descspan">"${JSON.parse(response).Personas.Ana.Descripcion}"</span><br>`;
                console.log("AJAX: " + description)

                let finalresult = plantilla[Math.floor(Math.random() * plantilla.length)];
                speech.text = finalresult;
                window.speechSynthesis.speak(speech);
                chatareamain.appendChild(showchatbotmsg(speech.text, image, description));
                speech.text = ` la descripción de ${message} es: ` + JSON.parse(response).Personas.Ana.Descripcion;
                window.speechSynthesis.speak(speech);
            }
        });

    }
    if (message.includes('carlos')) {
        $.ajax({
            type: "GET",
            url: "https://raw.githubusercontent.com/andrespro00/ApiChatBot/master/api",
            success: function(response) {
                var image = "";
                var description = "";
                image = `<br><img src="${JSON.parse(response).Personas.Carlos.imagen}" alt="" style="width: 130px;height: 100px;border-radius: 20px;"<br>`;
                description = `<p>"${JSON.parse(response).Personas.Carlos.Descripcion}"</p><br>`;
                console.log("AJAX: " + description)

                let finalresult = plantilla[Math.floor(Math.random() * plantilla.length)];
                speech.text = finalresult;
                window.speechSynthesis.speak(speech);
                chatareamain.appendChild(showchatbotmsg(speech.text, image, description));
                speech.text = ` la descripción de ${message} es: ` + JSON.parse(response).Personas.Carlos.Descripcion;
                window.speechSynthesis.speak(speech);
            }
        });
        let finalresult = plantilla[Math.floor(Math.random() * plantilla.length)];
        speech.text = finalresult;
    }

    if (message.includes('hoy') || message.includes('actual')) {
        let finalresult = "Hoy es " + dias[hoy.getDay()] + " " + dd + " de " + meses[mm - 1] + " del " + yyyy;
        speech.text = finalresult;
    }
    if (message.includes('mañana')) {
        var today = new Date();
        var miliseconds = 24 * 60 * 60 * 1000;
        var tomorrow = new Date(today.getTime() + miliseconds);
        let finalresult = "Mañana será " + dias[tomorrow.getDay()] + " " + tomorrow.getDate() + " de " + meses[tomorrow.getMonth()] + " del " + tomorrow.getFullYear();
        speech.text = finalresult;
    }
    if (message.includes('ayer')) {
        var today = new Date();
        var miliseconds = 24 * 60 * 60 * 1000;
        var yesterday = new Date(today.getTime() - miliseconds);
        let finalresult = "Ayer fue " + dias[yesterday.getDay()] + " " + yesterday.getDate() + " de " + meses[yesterday.getMonth()] + " del " + yesterday.getFullYear();
        speech.text = finalresult;
    }
    if (message.includes('creador') || message.includes('creadores') || message.includes('dueños') || message.includes('fundadores')) {

        let finalresult = fundadores[Math.floor(Math.random() * fundadores.length)];
        speech.text = finalresult;
    }
    if (message.includes('funcion')) {
        let finalresult = funciones[Math.floor(Math.random() * funciones.length)];
        speech.text = finalresult;
    }
    if (message.includes('nombre')) {
        let finalresult = nombre[Math.floor(Math.random() * nombre.length)];
        speech.text = finalresult;
    }
    if (message.includes('haces')) {
        let finalresult = hacer[Math.floor(Math.random() * hacer.length)];
        speech.text = finalresult;
    }
    if (message.includes("eres") || message.includes("que es")) {
        let finalresult = intro[Math.floor(Math.random() * intro.length)];
        speech.text = finalresult;
    }
    if (message.includes('Bien') || /bien/gi.test(message.includes('estes bien')) || /excelente/gi.test(message.includes("estes excelente"))) {
        let finalresult = help[Math.floor(Math.random() * help.length)];
        speech.text = finalresult;
    }
    if (message.includes('Cómo está') || /esta/gi.test(message.includes('como estas'))) {
        let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalresult;
    }
    if (message.includes('ti') || /ti/gi.test(message.includes("sobre ti")) || /algo/gi.test(message.includes("algo sobre"))) {
        let finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
        speech.text = finalresult;
    }
    if (message.includes('gracias') || /gracias/gi.test(message.includes("gracias"))) {
        let finalresult = thank[Math.floor(Math.random() * thank.length)];
        speech.text = finalresult;
    }
    if (message.includes('chao') || /luego/gi.test(message.includes("hasta luego")) || /bye/gi.test(message.includes("Bye"))) {
        let finalresult = closing[Math.floor(Math.random() * closing.length)];
        speech.text = finalresult;
    }
    if (message.includes('ayuda') || /ayudar/gi.test(message.includes('necesito ayuda'))) {
        let finalresult = help[Math.floor(Math.random() * help.length)];
        speech.text = finalresult;
    }
    if ((message.includes('plantilla') && message.includes("myworksday"))) {
        let finalresult = plantilla[Math.floor(Math.random() * plantilla.length)];
        speech.text = finalresult;
    }
    if ((message.includes('plantilla') && message.includes("workable"))) {
        let finalresult = plantilla[Math.floor(Math.random() * plantilla.length)];
        speech.text = finalresult;
    }
    if (!message.includes("ana") && !message.includes("carlos")) {
        window.speechSynthesis.speak(speech);
        chatareamain.appendChild(showchatbotmsg(speech.text, "", ""));
    }

}

recognition.onresult = function(e) {
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    chatareamain.appendChild(showusermsg(transcript));
    chatbotvoice(transcript.toLowerCase());
    console.log(typeof(transcript));
}
recognition.onend = function() {
    mic.style.background = "#ff3b3b";
}
mic.addEventListener("click", function() {
    mic.style.background = '#39c81f';
    recognition.start();
    console.log("Activated");
})