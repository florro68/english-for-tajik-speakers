let currentText='',currentRate=.84;
function voice(){let v=speechSynthesis.getVoices();return v.find(x=>x.lang.startsWith('en'))||v[0]}
function speakText(t,r=.84){speechSynthesis.cancel();currentText=t.replace(/<br\s*\/?>/gi,' ');currentRate=r;let u=new SpeechSynthesisUtterance(currentText);u.lang='en-US';u.rate=r;let vv=voice();if(vv)u.voice=vv;speechSynthesis.speak(u)}
function pauseAudio(){speechSynthesis.pause()}
function resumeAudio(){speechSynthesis.resume()}
function replayAudio(){if(currentText)speakText(currentText,currentRate)}
function speakWithPauses(a,p=3000,r=.76){speechSynthesis.cancel();let i=0;currentText=a.join('. ');currentRate=r;function n(){if(i>=a.length)return;let u=new SpeechSynthesisUtterance(a[i]);u.lang='en-US';u.rate=r;let vv=voice();if(vv)u.voice=vv;u.onend=()=>{i++;setTimeout(n,p)};speechSynthesis.speak(u)}n()}
function chooseAnswer(button,correct){let group=button.closest('.question');group.querySelectorAll('.choice').forEach(x=>{x.disabled=true;x.classList.remove('correct','wrong')});button.classList.add(correct?'correct':'wrong');let result=group.querySelector('.feedback');result.textContent=correct?'Correct. Офарин!':'Try again. Боз кӯшиш кунед.';result.className='feedback '+(correct?'good':'bad');if(!correct)setTimeout(()=>group.querySelectorAll('.choice').forEach(x=>x.disabled=false),900)}
function checkTyped(button,answer){let box=button.closest('.typed');let input=box.querySelector('input');let result=box.querySelector('.feedback');let clean=x=>x.trim().toLowerCase().replace(/[?.!,]/g,'').replace(/\s+/g,' ');let ok=clean(input.value)===clean(answer);result.textContent=ok?'Correct. Офарин!':'Answer: '+answer;result.className='feedback '+(ok?'good':'bad')}
function reveal(id){let el=document.getElementById(id);el.hidden=!el.hidden}
