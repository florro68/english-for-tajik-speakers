
let currentUtterance=null,currentText="",currentRate=.86;
function chooseVoice(){const v=speechSynthesis.getVoices();return v.find(x=>x.lang.startsWith("en")&&/Google|Microsoft|Samantha|Daniel|Zira|David/i.test(x.name))||v.find(x=>x.lang.startsWith("en"))||v[0]}
function speakText(text,rate=.86){speechSynthesis.cancel();currentText=text;currentRate=rate;const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate;u.pitch=1;const voice=chooseVoice();if(voice)u.voice=voice;currentUtterance=u;speechSynthesis.speak(u)}
function pauseAudio(){if(speechSynthesis.speaking&&!speechSynthesis.paused)speechSynthesis.pause()}
function resumeAudio(){if(speechSynthesis.paused)speechSynthesis.resume()}
function replayAudio(){if(currentText)speakText(currentText,currentRate)}
function speakWithPauses(items,pauseMs=3000,rate=.78){speechSynthesis.cancel();let i=0;currentText=items.join(". ");currentRate=rate;function next(){if(i>=items.length)return;const u=new SpeechSynthesisUtterance(items[i]);u.lang="en-US";u.rate=rate;const voice=chooseVoice();if(voice)u.voice=voice;u.onend=()=>{i++;setTimeout(next,pauseMs)};currentUtterance=u;speechSynthesis.speak(u)}next()}
speechSynthesis.onvoiceschanged=chooseVoice;
