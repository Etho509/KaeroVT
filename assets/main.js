(function(){
  const hallway=document.getElementById('hallway'),bearing=document.getElementById('bearing');
  const chars=' .·:+x#'; let angle=0,last=0;
  function render(t){
    if(t-last>75){last=t;angle+=.035;const w=55,h=25,lines=[];
      for(let y=0;y<h;y++){let line='';for(let x=0;x<w;x++){
        const nx=(x-w/2)/(w/2),ny=(y-h/2)/(h/2),r=Math.max(Math.abs(nx),Math.abs(ny));
        const twist=Math.sin(angle+Math.atan2(ny,nx)*2+r*7)*.07;
        const edge=Math.abs(((r+twist)*8)%1-.5);let c=' ';
        if(r>.92||edge<.045)c=chars[Math.min(chars.length-1,Math.floor(r*chars.length))];
        if(r<.12)c=' '; if(Math.abs(nx)<.035&&r>.68)c='|'; line+=c;
      }lines.push(line)}
      hallway.textContent=lines.join('\n');bearing.textContent=String(Math.floor((angle*57.3)%360)).padStart(3,'0')+'°';
    }requestAnimationFrame(render)
  }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(render);else hallway.textContent='┌──────────────────────┐\n│                      │\n│        hallway       │\n│                      │\n└──────────────────────┘';
  document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'});
  document.getElementById('measure').addEventListener('click',function(){this.textContent=this.textContent==='¼ inch'?'5½ inches':'¼ inch'});
  document.getElementById('audio').addEventListener('click',function(){document.getElementById('transcript').hidden=false;this.textContent='[ tape ended ]'});
  document.getElementById('photo').addEventListener('click',function(){this.classList.toggle('revealed')});
  document.querySelectorAll('.footnote-trigger').forEach(function(trigger){trigger.addEventListener('click',function(){const w=document.getElementById('whisper');w.textContent=this.dataset.secret;w.classList.add('show');setTimeout(()=>w.classList.remove('show'),6500)})});
  document.querySelectorAll('.forbidden-name').forEach(function(name){let timer;name.addEventListener('pointerdown',function(){timer=setTimeout(()=>{this.textContent=this.dataset.name;this.classList.add('revealed')},1200)});['pointerup','pointerleave'].forEach(event=>name.addEventListener(event,function(){clearTimeout(timer)}))});
  document.getElementById('pajamas').addEventListener('click',function(){document.body.classList.add('pajama-evidence');setTimeout(()=>document.body.classList.remove('pajama-evidence'),2600)});
  let titleClicks=0;document.getElementById('title').addEventListener('click',function(){titleClicks++;if(titleClicks===5){document.documentElement.style.transform='scaleX(-1)';setTimeout(()=>document.documentElement.style.transform='',1800)}});
  let marks=0;document.getElementById('mark').addEventListener('click',function(){marks++;if(marks===3)location.href='login.html'});
  const messages=['you have been here before','the hall is now ⅛ inch longer','there is a page missing','do not trust the index'];
  let keys='';addEventListener('keydown',function(e){keys=(keys+e.key.toLowerCase()).slice(-20);if(keys.endsWith('house'))location.href='login.html';if(keys.endsWith('office'))document.getElementById('footnote-3').textContent='The office door is open now.';if(keys.endsWith('longmancooking')){const w=document.getElementById('whisper');w.textContent='FILE REJECTED: PROSE QUALITY BELOW ARCHIVAL THRESHOLD';w.classList.add('show');setTimeout(()=>w.classList.remove('show'),7000)}});
  setInterval(function(){if(Math.random()<.28){const w=document.getElementById('whisper');w.textContent=messages[Math.floor(Math.random()*messages.length)];w.classList.add('show');setTimeout(()=>w.classList.remove('show'),5000)}},11000);
})();
