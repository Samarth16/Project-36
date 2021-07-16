var dog,sadDog,happyDog;
var foodObject;
var food5,foodStock;
var feedTime,lastFeed,feed,addFeed;
var database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObject = new Food()

  feedStock = database.ref('Food')
  feedStock.on("value",readStock);

  feed = createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(900,95)
  addFood.mousePressed(addFoods)



}

function draw() {
  background(46,139,87);

  foodObject.display();

  feedTime = database.ref('FeedTime')
  feedTime.on("value", function(data){
     lastFeed = data.val();
  }
 )

  fill(255,255,254)
  textSize(15)
  if(lastFeed>=12){
    text("Last Feed : " + lastFeed %12 + "PM" , 350 , 30)
  }
  else if(lastFeed === 0 ){
    text("last Fed : 12 AM",350,30)
  }
  else{
    text("last fed :", lastFeed + "am" ,350,30)
  }



  drawSprites();
}

//function to read food Stock
function readStock(data){
  food5 = data.val();
  foodObject.updateFoodStock(food5) 
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  dataBase.ref('/').update({
    Food : foodObject.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  food5++;
  database.ref('/').update({
    Food : food5
  })
}
