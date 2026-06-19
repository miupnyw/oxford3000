let DATA = [];
let CAT_ORDER = [];

const catSel = document.getElementById('cat');
let state={q:'',lvl:'all',cat:'all',quiz:false};

function render(){
  let d=DATA;
  if(state.lvl!=='all') d=d.filter(x=>x.level.startsWith(state.lvl));
  if(state.cat!=='all') d=d.filter(x=>x.cat===state.cat);
  if(state.q){
    const q=state.q.toLowerCase();
    d=d.filter(x=>x.word.toLowerCase().includes(q)||x.reading.includes(state.q)||x.meaning.includes(state.q));
  }
  document.getElementById('shown').textContent=d.length.toLocaleString();
  const list=document.getElementById('list');
  const empty=document.getElementById('empty');
  list.innerHTML='';
  if(!d.length){empty.style.display='block';return}
  empty.style.display='none';

  // group by category, preserve global order
  const groups={};
  d.forEach(x=>{(groups[x.cat]=groups[x.cat]||[]).push(x)});
  const order = state.cat==='all' ? CAT_ORDER.map(c=>c[0]) : [state.cat];

  order.filter(c=>groups[c]).forEach(cat=>{
    const block=document.createElement('section');block.className='catblock';
    block.innerHTML=`<div class="cathead"><h2>${cat}</h2><span class="n">${groups[cat].length} คำ</span></div>`;
    const grid=document.createElement('div');grid.className='grid';
    groups[cat].forEach(x=>{
      const lv=x.level.match(/[AB][12]/)?x.level.match(/[AB][12]/)[0]:'';
      const card=document.createElement('div');card.className='card';
      card.innerHTML=`
        <div class="cardtop">
          <div><div class="word">${x.word}</div><div class="pos">${x.pos}</div></div>
          <span class="lvl ${lv}">${x.level}</span>
        </div>
        <div class="reading">${x.reading}</div>
        <div class="meaning">${x.meaning}</div>
        <span class="hint">แตะเพื่อดู</span>`;
      card.onclick=()=>{if(state.quiz)card.classList.toggle('flip')};
      grid.appendChild(card);
    });
    block.appendChild(grid);list.appendChild(block);
  });
}

// search
let t;
document.getElementById('q').addEventListener('input',e=>{
  clearTimeout(t);t=setTimeout(()=>{state.q=e.target.value.trim();render()},120);
});
// levels
document.getElementById('lvls').addEventListener('click',e=>{
  if(e.target.tagName!=='BUTTON')return;
  document.querySelectorAll('#lvls button').forEach(b=>b.classList.remove('on'));
  e.target.classList.add('on');state.lvl=e.target.dataset.l;render();
});
// category
catSel.addEventListener('change',e=>{state.cat=e.target.value;render()});
// quiz
const quizBtn=document.getElementById('quiz');
quizBtn.addEventListener('click',()=>{
  state.quiz=!state.quiz;
  quizBtn.classList.toggle('on',state.quiz);
  quizBtn.textContent=state.quiz?'โหมดทบทวน: เปิด':'โหมดทบทวน';
  document.body.classList.toggle('hide-answer-active',state.quiz);
  document.body.classList.toggle('hide-answer',state.quiz);
  if(!state.quiz)document.querySelectorAll('.card.flip').forEach(c=>c.classList.remove('flip'));
  render();
});
// default: answers visible (study mode), quiz hides them
document.body.classList.remove('hide-answer');

// to top
const totop=document.getElementById('totop');
window.addEventListener('scroll',()=>{totop.classList.toggle('show',scrollY>500)});
totop.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// load data then build category list + first render
async function init(){
  DATA = await fetch('oxford3000.json').then(r=>r.json());
  CAT_ORDER = [...new Set(DATA.map(d=>d.cat))]
    .map(c=>[c, DATA.filter(d=>d.cat===c).length])
    .sort((a,b)=>b[1]-a[1]);

  document.getElementById('totWord').textContent = DATA.length.toLocaleString();
  document.getElementById('totCat').textContent = CAT_ORDER.length;
  CAT_ORDER.forEach(([c,n])=>{
    const o=document.createElement('option');o.value=c;o.textContent=`${c} (${n})`;catSel.appendChild(o);
  });

  render();
}
init();
