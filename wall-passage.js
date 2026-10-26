/* Extension of the same reversible timeline. No wheel handler or extra render loop. */
window.appendWallPassage=(tl,{mobile,width,height,fit})=>{
 const gs=window.gsap;
 const contact=mobile?26.45:27;
 const camera=document.querySelector('.camera');
 const level=document.querySelector('.level');
 const wall=document.querySelector('.exit-wall');
 const tape=document.querySelector('.tape-outline');
 const perspective=document.querySelector('.perspective');
 const setX=gs.quickSetter(camera,'x','px'),setY=gs.quickSetter(camera,'y','px');
 let aim;
 const origin=element=>getComputedStyle(element).transformOrigin.split(' ').map(parseFloat);
 const throughBox=(element,matrix,point)=>{
  const o=origin(element);
  const transformed=new DOMPoint(point.x-o[0],point.y-o[1],point.z-(o[2]||0)).matrixTransform(matrix);
  return new DOMPoint(transformed.x+o[0]+element.offsetLeft,transformed.y+o[1]+element.offsetTop,transformed.z+(o[2]||0));
 };
 // Read layout only while function-based tween endpoints initialise/reinitialise.
 // Discovery ends with wall x/rotationY and level y at zero; their other transforms persist.
 // GSAP's uniform `scale` scales X/Y, not Z: retain the real CSS Z coordinates.
 const measureAim=()=>{
  let point=new DOMPoint(tape.offsetWidth/2,tape.offsetHeight/2,0);
  point=throughBox(tape,new DOMMatrix(getComputedStyle(tape).transform),point);
  point=throughBox(wall,new DOMMatrix().translate(0,0,+gs.getProperty(wall,'z')),point);
  point=throughBox(level,new DOMMatrix().translate(+gs.getProperty(level,'x'),0,+gs.getProperty(level,'z')).scale(+gs.getProperty(level,'scaleX'),+gs.getProperty(level,'scaleY'),1),point);
  const o=origin(camera),eye=getComputedStyle(perspective).perspectiveOrigin.split(' ').map(parseFloat);
  aim={dx:point.x-o[0],dy:point.y-o[1],dz:point.z-(o[2]||0),scale:fit()*(mobile?2.1:1.02),eyeX:eye[0]-camera.offsetLeft-o[0],eyeY:eye[1]-camera.offsetTop-o[1]};
  return aim;
 };
 const position=(yaw=0)=>{
  const radians=yaw*Math.PI/180;
  return {x:aim.eyeX-Math.cos(radians)*aim.scale*aim.dx-Math.sin(radians)*aim.dz,y:aim.eyeY-aim.scale*aim.dy};
 };
 const aimedX=()=>{measureAim();return position().x;};
 const aimedY=()=>{measureAim();return position().y;};
 const followYaw=()=>{
  if(tl.time()<26.6||tl.time()>28.3||!aim)return;
  const p=position(+gs.getProperty(camera,'rotationY'));
  // Cached numbers only: no layout reads, scroll listeners or extra animation loop.
  setX(p.x);setY(p.y);
 };
 gs.set('.parking-view',{scale:1.035,xPercent:3});
 gs.set('.exit-wall',{x:950,rotationY:-20});
 // A lateral reorientation discovers a solid continuation of the existing room.
 tl.addLabel('wall-discovery',21.4)
 .set('.exit-wall',{visibility:'visible'},21.4)
 .to('.exit-wall',{x:0,rotationY:0,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.ending-phrase',{y:()=>height()*1.1,duration:.85,ease:'power1.inOut'},21.4)
 .to('.camera',{rotationX:0,rotationY:0,rotationZ:0,scale:()=>fit()*(mobile?2.1:1.02),x:aimedX,y:aimedY,z:0,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.level',{y:0,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.echo-one',{x:-1250,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.echo-two',{x:-1000,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.echo-three',{x:-900,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.echo-four',{x:-800,duration:2.2,ease:'power1.inOut'},21.4)
 .to('.level-return',{x:1200,duration:2.2,ease:'power1.inOut'},21.4)
 .to({}, {duration:.6},23.6)
 // The front has no opening. It crosses the eye plane; its material never dissolves.
 .addLabel('wall-approach',24.2)
 .to('.camera',{z:1920,x:aimedX,y:aimedY,duration:2.4,ease:'power1.in'},24.2)
 .set('.real-space',{visibility:'visible'},26.4)
 .set('.perspective',{clipPath:'none'},26.4)
 .set('.level > :not(.exit-wall)',{visibility:'hidden'},26.4)
 .to('.camera',{z:2650,rotationY:1.5,duration:1.7,ease:'none',onUpdate:followYaw},26.6)
 // A finite near-plane clips an oblique wall as the eye enters its thickness.
 // This is one moving occlusion boundary, never an opening in the taped rectangle.
 .fromTo('.perspective',{clipPath:'polygon(-20% 0%,100% 0%,100% 100%,-10% 100%)'},{clipPath:'polygon(110% 0%,100% 0%,100% 100%,120% 100%)',duration:.35,ease:'none',immediateRender:false},contact)
 .set('.wall-cut-edge',{visibility:'visible'},contact)
 .fromTo('.wall-cut-edge',{x:()=>-width()*.2,skewX:()=>Math.atan(width()*.1/height())*180/Math.PI},{x:()=>width()*1.1,duration:.35,ease:'none',immediateRender:false},contact)
 .set('.wall-cut-edge',{visibility:'hidden'},contact+.35)
 .set('.perspective',{visibility:'hidden'},28.3)
 .addLabel('parking-arrival',28.3)
 // Keep the approved arrival drift; new choreography begins after the wall passage.
 .to('.parking-view',{scale:1.1,xPercent:-2,duration:4.7,ease:'power1.out'},26.8);
 window.appendParkingDirection(tl,{mobile,width,height});
};
