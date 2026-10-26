/* Extend the shared scroll timeline only after the approved research endpoint. */
(()=>{
 const approvedResearch=window.appendParkingDirection;
 window.appendParkingDirection=(tl,options)=>{
  approvedResearch(tl,options);
  const {mobile,width,height}=options,g=window.gsap;
  g.set('.night-finale',{autoAlpha:0});
  g.set('.night-premise,.night-delay,.night-question',{visibility:'hidden'});
  g.set('.night-rig',{scale:mobile?1.55:1.8,xPercent:mobile?-10:-20});
  g.set('.night-ground',{scale:1});
  g.set('.night-premise',{y:()=>height()});
  g.set('.night-delay',{y:()=>height()});
  g.set('.night-question',{y:()=>height()});
  tl.addLabel('night-exit',83)
   .to('.between-reading',{y:()=>-height(),duration:2.8,ease:'power2.inOut'},83)
   // One image changes its visible extent; no replacement is exposed during expansion.
   .to('.bench-strip',{height:'100%',duration:2.8,ease:'power2.inOut'},83)
   // The three bounded parts exactly reproduce the expanded image at the handoff.
   .set('.night-finale',{autoAlpha:1},85.8)
   .set('.bench-strip',{visibility:'hidden'},85.8)
   .to('.casing-left',{xPercent:-115,rotationY:-42,z:150,duration:3.7,ease:'power2.inOut'},86.3)
   .to('.casing-right',{xPercent:115,rotationY:42,z:150,duration:3.7,ease:'power2.inOut'},86.5)
   .to('.casing-roof',{yPercent:-120,rotationX:45,z:200,duration:3.4,ease:'power2.inOut'},85.8)
   .to('.night-rig',{xPercent:mobile?0:-3,scale:mobile?1.15:1.28,duration:7.2,ease:'power1.inOut'},87)
   .to('.night-ground',{scale:1.8,duration:7.2,ease:'none'},87)
   .set('.night-casing',{visibility:'hidden'},90.6)
   .addLabel('night-movement',90)
   .to('.night-shore',{opacity:.7,duration:2},90)
   .set('.night-premise',{visibility:'visible'},90.6)
   .to('.night-premise',{y:0,duration:2.4,ease:'power2.inOut'},90.6)
   .to('.premise-between',{rotation:-12,rotationX:50,skewX:-4,x:()=>width()*.05,duration:4,ease:'power1.inOut'},92)
   .to({}, {duration:2},94)
   .addLabel('night-distance',96)
   .to('.night-premise',{y:()=>-height(),duration:2.4,ease:'power2.inOut'},96)
   .to('.night-rig',{scale:mobile?1.2:1.38,xPercent:mobile?-2:-5,duration:7,ease:'power1.out'},96)
   .to('.night-ground',{scale:2.15,duration:7,ease:'power1.out'},96)
   .to('.night-mist',{opacity:.88,scale:1.38,xPercent:mobile?-5:6,duration:6,ease:'power1.inOut'},96)
   .set('.night-delay',{visibility:'visible'},97)
   .to('.night-delay',{y:0,duration:2.4,ease:'power2.inOut'},97)
   .to('.delay-word',{xPercent:mobile?-2:8,scaleX:1.12,duration:4.5,ease:'power1.out'},99)
   .to({}, {duration:1.5},102.5)
   .addLabel('night-present',104)
   .to('.night-delay',{y:()=>-height(),duration:2.5,ease:'power2.inOut'},104)
   .to('.night-viewport',{clipPath:'polygon(0% 100%,100% 100%,100% 100%,0% 100%)',duration:3.2,ease:'power2.inOut'},104)
   .to('.night-rig',{yPercent:35,duration:3.2,ease:'power2.inOut'},104)
   .set('.night-question',{visibility:'visible'},105)
   .to('.night-question',{y:0,duration:2.8,ease:'power2.inOut'},105)
   // The last displacement decelerates to rest; ordinary scrolling then reaches the credits.
   .to('.night-rig',{scale:mobile?1.215:1.395,xPercent:mobile?-2.4:-5.4,duration:6,ease:'power3.out'},104)
   .to('.night-ground',{scale:2.19,duration:6,ease:'power3.out'},104)
   .to({}, {duration:3},110);
 };
})();
