var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ['hey jarvis'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startRecognition() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    var color = event.results[0][0].transcript;
    console.log(event);
    console.log('Confidence: ' + event.results[0][0].confidence);
    console.log('Color: ' + color);
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    console.log('I didnt recognise that color.');
}

recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
}