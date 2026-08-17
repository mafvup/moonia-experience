const FB='https://www.facebook.com/profile.php?id=61592431890783';
const WA_NUMBER='526143704384';
const SITE_URL='https://mafvup.github.io/moonia-experience/';

function waLink(message){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('done'),900);
  document.getElementById('mainWhatsApp').href=waLink(
    'Hola Moonia 🌙 Vi su experiencia y me gustaría platicarles sobre un proyecto. ✨'
  );
});

const answers={}; let step=1;
const steps=[...document.querySelectorAll('.quiz-step')];

function showStep(n){
  steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===n));
  [1,2,3].forEach(i=>document.getElementById('p'+i).classList.toggle('on',i<=n));
}

document.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{
  answers[btn.dataset.key]=btn.dataset.value;
  btn.animate(
    [{transform:'scale(1)'},{transform:'scale(.985)'},{transform:'scale(1)'}],
    {duration:180,easing:'ease-out'}
  );
  if(step<3){step++;showStep(step)} else showResult();
}));

const routes={
  digital:{name:'Moonia Digital',price:'$2,900 / mes',text:'Una base clara para mantener presencia, contenido y constancia sin complicar de más.'},
  hybrid:{name:'Moonia Híbrido',price:'$5,900 / mes',text:'Contenido + estrategia para una marca que ya quiere crecer con más intención.'},
  presencial:{name:'Moonia Presencial',price:'$9,900 / mes',text:'Producción real, contenido y estrategia para marcas que necesitan presencia constante y material propio.'},
  site:{name:'Sitio Negocio',price:'$13,900',text:'Una presencia web profesional para explicar lo que haces, captar contactos y convertir visitas en oportunidades.'},
  landing:{name:'Landing Turística',price:'$7,900',text:'Una página directa y enfocada en promoción, captación y contacto.'},
  pleamar:{name:'Pleamar',price:'$12,900 / mes',text:'Una ruta pensada para turismo y hospitalidad: contenido, posicionamiento y estrategia orientada a reservas.'},
  ads:{name:'Meta + Google',price:'desde $4,500 / mes',text:'Una combinación de campañas para captar demanda y convertirla en visitas, mensajes o ventas. Inversión publicitaria por separado.'},
  ecommerce:{name:'E-commerce Esencial',price:'desde $35,000',text:'Tienda online con una base sólida para catálogo, pagos, envíos y crecimiento comercial.'},
  custom:{name:'Página Web a la Medida',price:'según tus necesidades',text:'Cuando el proyecto necesita funciones propias, diseñamos la estructura alrededor de tus objetivos.'},
  sicigia:{name:'Sicigia',price:'$34,900',text:'Cuando quieres alinear web, redes, foto, SEO y mantenimiento como un solo ecosistema digital.'}
};

function recommend(){
  const {type,goal,stage}=answers;
  if(stage==='todo') return routes.sicigia;
  if(goal==='especial') return (type==='negocio' && stage!=='inicio')?routes.ecommerce:routes.custom;
  if(type==='turismo' && goal==='web') return stage==='inicio'?routes.landing:routes.pleamar;
  if(type==='turismo') return routes.pleamar;
  if(goal==='ventas') return routes.ads;
  if(goal==='web') return routes.site;
  if(goal==='redes' && stage==='inicio') return routes.digital;
  if(goal==='redes' && stage==='crecer') return routes.presencial;
  return routes.hybrid;
}

function showResult(){
  steps.forEach(s=>s.classList.remove('active'));
  [1,2,3].forEach(i=>document.getElementById('p'+i).classList.add('on'));
  const r=recommend();
  document.getElementById('resultName').textContent=r.name;
  document.getElementById('resultPrice').textContent=r.price;
  document.getElementById('resultText').textContent=r.text;

  const message=`Hola Moonia 🌙
Acabo de hacer “Descubre tu órbita” y me recomendó ${r.name} (${r.price}).
Me gustaría conocer más sobre la propuesta y ver cómo podría adaptarse a mi proyecto. ✨`;
  document.getElementById('resultContact').href=waLink(message);
  document.getElementById('result').classList.add('show');

  setTimeout(()=>{
    document.getElementById('result').scrollIntoView({behavior:'smooth',block:'center'});
  },120);
}

document.getElementById('restart').addEventListener('click',()=>{
  Object.keys(answers).forEach(k=>delete answers[k]);
  step=1;
  document.getElementById('result').classList.remove('show');
  showStep(1);
});

const toast=document.getElementById('toast');
function pop(msg){
  toast.textContent=msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1800);
}

document.getElementById('shareBtn').addEventListener('click',async()=>{
  const text='🌙 Conocí Moonia y prepararon una experiencia para descubrir qué pueden hacer por un negocio, marca o proyecto. Encuentra tu órbita aquí:';
  const url=location.protocol.startsWith('http')?SITE_URL:FB;
  if(navigator.share){
    try{
      await navigator.share({title:'Moonia · ¿Qué quieres crear hoy?',text,url});
      return;
    }catch(e){}
  }
  const wa='https://wa.me/?text='+encodeURIComponent(text+' '+url);
  window.open(wa,'_blank','noopener');
});

// Subtle reveal animation
const revealEls=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -20px 0px'});
  revealEls.forEach(el=>io.observe(el));
}else{
  revealEls.forEach(el=>el.classList.add('in'));
}
