(() => {
'use strict';
const form=document.querySelector('.command-form');
form.addEventListener('submit',event=>{event.preventDefault();const input=form.elements.command;const command=input.value.trim();if(!command){input.focus();return;}document.querySelector('.command-error').textContent=command+': command not found';const unknown=document.querySelector('.unknown-error');unknown.hidden=false;unknown.style.opacity='1';});
const reduce=new URLSearchParams(location.search).get('motion')==='reduce';
if(!window.gsap||!window.ScrollTrigger||reduce)return;
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.clearScrollMemory('manual');
const mm=gsap.matchMedia();
mm.add({mobile:'(max-width:700px)',desktop:'(min-width:701px)',reduce:'(prefers-reduced-motion:reduce)'},context=>{
 if(context.conditions.reduce)return;
 const mobile=context.conditions.mobile,scene=document.querySelector('.sequence'),stage=document.querySelector('.stage');
 document.body.classList.add('animated');
 let viewportWidth=document.documentElement.clientWidth,viewportHeight=Math.max(document.documentElement.clientHeight,mobile?480:500);
 const width=()=>viewportWidth,height=()=>viewportHeight;
 const cover=()=>Math.max(width()/740,height()/(mobile?680:500))*1.035;
 const fit=()=>Math.min(width()/1600,height()/1000)*(mobile?1.5:1.13);
 const readingWidth=()=>{viewportWidth=document.documentElement.clientWidth;viewportHeight=Math.max(document.documentElement.clientHeight,mobile?480:500);const style=document.documentElement.style;style.setProperty('--reading-width',Math.min(mobile?316:630,width()/cover()*.84)+'px');style.setProperty('--reading-font',Math.max(mobile?15:14,(mobile?17:23)/cover())+'px');};
 readingWidth();
 gsap.set('.camera',{scale:cover,rotationX:0,rotationY:0,rotationZ:0,x:0,y:0,z:0});
 gsap.set('.level',{scale:1});
 gsap.set('.level-left,.level-floor,.level-return,.level-slice',{scale:0});
 let tl;
 const scrollLength=()=>height()*(mobile?6.3:6.8)*(tl?.duration()||9)/9;
 tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:scene,pin:stage,start:'top top',end:()=>'+='+Math.round(scrollLength()),scrub:.25,invalidateOnRefresh:true,onRefreshInit:readingWidth,onUpdate:new URLSearchParams(location.search).has('perf')||new URLSearchParams(location.search).has('capture')?self=>{scene.dataset.progress=self.progress.toFixed(4);scene.dataset.time=(self.progress*(tl?.duration()||9)).toFixed(3);}:undefined}});
 tl.to({}, {duration:.85})
 .to('.scroll-cue',{y:90,duration:.4},.65)
 // A familiar interface acquires an edge; the same element becomes the IC surface.
 .fromTo('.camera',{scale:cover,rotationX:0,rotationY:0,rotationZ:0,x:0,y:0,z:0},{scale:fit,rotationX:13,rotationZ:-8,x:()=>width()*(mobile?.015:.025),duration:1.55,ease:'power1.inOut'},.85)
 .to('.terminal-meta',{color:'#71866d',duration:.8},1.3)
 .to({}, {duration:.35},2.4)
 // The relation between substrate and components changes. No replacement still.
 .to('.camera',{rotationX:49,rotationZ:-24,rotationY:-7,scale:()=>fit()*(mobile?1.15:1.12),y:()=>height()*.10,duration:1.6,ease:'power1.inOut'},2.75)
 .to('.memory-one',{z:180,x:-100,y:50,rotationX:8,duration:1.6},2.75)
 .to('.memory-two',{z:220,x:-140,y:100,duration:1.6},2.75)
 .to('.controller',{z:130,x:60,duration:1.6},2.75)
 .to('.socket',{z:155,x:35,y:-55,rotationX:-7,rotationY:9,duration:1.3,ease:'power1.inOut'},3.05)
 .to('.memory-two',{rotationY:-7,duration:1.15,ease:'power1.inOut'},3.2)
 .to('.ribbon',{rotationX:-40,z:110,duration:1.6},2.75)
 // Passing under a lifted surface exposes a different set of rules below it.
 .to('.terminal-shell',{rotationX:-103,z:460,y:-650,duration:1.6,ease:'power1.inOut'},4.3)
 .to('.camera',{rotationX:18,rotationY:5,rotationZ:-10,y:()=>height()*.12,scale:()=>fit()*1.55,duration:1.7,ease:'power1.inOut'},4.3)
 .to('.north',{y:-300,z:140,rotationX:32,duration:1.6},4.3)
 .to('.south',{y:300,z:220,rotationX:-38,duration:1.6},4.3)
 .to('.west',{x:-330,z:210,rotationY:-40,duration:1.6},4.3)
 .to('.east',{x:330,z:120,rotationY:45,duration:1.6},4.3)
 .to('.cpu-pins',{scaleX:1.18,scaleY:1.18,z:90,duration:1.6},4.3)
 .to('.level-left,.level-floor,.level-return,.level-slice',{scale:1,duration:1.4,ease:'power1.inOut'},4.65)
 // The edges turn towards the observer, revealing their single-sided construction.
 .to('.camera',{scale:()=>fit()*(mobile?.9:.68),rotationX:-2,rotationY:-12,rotationZ:4,y:()=>height()*(mobile?.10:.17),x:()=>width()*.27,duration:1.75,ease:'power1.inOut'},5.9)
 .to('.level',{scale:1.48,z:170,duration:1.75,ease:'power1.inOut'},5.9)
 .to('.terminal-shell',{y:-2200,z:-200,x:-150,duration:1.75},5.9)
 .to('.north',{rotationY:150,z:400,y:-1500,duration:1.75},5.9)
 .to('.south',{rotationY:-145,z:350,y:1500,duration:1.75},5.9)
 .to('.west',{rotationY:-150,x:-2100,duration:1.75},5.9)
 .to('.east',{rotationY:155,x:2100,duration:1.75},5.9)
 .to('.cpu-pins',{z:800,y:900,duration:1.75},5.9)
 .to('.chip,.ribbon',{z:650,x:(i)=>i<2?-1200:1600,y:(i)=>i<2?500:-500,duration:1.75},5.9)
 .to('.passage-copy',{y:0,duration:1.3,ease:'power1.inOut'},6.9)
 .to('.level-back',{rotationY:8,duration:1.3},6.9)
 .to('.level-return',{rotationY:-111,duration:1.3},6.9)
 .to({}, {duration:.8});

 // The approved opening above keeps its keyframes and its original scroll distance.
 // Continuation: the existing geometry acquires material, depth, and a different scale.
 const opening='polygon(0% 0%,100% 0%,100% 100%,80% 100%,80% 30%,63% 30%,63% 100%,0% 100%)';
 gsap.set('.room-material',{y:0,yPercent:100});
 // Only the existing game faces change material at first. New architecture remains folded.
 gsap.set('.echo-room',{scale:1,scaleX:0,rotationY:-75,x:0,y:0});
 gsap.set('.echo-side',{scaleX:0});
 gsap.set('.envelope-back-wall,.envelope-side-wall',{scaleX:0});
 gsap.set('.far-surface',{scaleY:0});
 gsap.set('.ceiling-plane,.backrooms-floor',{scaleY:0});

 tl.addLabel('material',9)
 .set('.room-material',{visibility:'visible'},9)
 .set('.level .checker',{overflow:'hidden',backgroundImage:'url(assets/checker.png?v=f97dd58a6997)'},9)
 .set('.level-left,.level-floor,.level-return,.level-slice',{filter:'none'},9)
 .set('.board,.chip,.ribbon,.cpu',{display:'none'},9)
 .to('.passage-copy',{y:()=>-height()*1.25,duration:.7,ease:'power1.inOut'},9)
 .set('.level-back',{clipPath:opening},9)
 // Material travels across the same bounded faces, before the surrounding room can appear.
 .to('.room-material',{yPercent:0,duration:1.9,stagger:.18,ease:'power1.inOut'},9.15)
 // The newly materialised fragments begin to join; camera endpoints remain unchanged.
 .to('.level',{y:mobile?-360:0,duration:3,ease:'power1.inOut'},9)
 .to('.camera',{rotationX:1,rotationY:-5,rotationZ:0,scale:()=>fit()*(mobile?1.28:1.05),x:()=>width()*(mobile?-.06:.07),y:()=>height()*(mobile?.27:.025),duration:3,ease:'power1.inOut'},9)
 .to('.level-back',{rotationY:0,duration:1.8,ease:'power1.inOut'},9.6)
 .to('.level-left',{x:-150,y:15,z:-80,scaleY:.685,rotationY:73,duration:1.9,ease:'power1.inOut'},9.65)
 .to('.level-return',{rotationY:-76,duration:1.8,ease:'power1.inOut'},9.9)
 .to('.level-slice',{y:-1000,duration:2.2,ease:'power1.inOut'},9.8)
 // A transform, rather than an instantaneous height change, carries the game floor into the room.
 .to('.level-floor',{scaleY:.42,rotationX:90,duration:1.65,ease:'power1.inOut'},9)
 // Rooms unfold from the existing aperture, rather than arriving as miniature finished rooms.
 .set('.repeat-space',{autoAlpha:1},10.45)
 .to('.echo-room',{scaleX:1,rotationY:0,x:0,y:0,duration:1.1,stagger:.12,ease:'power1.inOut'},10.65)
 .to('.echo-side',{scaleX:1,duration:.7,stagger:.05,ease:'power1.inOut'},11.25)
 .to('.far-surface',{scaleY:1,duration:.8,ease:'power1.inOut'},11.2)
 // Ceiling and floor complete the same envelope after the walls have acquired material.
 .set('.ceiling-plane',{autoAlpha:1},10.6)
 .to('.ceiling-plane',{scaleY:1,duration:1.4,ease:'power1.inOut'},10.6)
 .set('.backrooms-floor',{autoAlpha:1},10.7)
 .to('.backrooms-floor',{scaleY:1,duration:1.3,ease:'power1.inOut'},10.7)
 .set('.room-envelope',{autoAlpha:1},11.15)
 .to('.envelope-back-wall,.envelope-side-wall',{scaleX:1,duration:.75,stagger:.1,ease:'power1.inOut'},11.15)
 .to('.stage',{backgroundColor:'#454329',duration:1.5},10.5)
 .set('.level-floor',{display:'none'},12)
 .addLabel('backrooms-reading',12.5)
 .set('.backrooms-reading',{autoAlpha:1},12.2)
 .to('.backrooms-reading',{x:0,duration:.8,ease:'power1.inOut'},12.2)
 .to({}, {duration:1.2},13)
 // A route that repeats, rather than a photograph that merely grows.
 .to('.backrooms-reading',{x:()=>-width()*1.1,duration:.8,ease:'power1.inOut'},14.2)
 .to('.camera',{rotationY:-18,rotationZ:-3,scale:()=>fit()*(mobile?1.25:.85),x:()=>width()*(mobile?-.14:.02),y:()=>height()*(mobile?.12:.02),duration:2,ease:'power1.inOut'},14.2)
 .to('.level-back',{x:-1050,z:480,rotationY:-57,duration:2,ease:'power1.inOut'},14.2)
 .to('.level-return',{x:410,rotationY:-102,duration:2,ease:'power1.inOut'},14.2)
 .to('.echo-one',{x:-160,rotationY:-12,duration:2},14.2)
 .to('.echo-two',{x:140,rotationY:9,duration:2},14.2)
 .to('.echo-three',{x:-120,rotationY:-8,duration:2},14.2)
 .set('.route-word',{autoAlpha:1},14.7)
 .fromTo('.route-word',{y:160},{y:0,duration:1.2,stagger:.12,ease:'power1.inOut',immediateRender:false},14.7)
 .set('.repetition-reading',{autoAlpha:1},15.8)
 .to('.repetition-reading',{y:0,duration:.7,ease:'power1.inOut'},15.8)
 .to({}, {duration:1.3},16.5)
 // The route remains unresolved. No new object or chapter replaces the room.
 .to('.repetition-reading',{y:()=>height()*1.1,duration:.8,ease:'power1.inOut'},17.8)
 .to('.route-word',{y:-100,duration:1.6,stagger:.1},17.8)
 .to('.camera',{rotationY:-12,rotationZ:-1,scale:()=>fit()*(mobile?1.18:.82),x:()=>width()*(mobile?-.12:0),y:()=>height()*(mobile?.08:-.10),duration:1.8,ease:'power1.inOut'},17.8)
 .set('.ending-phrase',{autoAlpha:1},18.6)
 .to('.ending-phrase',{y:0,duration:1,ease:'power1.inOut'},18.6)
 .to({}, {duration:1.8},19.6);
 window.appendWallPassage(tl,{mobile,width,height,fit});
 return()=>{document.body.classList.remove('animated');scene.removeAttribute('data-progress');};
});
document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
