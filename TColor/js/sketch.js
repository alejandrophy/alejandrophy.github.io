function setup() {
 // canvas=createCanvas(640, 480);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
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
  }
  else{
    canvas=createCanvas(640, 480);
    canvas.position(pageX,pageY);
     canvasCreated=1;
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