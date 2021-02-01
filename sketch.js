var PLAY = 1;
var END = 0;
var gameState = 1;


var path,boy,cash,diamonds,jwellery,sword;
var pathImg, boyImg,cashImg,diamondsImg,jwelleryImg, swordImg;
var treasureCollection = 0;
var lives = 5;
var cashG,diamondsG,jwelleryG,swordGroup;
var obstaclesGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
obstaclesGroup =new Group();  

}

function draw() {

  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30)
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  boy.setCollider("rectangle",0,0,300,300);
  //boy.debug = true
  
  
  
  if(gameState===PLAY){
  boy.x = World.mouseX;
     textSize(20);
     fill(255);
     text("Lives: "+ lives,100,30);

  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;}
    
    //path.velocityY = (6 + 3*treasureCollection/100);
    
    
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    obstacles();
    
  
  if (cashG.isTouching(boy)) { 
    cashG.destroyEach(); 
    treasureCollection=treasureCollection+300; 
    
  } else if (diamondsG.isTouching(boy)) { 
    diamondsG.destroyEach();                                treasureCollection=treasureCollection+100; 
  
  }else if(jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach(); treasureCollection= treasureCollection + 200;
   
  }else if(swordGroup.isTouching(boy)) { 
    lives = lives-1;
    swordGroup.destroyEach();
  }
  
  else if(obstaclesGroup.isTouching(boy)) { 
    lives = lives-1;
    obstaclesGroup.destroyEach();
  }
  
  
  if(lives===0){
   gameState = END; 
  }
    
   if(gameState===END) {
      
    boy.addAnimation("SahilRunning",endImg);
    boy.x = 200;
    boy.y = 200; 
     boy.scale = 1;
    path.velocityY = 0;
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0); 
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1); 
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    cashG.destroyEach();
    diamondsG.destroyEach(); 
    jwelleryG.destroyEach();
    swordGroup.destroyEach(); 
     
  }

 //if (treasureCollection>1000){
    
  
  // boy.x = 200;
    //boy.y = 200; 
     //boy.scale=0.08;
    //path.velocityY = 0;
    //cashG.setVelocityYEach(0);
    //diamondsG.setVelocityYEach(0); 
    //jwelleryG.setVelocityYEach(0);
    //swordGroup.setVelocityYEach(0);
    //cashG.setLifetimeEach(-1);
    //diamondsG.setLifetimeEach(-1); 
    //jwelleryG.setLifetimeEach(-1);
    //swordGroup.setLifetimeEach(-1);
    // cashG.destroyEach();
    //diamondsG.destroyEach(); 
    //jwelleryG.destroyEach();
    //swordGroup.destroyEach(); 
  //}
 
    
    
    

    

  
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}



function obstacles(){
 if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(50, 350)),40,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = (6 + 3*treasureCollection/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break; 
              default: break;
    }
     obstacle.scale = 0.1;
     obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}