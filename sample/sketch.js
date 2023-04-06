let ImgSource;
let NewImg;

let ValueRaise
let bouncingVariable = 0;
let speed = 1

function preload(){
  ImgSource = loadImage("12_10_10_Gagosian_Turrell-26-small.jpeg");
  


// ImgSource = loadImage("12_10_10_Gagosian_Turrell-9-small.jpeg");
}

function setup() {
createCanvas(windowWidth, windowHeight);
ImgSource.resize(windowWidth, 0);
 
}

function draw() {
  
  
  ImgSource.loadPixels();
  
  NewImg = createImage(ImgSource.width,ImgSource.height);
  NewImg.loadPixels();
  
  if (ValueRaise){ bouncingVariable+=speed;} 
  else{bouncingVariable-=speed;}
  
  
  if ( bouncingVariable > 255 || bouncingVariable<0){
  ValueRaise=!ValueRaise}
         
    for(let y = 0; y<ImgSource.height;y++){
     for(let x = 0; x<ImgSource.width;x++){
       
         let i = (y*ImgSource.width+x)*4;
       // 1. load every pixel's RGBA from source to createPixel
       NewImg.pixels[i+0] = ImgSource.pixels[i+0];
       NewImg.pixels[i+1] = ImgSource.pixels[i+1];
       NewImg.pixels[i+2] = ImgSource.pixels[i+2];
       NewImg.pixels[i+3] = ImgSource.pixels[i+3];
      
       // background(NewImg.pixels[0],NewImg.pixels[1],NewImg.pixels[2]);
       
       //R  
       NewImg.pixels[i+0] =  NewImg.pixels[i] - bouncingVariable 
       //G 
       NewImg.pixels[i+1] =  NewImg.pixels[i+1] + bouncingVariable
       //B
       NewImg.pixels[i+2] =  NewImg.pixels[i+2] + bouncingVariable 
       //A
       // NewImg.pixels[i+3] =  NewImg.pixels[i+3] - bouncingVariable
       
       }
        
       }
     
       
      
  NewImg.updatePixels();
 imageMode(CENTER)
 image(NewImg,windowWidth/2,windowHeight/2);
 // NewImg.resize(windowWidth, windowHeight)
    // console.log( bouncingVariable )
       
     
  }
  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ImgSource.resize(windowWidth, 0);
}
