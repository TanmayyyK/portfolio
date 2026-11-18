(() => {
const doc=document,root=doc.documentElement,themeButton=doc.querySelector("#theme"),saved=(()=>{try{return localStorage.getItem("portfolio-theme")}catch{return null}})();
const preferLight=matchMedia("(prefers-color-scheme: light)").matches;root.dataset.theme=saved|| (preferLight?"light":"dark");
function updateTheme(){themeButton.textContent=root.dataset.theme==="dark"?"☀":"☾";themeButton.setAttribute("aria-label","Switch to "+(root.dataset.theme==="dark"?"light":"dark")+" theme")}
updateTheme();themeButton.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";try{localStorage.setItem("portfolio-theme",root.dataset.theme)}catch{}updateTheme()});
const buttons=[...doc.querySelectorAll("[data-filter]")],cards=[...doc.querySelectorAll("[data-stack]")],count=doc.querySelector("#results");
buttons.forEach(btn=>btn.addEventListener("click",()=>{const value=btn.dataset.filter;buttons.forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));let visible=0;cards.forEach(card=>{const shown=value==="All"||card.dataset.stack.split("|").includes(value);card.hidden=!shown;if(shown)visible++});count.textContent=visible+" projects shown"}));
const modal=doc.querySelector("#command"),field=doc.querySelector("#command-search"),links=[...doc.querySelectorAll("#command-list li")];
function open(){modal.showModal();field.value="";links.forEach(x=>x.hidden=false);field.focus()}
doc.querySelector("#search-trigger").addEventListener("click",open);doc.querySelector("#command-close").addEventListener("click",()=>modal.close());
doc.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();modal.open?modal.close():open()}});
field.addEventListener("input",()=>links.forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(field.value.toLowerCase())));
modal.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>modal.close()));
const bar=doc.querySelector("#progress");let ticking=false;
function update(){const full=doc.documentElement.scrollHeight-innerHeight;bar.style.transform="scaleX("+(full>0?Math.min(1,scrollY/full):0)+")";ticking=false}
addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
const reduced=matchMedia("(prefers-reduced-motion: reduce)");
if(!reduced.matches&&"IntersectionObserver"in window){doc.body.classList.add("js-motion");const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.08});doc.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}
const activeObserver=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)doc.querySelectorAll(".navlinks a").forEach(a=>{if(a.hash==="#"+e.target.id)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")})})},{rootMargin:"-25% 0px -65% 0px"});doc.querySelectorAll("main section[id]").forEach(x=>activeObserver.observe(x));
})();