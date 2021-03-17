var monkey , monkey_running, jungle,jungleImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, ground, wall1, wall2;
var score=0;
var survivalTime=0;
var gameState=1;
var END=0;
var PLAY=1;
var jumpCount=0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  jungleImage=loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,600);
  jungle=createSprite(300,200,1200,10);
  jungle.velocityX=-5;
  jungle.addImage(jungleImage);
  jungle.scale=1.2;
  monkey=createSprite(100,250,20,20);
  monkey.addAnimation("d",monkey_running);
  monkey.scale=0.20;
  ground=createSprite(300,390,1200,10);
  //ground.velocityX=-5;
  ground.visible=false;
  wall1=createSprite(0,200,40,400);
  wall1.visible=false;
  wall2=createSprite(200,0,400,40);
  wall2.visible=false;
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  gameState=PLAY;
}


function draw() {
  background("green");
  drawSprites();
  if (gameState===PLAY){
  monkey.velocityY=monkey.velocityY+0.3;
  spawnBananas();
  spawnObstacle();
  if (monkey.isTouching(ground)) {
    jumpCount=0;
  }
  if(keyDown("space")&&jumpCount<=3){
  monkey.velocityY=-8;
  jumpCount=jumpCount+1;
  }
  }
  if(gameState===END){
    stroke("black");
  textSize(20);
  fill("black");
    text("You Died",280,200)
  foodGroup.setVelocityEach=0;
  obstacleGroup.setVelocityEach=0;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  jungle.velocityX=0;
  }
  monkey.collide(ground);
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  if(monkey.isTouching(obstacleGroup)){
    monkey.scale=monkey.scale/2;
  }
  if(monkey.isTouching(foodGroup)){
    monkey.scale=monkey.scale+0.2;
    foodGroup.destroyEach();
  }
  if(monkey.scale<0.1){
    monkey.destroy();
    gameState=END;
  }
  monkey.collide(wall1);
  createEdgeSprites();
}

function spawnBananas(){
  if(frameCount%130===0){
  banana=createSprite(610,300,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.y=random(10,250);
  banana.velocityX=-5;
  foodGroup.add(banana);
  }
}
function spawnObstacle(){
  if(frameCount%180===0){
    obstacle=createSprite(610,360,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-5;
    obstacle.setCollider("circle",0,0,1)
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(200);
  }
}