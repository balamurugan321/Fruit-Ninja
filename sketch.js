//Game States
var PLAY=1;
var END=0;
var gameState=1;
var frequence

var fruitblock
var knife;
var cutfruit;
var newfont
var knifeImage ;
var backgroundimg;
var scorefruit
var orangeimg,appleimg,pearimg,bananaimg,bomb1img,bomb2img;
var og,ag,pg,bg,bo1g,bo2g;
var replay,replayimg;
var bo1s,bo2s,os,as,ps,bs,starts;

function preload(){
  newfont = loadFont("gang of three.ttf");
  knifeImage = loadImage("knife.png");
  backgroundimg = loadImage("background.png");
  scorefruit = loadImage("cut fruit.png");
  orangeimg = loadImage("fruit1.png");
  appleimg = loadImage("fruit2.png");
  pearimg = loadImage("fruit3.png");
  bananaimg = loadImage("fruit4.png");
  bomb1img = loadImage("bomb1.png");
  bomb2img = loadImage("bomb2.png");
  replayimg = loadImage("replay.png");
  bo1s = loadSound("bomb1.mp3");
  bo2s = loadSound("bomb2.mp3");
  os = loadSound("orange.mp3");
  as = loadSound("apple.mp3");
  ps = loadSound("pear.mp3");
  bs = loadSound("banana.mp3");
  starts = loadSound("start.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  wall=createSprite(displayWidth/2,displayHeight/2);
   wall.addImage(backgroundimg);
   wall.scale = 3.78;
  wall.depth = -10
  
  cutfruit = createSprite(35,20);
  cutfruit.addImage(scorefruit);
  cutfruit.scale = 0.3;
  cutfruit.depth = 10;
  cutfruit.setCollider("rectangle",150,20,500,180);
  
  fruitblock = createSprite(width/2,10,width,5);
  fruitblock.visible = false;
  
  
  replay = createSprite(width/2,height/2 + 50);
  replay.addImage(replayimg);
  replay.scale = 0.2;
  replay.setCollider("circle",0,0,190)
  replay.visible = false;
  
  //creating sword
   knife=createSprite(width/2,height/2);
   knife.addImage(knifeImage);
   knife.scale=0.7
  //knife.debug = true
  knife.depth = 2;
  
  //set collider for sword
  knife.setCollider("rectangle",5,-30,30,95,35);
  
  score=0;
  //create fruit and monster Group variable here
  og = new Group();
  ag = new Group();
  pg = new Group();
  bg = new Group();
  bo1g = new Group();
  bo2g = new Group();
  starts.play();
}

function draw() {
  background("white");
  console.log(width);
  console.log(height);
  selectfruit = Math.round(random(1,6));
  
  console.log("Fruit no",selectfruit);
  console.log("MouseX,MouseY",mouseX,mouseY);
  
  // Move knife with mouse
    knife.y=World.mouseY-15;
    knife.x=World.mouseX+10;
  
  if(gameState===PLAY){
    replay.visible = false;
    knife.visible = true;
    if(15 - score > 0){
    frequence = World.frameCount % (15 - score);
    }
    else
    {
      frequence = 0
    }
    //calling fruit and monster function
   if (frequence == 0){
   if (selectfruit == 1) {
   bomb1();
   }
   if (selectfruit == 2) {
   bomb2();
   }
   if (selectfruit == 3) {
   orange();
   } 
   if (selectfruit == 4) {
   apple();
   }
   if (selectfruit == 5) {
   pear();
   }
   if (selectfruit == 6) {
   banana();
   }
  }
    
    bo1g.bounceOff(fruitblock)
    bo2g.bounceOff(fruitblock)
    og.bounceOff(fruitblock)
    ag.bounceOff(fruitblock)
    pg.bounceOff(fruitblock)
    bg.bounceOff(fruitblock)
    // Increase score if knife touching fruit
   if(knife.isTouching(bo1g)){
     bo1s.play();
     bo1g.destroyEach();
     gameState = END;
   }
    if(knife.isTouching(bo2g)){
      bo2s.play();
     bo2g.destroyEach();
      gameState = END;
   }
    if(knife.isTouching(og)){
      os.play();
     og.destroyEach();
      score = score+1;
   }
    if(knife.isTouching(ag)){
      as.play();
     ag.destroyEach();
      score = score+1;
   }
    if(knife.isTouching(pg)){
      ps.play();
     pg.destroyEach();
      score = score+1;
   }
    if(knife.isTouching(bg)){
      bs.play();
     bg.destroyEach();
      score = score+1;
   }
  }
  if(gameState === END){
    replay.visible = true;
    knife.visible = false;
    bo1g.destroyEach();
    bo2g.destroyEach();
    og.destroyEach();
    ag.destroyEach();
    pg.destroyEach();
    bg.destroyEach();
    if(mouseIsPressed && knife.isTouching(replay)){
      starts.play();
      score = 0;
      gameState = PLAY;
    }
  }
  
  drawSprites();
  
  //Display score
  textSize(40);
  fill("#f2a007");
  textFont(newfont)
  stroke(5);
  depth = -5
  text(score,60,40);
  if(gameState===END){
  fill("#c12424");
  textSize(70)
  textFont(newfont)
  stroke(50);
  depth = -5
  text("GAME OVER",width/2 - 160,height/2 - 20);
  }
}
function bomb1(){
  var bomb1 = createSprite(Math.round(random((width-width)+10,width-10)),height);
  var selectvelocity = Math.round(random(1,2));
  bomb1.velocityY = -20-score
  if( selectvelocity == 1){
    bomb1.velocityX = 5;
  }
  if( selectvelocity == 2){
    bomb1.velocityX = -5;
  }
  if(bomb1.x < (width/2)){
    bomb1.velocityX = 5
  }
  if(bomb1.x > (width/2)){
    bomb1.velocityX = -5
  }
  bomb1.addImage(bomb1img);
  bomb1.lifetime = 500;
  bomb1.depth = 1;
  bomb1.scale = 1.2
  if(knife.isTouching(bomb1)){
    bomb1.destroy();
  }
  bo1g.add(bomb1);
}
function bomb2(){
  var bomb2 = createSprite(Math. round(random((width-width)+10,width-10)),height);
  bomb2.addImage(bomb2img);
  var selectvelocity1 = Math.round(random(1,2));
  bomb2.velocityY = -20-score
  if( selectvelocity1 == 1){
    bomb2.velocityX = 5;
  }
  if( selectvelocity1 == 2){
    bomb2.velocityX = -5;
  }
  if(bomb2.x < (width/2)){
    bomb2.velocityX = 5
  }
  if(bomb2.x > (width/2)){
    bomb2.velocityX = -5
  }
  bomb2.lifetime = 500;
  bomb2.depth = 1;
  bomb2.scale = 1.2
  if(knife.isTouching(bomb2)){
    bomb2.destroy();
    
  }
  bo2g.add(bomb2);
}
function orange(){
  var orange = createSprite(Math. round(random((width-width)+10,width-10)),height, 10,10);
  orange.addImage(orangeimg);
  var selectvelocity2 = Math.round(random(1,2));
  orange.velocityY = -20-score;
  if( selectvelocity2 == 1){
    orange.velocityX = 5;
  }
  if( selectvelocity2 == 2){
    orange.velocityX = -5;
  }
  if(orange.x < (width/2)){
    orange.velocityX = 5
  }
  if(orange.x > (width/2)){
    orange.velocityX = -5
  }
  orange.lifetime = 200;
  orange.depth = 1;
  orange.scale = 0.3
  og.add(orange);
}
function apple(){
  var apple = createSprite(Math. round(random((width-width)+10,width-10)),height, 10,10);
  apple.addImage(appleimg);
  apple.velocityY = -20-score;
  var selectvelocity3 = Math.round(random(1,2));
  if( selectvelocity3 == 1){
    apple.velocityX = 5;
  }
  if( selectvelocity3 == 2){
    apple.velocityX = -5;
  }
  if(apple.x < (width/2)){
    apple.velocityX = 5
  }
  if(apple.x > (width/2)){
    apple.velocityX = -5
  }
  apple.lifetime = 200;
  apple.scale = 0.3;
  apple.depth = 1;
  ag.add(apple);
}
function pear(){
  var pear = createSprite(Math. round(random((width-width)+10,width-10)),height, 10,10);
  pear.addImage(pearimg);
  pear.velocityY = -20-score;
  var selectvelocity4 = Math.round(random(1,2));
  if( selectvelocity4 == 1){
    pear.velocityX = 5;
  }
  if( selectvelocity4 == 2){
    pear.velocityX = -5;
  }
  if(pear.x < (width/2)){
    pear.velocityX = 5
  }
  if(pear.x > (width/2)){
    pear.velocityX = -5
  }
  pear.lifetime = 200;
  pear.depth = 1;
  pear.scale = 0.3
  pg.add(pear);
}
function banana(){
  var banana = createSprite(Math. round(random((width-width)+10,width-10)),height, 10,10);
  banana.addImage(bananaimg);
  banana.velocityY = -20-score;
  var selectvelocity5 = Math.round(random(1,2));
  if( selectvelocity5 == 1){
    banana.velocityX = 5;
  }
  if( selectvelocity5 == 2){
    banana.velocityX = -5;
  }
  if(banana.x < (width/2)){
    banana.velocityX = 5
  }
  if(banana.x > (width/2)){
    banana.velocityX = -5
  }
  banana.lifetime = 200;
  banana.depth = 1;
  banana.scale = 0.25;
  bg.add(banana);
}
