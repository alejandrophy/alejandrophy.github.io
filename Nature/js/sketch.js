function setup() {
 // canvas=createCanvas(640, 480);

}

function draw() {
  if(canvasCreated){
  if (mouseIsPressed) {
    remove();
  //  fill(0);
  //} else {
  //  fill(255);
  }
  //ellipse(mouseX, mouseY, 80, 80);
  strokeWeight(15); 
  
  translate(width/2,height-20); 
  branch(0);
  }
}
var a=1;
var b=1;
function branch(depth){ 
  if (depth > 9){
  var c = color(0, 4, 66); // Define color 'c'
  fill(c);
  noStroke();
  rect(0,0, 10, 100);
  rect(5,5, -10*(Math.random()-0.5), -100*(Math.random()-0.5));
  strokeWeight(20); 
  stroke(0);
}

  if (depth < 10) { 
       
    line(0,0,0,-height/10); // draw a line going up
    { 
      translate(0,-height/10); // move the space upwards
      rotate(random(-0.05,0.05));  // random wiggle

      if (random(1.0) < 0.6){ // branching   
        rotate(0.3); // rotate to the right
        scale(0.8); // scale down
        
        push(); // now save the transform state
        branch(depth + 1); // start a new branch!        
        pop(); // go back to saved state
       
        rotate(-0.6); // rotate back to the left 
        
        push(); // save state
        branch(depth + 1);   // start a second new branch 
        pop(); // back to saved state  
    
     } 
      else { // no branch - continue at the same depth  
        branch(depth);
        
      } 
    } 
  }
} 
var canvasCreated=0;
function mousePressed(){
	
//canvas.position(mouseX,0);


} 

function PosButton(e) {
  e = e || window.event;

  var pageX = e.pageX;
  var pageY = e.pageY;

  if(canvasCreated){
    canvas.position(pageX,pageY);
    
    redraw()
  }
  else{
    canvas=createCanvas(600, 600);
    canvas.position(pageX,pageY);
     canvasCreated=1;
      noLoop(); 
  }

  // IE 8
  if (pageX === undefined) {
      pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  
  console.log(pageX, pageY);
}

// attach handler to the click event of the document
if (document.attachEvent) document.attachEvent('onclick', handler);
else document.addEventListener('click', handler);

