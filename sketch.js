//Create variables here
var dog, happyDog, database, foodS, foodStock;
var normalDog;

function preload(){
  //load images here
  normalDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 280, 20, 20)
  dog.addImage(normalDog);
  dog.scale = 0.3;

  database = firebase.database();

  foodStock = database.ref("Food").on("value", readStock)
  
}


function draw() {  
  background(46, 139, 87)

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }
  drawSprites();
  //add styles here

  fill("white")
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 120, 50)
  text("Food remaining: "+foodS, 190,150)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }else{
    x -= 1;
  }
  
  database.ref('/').update({
    Food:x
  })
}


