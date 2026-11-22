import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const $=id=>document.getElementById(id), scene=new THREE.Scene();scene.background=new THREE.Color('#211a29');scene.fog=new THREE.Fog('#211a29',9,18);
const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,2.25,7.5);
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;$('viewport').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffe4c4,0x40334d,2));const key=new THREE.DirectionalLight(0xffd6a0,3);key.position.set(3,6,5);key.castShadow=true;scene.add(key);const rim=new THREE.DirectionalLight(0x9b9dff,2);rim.position.set(-4,3,-3);scene.add(rim);
const floor=new THREE.Mesh(new THREE.CircleGeometry(4,64),new THREE.MeshStandardMaterial({color:'#514050',roughness:.9}));floor.rotation.x=-Math.PI/2;floor.position.y=-.03;floor.receiveShadow=true;scene.add(floor);
let avatar=new THREE.Group();scene.add(avatar);let rotating=true,drag=false,lastX=0;
const mat=(c,rough=.75,metal=0)=>new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal});
function ball(parent,x,y,z,sx,sy,sz,m){const o=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;parent.add(o);return o}
function cyl(parent,x,y,z,rt,rb,h,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,24),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
function limb(parent,a,b,r,m){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=B.clone().sub(A);const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r*.88,d.length(),16),m);o.position.copy(A.add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());o.castShadow=true;parent.add(o);ball(parent,...a,r,r,r,m);ball(parent,...b,r,r,r,m)}
function build(){avatar.clear();const g=$('gender').value,skin=mat($('skin').value),hair=mat($('hair').value),cloth=mat($('cloth').value,.65),gold=mat('#c59a4b',.28,.72),dark=mat('#30212a'),eye=mat($('eyes').value,.25),scale=+$('height').value/100,wide=1+(+$('build').value-50)/250,fw=1+(+$('faceWidth').value-50)/250;
avatar.scale.set(1,scale,1);
const female=g==='female',shoulder=female?.36:.43,hip=female?.36:.31;
ball(avatar,0,1.18,0,shoulder, .48,.24,skin);ball(avatar,0,.76,0,hip,.39,.23,skin);
cyl(avatar,0,1.16,0,.27,.29,.48,cloth);
ball(avatar,0,1.57,0,.115,.16,.12,skin);
ball(avatar,0,1.91,0,.235*fw,.29,.21,skin);
ball(avatar,0,2.12,-.015,.24*fw,.14,.22,hair);
ball(avatar,-.235*fw,1.92,0,.035,.045,.045,skin);ball(avatar,.235*fw,1.92,0,.035,.045,.045,skin);
for(const x of [-.085,.085]){ball(avatar,x,1.96,.185,.043,.035,.025,mat('#f5e9d8'));ball(avatar,x,1.96,.207,.019,.025,.012,eye);ball(avatar,x,1.96,.217,.008,.014,.006,mat('#100d12'))}
ball(avatar,0,1.88,.205,.025,.05,.025,skin);ball(avatar,0,1.82,.21,.06,.018,.015,mat('#6f3434'));
if($('facialHair').value!=='none'&&!female){ball(avatar,0,1.82,.19,.13,.045,.04,hair);if($('facialHair').value==='beard')ball(avatar,0,1.76,.14,.14,.09,.1,hair)}
const armY=1.42;limb(avatar,[-shoulder-.04,armY,0],[-.56, .84,0],.075,skin);limb(avatar,[shoulder+.04,armY,0],[.56,.84,0],.075,skin);
limb(avatar,[-.17,.55,0],[-.19,.12,0],.095,skin);limb(avatar,[.17,.55,0],[.19,.12,0],.095,skin);
if($('outfit').value==='saree'||$('outfit').value==='lehenga'||$('outfit').value==='salwar'){cyl(avatar,0,.58,0,.34,.42,.65,cloth);if($('outfit').value!=='salwar')ball(avatar,.28,1.14,-.03,.08,.42,.09,cloth)}
else{cyl(avatar,0,.48,0,.32,.28,.48,cloth);if($('outfit').value==='dhoti')ball(avatar,.08,.36,.08,.18,.34,.2,mat('#e8d9bb'))}
if($('outfit').value==='sherwani'){for(let y=.95;y<1.43;y+=.1)ball(avatar,.02,y,.25,.018,.018,.012,gold)}
if($('drape').value!=='none'){const d=mat($('drape').value==='royal'?'#d7b36a':'#e2c9a3');ball(avatar,female?.31:-.3,1.3,-.02,.11,.48,.08,d)}
if($('jewelry').value!=='none'){ball(avatar,0,1.53,.23,.13,.035,.025,gold);if(female){ball(avatar,0,2.24,.01,.025,.09,.025,gold);for(const x of [-.25,.25])ball(avatar,x,1.9,.02,.035,.07,.035,gold)}}
if($('shoes').value!=='bare'){for(const x of [-.19,.19])ball(avatar,x,.07,.07,.12,.06,.2,$('shoes').value==='mojari'?gold:dark)}
avatar.rotation.y=0}
function resize(){const w=$('viewport').clientWidth,h=$('viewport').clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}window.addEventListener('resize',resize);resize();build();$('loading').style.display='none';$('status').textContent='3D तैयार · टच से घुमाएँ';
function animate(){requestAnimationFrame(animate);if(rotating&&!drag)avatar.rotation.y+=.003;renderer.render(scene,camera)}animate();
$('viewport').addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX});window.addEventListener('pointerup',()=>drag=false);window.addEventListener('pointermove',e=>{if(drag){avatar.rotation.y+=(e.clientX-lastX)*.01;lastX=e.clientX}});
$('rotate').onclick=()=>{rotating=!rotating;$('rotate').textContent=rotating?'⟳ घुमाएँ':'▶ घुमाना बंद'};$('resetView').onclick=()=>{avatar.rotation.set(0,0,0);camera.position.set(0,2.25,7.5)};
document.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',()=>{if(el.type==='range'){const out=$(el.id+'Out');if(out)out.textContent=el.id==='height'?el.value+'%':el.id==='build'?(el.value<35?'पतला':el.value>65?'भरा हुआ':'मध्यम'):el.value}build()}));
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});
function data(){const d={};['name','gender','height','build','skin','hair','faceWidth','facialHair','outfit','cloth','drape','jewelry','eyes','shoes'].forEach(k=>d[k]=$(k).value);return d}
function apply(d){Object.entries(d).forEach(([k,v])=>{if($(k))$(k).value=v});document.querySelectorAll('input,select').forEach(el=>el.dispatchEvent(new Event('input')))}
function saved(){const a=JSON.parse(localStorage.getItem('trikaalCharacters')||'[]');$('savedList').innerHTML=a.length?'सेव पात्र: '+a.map((x,i)=>'<button data-i="'+i+'">'+(x.name||'पात्र '+(i+1))+'</button>').join(' '):'अभी कोई पात्र सेव नहीं है।';$('savedList').querySelectorAll('button').forEach(b=>b.onclick=()=>apply(a[+b.dataset.i]))}
$('save').onclick=()=>{const a=JSON.parse(localStorage.getItem('trikaalCharacters')||'[]'),d=data();a.push(d);localStorage.setItem('trikaalCharacters',JSON.stringify(a));saved();$('status').textContent='पात्र सेव हो गया'};
$('load').onclick=saved;$('export').onclick=()=>{const blob=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(data().name||'trikaal-character')+'.json';a.click();URL.revokeObjectURL(a.href)};
$('screenshot').onclick=()=>{const a=document.createElement('a');a.download='trikaal-character.png';a.href=renderer.domElement.toDataURL('image/png');a.click()};saved();