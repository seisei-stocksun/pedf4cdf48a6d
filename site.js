
const progress=document.querySelector('.progress');
const reveals=[...document.querySelectorAll('.reveal')];
const header=document.querySelector('header');
let lastScroll=0;
const io=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('is-visible');});
},{threshold:.16});
reveals.forEach(el=>io.observe(el));
function updateProgress(){
  const scrollTop=window.scrollY;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  const p=h>0 ? (scrollTop/h)*100 : 0;
  if(progress) progress.style.width=p+'%';
  if(header){
    header.classList.toggle('scrolled',scrollTop>24);
    const goingDown=scrollTop>lastScroll && scrollTop>140;
    header.classList.toggle('hidden',goingDown);
    lastScroll=scrollTop;
  }
}
updateProgress();
window.addEventListener('scroll',updateProgress,{passive:true});
const root=document.documentElement;
window.addEventListener('pointermove',(e)=>{
  root.style.setProperty('--sx',e.clientX+'px');
  root.style.setProperty('--sy',e.clientY+'px');
  const x=(e.clientX/window.innerWidth-.5)*18;
  const y=(e.clientY/window.innerHeight-.5)*12;
  root.style.setProperty('--mx',x+'px');
  root.style.setProperty('--my',y+'px');
},{passive:true});
const topBtn=document.querySelector('.top-btn');
if(topBtn){topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
