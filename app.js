const $=id=>document.getElementById(id);
const human=$('human');
const LIBRARY_KEY='trikaalCharacterLibrary.v1';
let auto=true, zoom=true, selectedId=null;
function update(){
 human.setAttribute('preset',$('preset').value);
 human.setAttribute('detail',$('detail').value);
 human.setAttribute('animation',$('animation').value);
 human.setAttribute('expression',$('expression').value);
 human.setAttribute('colors',\`outfit: \${$('outfitColor').value}; shoes: \${$('shoeColor').value}\`);
 $('status').textContent='मानव मॉडल अपडेट हो रहा है…';
}
human.addEventListener('load',()=>{$('status').textContent='3D मानव preview तैयार · उंगली से घुमाएँ'});
human.addEventListener('error',e=>{$('status').textContent='मॉडल लोड नहीं हुआ: '+(e.detail?.message||'इंटरनेट जाँचें')});
['preset','detail','animation','expression','outfitColor','shoeColor'].forEach(id=>$(id).addEventListener('change',update));
$('rotate').onclick=()=>{auto=!auto;if(auto)human.setAttribute('auto-rotate','');else human.removeAttribute('auto-rotate');$('rotate').textContent=auto?'⟳ ऑटो घुमाव':'▶ ऑटो घुमाव चालू'};
$('zoom').onclick=()=>{zoom=!zoom;if(zoom)human.setAttribute('zoom','');else human.removeAttribute('zoom');$('zoom').textContent=zoom?'ज़ूम सक्षम':'ज़ूम बंद'};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});
function state(){return Object.fromEntries(['preset','detail','animation','expression','outfitColor','shoeColor'].map(k=>[k,$(k).value]))}
function apply(s){for(const [k,v] of Object.entries(s||{}))if($(k))$(k).value=v;update()}
function readLibrary(){try{return JSON.parse(localStorage.getItem(LIBRARY_KEY)||'[]')}catch{return []}}
function writeLibrary(items){localStorage.setItem(LIBRARY_KEY,JSON.stringify(items))}
function renderLibrary(){
 const list=$('characterList'),items=readLibrary();list.replaceChildren();
 if(!items.length){const p=document.createElement('p');p.className='smallprint';p.textContent='अभी कोई पात्र सेव नहीं है।';list.append(p);return}
 items.forEach(item=>{
  const row=document.createElement('div');row.className='character-item';
  const name=document.createElement('span');name.textContent=item.name+(item.id===selectedId?' · चुना हुआ':'');
  const open=document.createElement('button');open.textContent='चुनें';open.onclick=()=>{selectedId=item.id;$('characterName').value=item.name;apply(item.settings);renderLibrary()};
  const del=document.createElement('button');del.textContent='हटाएँ';del.onclick=()=>{writeLibrary(readLibrary().filter(x=>x.id!==item.id));if(selectedId===item.id)selectedId=null;renderLibrary()};
  row.append(name,open,del);list.append(row);
 });
}
$('saveCharacter').onclick=()=>{
 const name=$('characterName').value.trim();if(!name){$('status').textContent='पहले पात्र का नाम लिखें';return}
 const items=readLibrary(),item={id:selectedId||('c_'+Date.now()+'_'+Math.random().toString(36).slice(2,7)),name,settings:state(),updatedAt:new Date().toISOString()};
 const i=items.findIndex(x=>x.id===item.id);if(i>=0)items[i]=item;else items.push(item);
 writeLibrary(items);selectedId=item.id;renderLibrary();$('status').textContent='“'+name+'” की preview सेटिंग सेव हो गई';
};
$('save').onclick=()=>{if(!selectedId){$('status').textContent='नया पात्र सेव करने के लिए नीचे नाम लिखें';$('characterName').focus();return}const items=readLibrary();const item=items.find(x=>x.id===selectedId);if(item){item.settings=state();item.updatedAt=new Date().toISOString();writeLibrary(items);renderLibrary();$('status').textContent='चुने पात्र की preview सेटिंग अपडेट हुई'}};
$('load').onclick=()=>{const item=readLibrary().find(x=>x.id===selectedId);if(item){apply(item.settings);$('characterName').value=item.name}else $('status').textContent='पहले संग्रह से कोई पात्र चुनें'};
$('reset').onclick=()=>{selectedId=null;$('characterName').value='';apply({preset:'The Adventurer',detail:'high',animation:'idle',expression:'neutral',outfitColor:'#762d3b',shoeColor:'#30251f'});renderLibrary()};
$('share').onclick=()=>window.open('https://ara3dgen.com/app/','_blank','noopener');
renderLibrary();update();