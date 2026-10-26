/* Native scroll, one shared timeline, photographic silhouettes rather than planar cards. */
window.appendParkingDirection=(tl,{mobile,width,height})=>{
 const gs=window.gsap;
 const rigWidth=()=>Math.max(width(),height()*16/9);
 gs.set('.garage-floor-word',{yPercent:90});
 gs.set('.garage-way-out',{yPercent:110,scale:.6});
 gs.set('.garage-editorial h1',{yPercent:75});
 gs.set('.garage-reading,.garage-points',{yPercent:80});
 gs.set('.garage-detail',{yPercent:-110});
 gs.set('.garage-reflection',{y:()=>height()*.9});
 tl.addLabel('parking-depth',28.3)
 .to('.garage-rig',{scale:mobile?1.12:1.24,xPercent:mobile?-20:-3,rotation:mobile?-.4:-.8,duration:3.5,ease:'power1.inOut'},28.3)
 .to('.garage-near-left',{x:()=>rigWidth()*(mobile?-.05:-.1),y:()=>height()*.06,scale:1.19,duration:3.5,ease:'power1.inOut'},28.3)
 .to('.garage-near-right',{x:()=>rigWidth()*(mobile?.08:.1),y:()=>height()*.06,scale:1.19,duration:3.5,ease:'power1.inOut'},28.3)
 .to('.garage-mid-left',{x:()=>rigWidth()*-.022,y:()=>height()*.018,scale:1.055,duration:3.5},28.3)
 .to('.garage-mid-right',{x:()=>rigWidth()*.022,y:()=>height()*.018,scale:1.055,duration:3.5},28.3)
 .set('.garage-floor-word',{visibility:'visible'},29.4)
 .to('.garage-floor-word',{yPercent:0,duration:1.8,ease:'power1.out'},29.4)
 .to({}, {duration:.7},31.2)
 .addLabel('parking-traverse',31.9)
 .to('.garage-rig',{xPercent:mobile?-43:-12,scale:mobile?1.18:1.30,rotation:mobile?.5:1,duration:3.4,ease:'power1.inOut'},31.9)
 .to('.garage-near-right',{x:()=>rigWidth()*(mobile?-.32:-.24),y:()=>height()*(mobile?.14:.23),scale:mobile?1.25:1.55,duration:3.4,ease:'power1.inOut'},31.9)
 .to('.garage-mid-right',{x:()=>rigWidth()*-.05,y:()=>height()*.045,scale:1.14,duration:3.4,ease:'power1.inOut'},31.9)
 .to('.garage-floor-word',{yPercent:200,duration:1.5,ease:'power1.in'},31.9)
 .set('.garage-way-out',{visibility:'visible'},32.2)
 .to('.garage-way-out',{yPercent:0,scale:1,duration:1.8,ease:'power1.out'},32.2)
 .set('.garage-action-reading',{visibility:'visible'},33.4)
 .fromTo('.garage-action-reading',{y:()=>height()*.5},{y:0,duration:1,ease:'power1.out',immediateRender:false},33.4)
 .to({}, {duration:.8},34.4)
 .addLabel('parking-editorial',35.3)
 .set('.garage-editorial',{visibility:'visible'},35.3)
 .set('.real-space',{backgroundColor:'#dde0d2'},35.3)
 .to('.garage-action-reading',{y:()=>height()*.5,duration:1,ease:'power1.inOut'},35.3)
 .to('.garage-way-out',{yPercent:-350,duration:1.8,ease:'power1.inOut'},35.3)
 .to('.garage-rig',{xPercent:mobile?-28:0,scale:1,rotation:0,duration:3,ease:'power1.inOut'},35.3)
 .fromTo('.parking-view',{scale:1.1,xPercent:-2,clipPath:'polygon(0% 0%,100% 0%,100% 100%,0% 100%)'},{scale:1,xPercent:0,clipPath:mobile?'polygon(0% 33%,100% 26%,100% 52%,0% 61%)':'polygon(0% 34%,100% 22%,100% 58%,0% 70%)',duration:3,ease:'power1.inOut',immediateRender:false},35.3)
 .to('.garage-editorial h1',{yPercent:0,duration:2.4,ease:'power1.inOut'},35.7)
 .to('.garage-reading,.garage-points',{yPercent:0,duration:2,ease:'power1.out'},36.6)
 .set('.garage-detail',{visibility:'visible'},36.6)
 .to('.garage-detail',{yPercent:0,duration:1.8,ease:'power1.inOut'},36.6)
 .to({}, {duration:1.6},38.6)
 .addLabel('parking-periphery',40.2)
 .to('.garage-editorial h1',{yPercent:mobile?-300:-140,duration:2,ease:'power1.inOut'},40.2)
 .to('.garage-reading,.garage-points',{y:()=>height()*.5,duration:1.8,ease:'power1.inOut'},40.2)
 .to('.garage-detail',{yPercent:-130,duration:1.8,ease:'power1.inOut'},40.2)
 .to('.parking-view',{clipPath:mobile?'polygon(82% 0%,100% 0%,100% 100%,90% 100%)':'polygon(78% 0%,100% 0%,100% 100%,87% 100%)',duration:2.6,ease:'power1.inOut'},40.2)
 .set('.garage-reflection',{visibility:'visible'},41.7)
 .to('.garage-reflection',{y:0,duration:1.3,ease:'power1.inOut'},41.7)
 .to('.garage-rig',{xPercent:mobile?-32:-3,duration:4,ease:'none'},40.2)
 .to({}, {duration:1.5},44.2);
};
