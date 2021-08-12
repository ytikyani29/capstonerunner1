var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end;
//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("road.png");
  boyImg = loadAnimation("Runner-2.png");
  cashImg = loadImage("MONEY.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("necklace.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 20;
path.scale = 5;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.05;


cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+75;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        boy.addAnimation("SahilRunning",end);
        boy.x=width/2;
        boy.y=height-50;
        cashG.destroyEach();
        cashG.setVelocityEach(0);
        jwelleryG.destroyEach();
        jwelleryG.setVelocityEach(0);
        diamondsG.destroyEach();
        diamondsG.setVelocityEach(0);
        end = createSprite(width/2,height/2,10,10);
        end.addAnimation("SahilRunning",endImg);
        end.scale = 0.9;
  
    }
  }
  
  drawSprites();
  textSize(20);
  fill("blue");
  text("Treasure: "+ treasureCollection,width-250,100);
  }
 
}

function createCash() {
  if (World.frameCount % 10 == 0) {
  var cash = createSprite(Math.round(random(100, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 15;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 20 == 0) {
  var diamonds = createSprite(Math.round(random(100, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 15;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 20 == 0) {
  var jwellery = createSprite(Math.round(random(100, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 15;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 10 == 0) {
  var sword = createSprite(Math.round(random(100, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 20;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}