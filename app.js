const $=id=>document.getElementById(id);
const human=$('human');
let auto=true, zoom=true;
function update(){
 human.setAttribute('preset',$('preset').value);
 human.setAttribute('detail',$('detail').value);
 human.setAttribute('animation',$('animation').value);
 human.setAttribute('expression',$('expression').value);
 human.setAttribute('colors',`outfit: ${$('outfitColor').value}; shoes: ${$('shoeColor').value}`);
 $('status').textContent='मानव मॉडल तैयार हो रहा है…';
}
human.addEventListener('load',()=>{$('status').textContent='वास्तविक मानव 3D मॉडल तैयार · टच से घुमाएँ'});
human.addEventListener('error',e=>{$('status').textContent='मॉडल लोड नहीं हुआ: '+(e.detail?.message||'इंटरनेट जाँचें')});
['preset','detail','animation','expression','outfitColor','shoeColor'].forEach(id=>$(id).addEventListener('change',update));
$('rotate').onclick=()=>{auto=!auto;if(auto)human.setAttribute('auto-rotate','');else human.removeAttribute('auto-rotate');$('rotate').textContent=auto?'⟳ ऑटो घुमाव':'▶ ऑटो घुमाव चालू'};
$('zoom').onclick=()=>{zoom=!zoom;if(zoom)human.setAttribute('zoom','');else human.removeAttribute('zoom');$('zoom').textContent=zoom?'ज़ूम सक्षम':'ज़ूम बंद'};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});
function state(){return Object.fromEntries(['preset','detail','animation','expression','outfitColor','shoeColor'].map(k=>[k,$(k).value]))}
function apply(s){for(const [k,v] of Object.entries(s||{}))if($(k))$(k).value=v;update()}
$('save').onclick=()=>{localStorage.setItem('trikaalHumanStudio',JSON.stringify(state()));$('status').textContent='सेटिंग इस डिवाइस में सेव हो गई'};
$('load').onclick=()=>{const s=localStorage.getItem('trikaalHumanStudio');if(s)apply(JSON.parse(s));else $('status').textContent='अभी कोई सेव सेटिंग नहीं है'};
$('reset').onclick=()=>{apply({preset:'The Adventurer',detail:'medium',animation:'idle',expression:'neutral',outfitColor:'#762d3b',shoeColor:'#30251f'})};
$('share').onclick=()=>window.open('https://ara3dgen.com/app/','_blank','noopener');
update();
