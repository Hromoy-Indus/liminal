/* Append only. The approved sequence keeps its original geometry and timing. */
(()=>{
 const approvedParking=window.appendParkingDirection;
 window.appendParkingDirection=(tl,options)=>{
  approvedParking(tl,options);
  const {mobile,height}=options,g=window.gsap;
  const leaves=g.utils.toArray('.route-leaf');
  g.set('.real-research',{visibility:'hidden'});
  g.set('.research-ground',{xPercent:100});
  g.set('.route-fold',{xPercent:100});
  g.set(leaves,{rotationY:i=>[65,-55,55,180][i]});
  g.set('.route-verb,.route-reading',{y:()=>height()});
  g.set('.image-question,.human-threshold,.waiting-photo,.wait-letters,.waiting-reading,.role-reading,.bench-strip,.between-reading',{visibility:'hidden'});
  g.set('.image-question',{y:()=>height()});
  g.set('.human-threshold',{y:()=>height()});
  g.set('.waiting-photo',{yPercent:110});
  g.set('.wait-letters span',{yPercent:170});
  g.set('.waiting-reading,.role-reading,.between-reading',{y:()=>height()});
  // Match the first viewport intersection of the title (top:16%) without changing its tween.
  g.set('.bench-strip',{y:()=>height()*(mobile?.23:.25)/.84});
  tl.addLabel('real-route',45.7)
   .set('.real-research',{visibility:'visible'},45.7)
   .to('.garage-reflection',{xPercent:-125,duration:2.1,ease:'power2.inOut'},45.7)
   .to('.research-ground',{xPercent:0,duration:2.2,ease:'power2.inOut'},45.7)
   .to('.route-fold',{xPercent:0,duration:2.5,ease:'power2.inOut'},45.7)
   .to(leaves,{rotationY:0,stagger:.24,duration:2.4,ease:'power2.inOut'},47)
   .to('.route-verb',{y:0,duration:1.8,ease:'power2.inOut'},47.3)
   .to('.route-reading',{y:0,duration:1.8,ease:'power2.inOut'},48.5)
   .to({}, {duration:2.2},50.3)
   .addLabel('image-expectation',52.5)
   .to('.route-verb',{y:()=>-height()*.5,duration:1.8},52.5)
   .to('.route-reading',{y:()=>height()*.6,duration:1.7},52.5)
   .to(leaves[0],{xPercent:mobile?-75:-90,rotationY:-35,duration:2.4},52.5)
   .to(leaves[1],{xPercent:-150,rotationY:55,duration:2.4},52.5)
   .to(leaves[2],{xPercent:150,rotationY:-55,duration:2.4},52.5)
   .to(leaves[3],{xPercent:mobile?75:90,rotationY:35,duration:2.4},52.5)
   .set('.image-question',{visibility:'visible'},53)
   .to('.image-question',{y:0,duration:1.9,ease:'power2.inOut'},53)
   .to({}, {duration:1.8},54.9)
   .addLabel('human-threshold',56.7)
   .to('.image-question',{y:()=>-height(),duration:2,ease:'power2.inOut'},56.7)
   .to('.route-fold',{yPercent:-180,duration:2.5,ease:'power2.inOut'},56.7)
   .set('.human-threshold',{visibility:'visible'},57)
   .to('.human-threshold',{y:0,duration:2,ease:'power2.inOut'},57)
   .to({}, {duration:4},59)
   .addLabel('waiting-room',63)
   .to('.human-threshold',{y:()=>-height(),duration:2.5,ease:'power2.inOut'},63)
   .set('.waiting-photo,.wait-letters,.waiting-reading',{visibility:'visible'},63)
   .to('.waiting-photo',{yPercent:0,duration:2.5,ease:'power2.inOut'},63)
   .to('.wait-letters span',{yPercent:0,stagger:.16,duration:1.8,ease:'power2.out'},64)
   .to('.waiting-reading',{y:0,duration:1.8,ease:'power2.inOut'},64.7)
   .to({}, {duration:2.5},66.5)
   .addLabel('temporary-role',69)
   .to('.wait-letters span',{yPercent:-250,stagger:.12,duration:1.9},69)
   .to('.waiting-reading',{y:()=>height()*.7,duration:2},69)
   .to('.waiting-photo',{xPercent:mobile?80:62,duration:2.5,ease:'power2.inOut'},69)
   .set('.role-reading',{visibility:'visible'},69.8)
   .to('.role-reading',{y:0,duration:2,ease:'power2.inOut'},69.8)
   .to({}, {duration:3},72.2)
   .addLabel('between-states',75.2)
   .to('.role-reading',{y:()=>-height(),duration:2.4,ease:'power2.inOut'},75.2)
   .to('.waiting-photo',{yPercent:-110,duration:2.6,ease:'power2.inOut'},75.2)
   .set('.between-reading,.bench-strip',{visibility:'visible'},76)
   .to('.bench-strip',{y:0,duration:2.4,ease:'power2.inOut'},76)
   .to('.between-reading',{y:0,duration:2.4,ease:'power2.inOut'},76)
   .to('.between-nouns i',{yPercent:-100,duration:2,ease:'power2.inOut'},79)
   .to({}, {duration:2},81);
 };
})();
