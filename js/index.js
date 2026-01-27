const StartScreenNode = document.querySelector("#game-start-screen");
const StartButtonNode = document.querySelector("#start-btn");

const ScreenNode = document.querySelector("#game-screen");
const BoxScreenNode = document.querySelector("#box-game");

const EndScreenNode = document.querySelector("#game-end-screen");
const RestartGameButtonNode = document.querySelector("#restart-btn");

//* GLOBAL GAME VARIABLES
let farmerObj = null;
let dogObj = null;
let sheepArr = [];
let sheepArrSpawn = [];
let fence1 = null;
let fence2 = null;
let fence3 = null;
let fence4 = null;
let verticalFence1 = null;
let verticalFence2 = null;
let verticalFence3 = null;
let verticalFence4 = null;
let gateOpen3 = false;
let gateOpen4 = false;
let numberGateOpenY3 = 0;
let numberGateOpenY4 = 0;
let caught = false;
StartScreenNode.style.display = "flex";
ScreenNode.style.display = "none";

//* GLOBAL GAME FUNCTIONS
function startGame() {
  StartScreenNode.style.display = "none";
  ScreenNode.style.display = "flex";
  farmerObj = new Farmer();
  console.log(farmerObj);
  dogObj = new Dog();
  console.log(dogObj);
  makeSheep();
  barnConstruction();
  setInterval(gameActions, Math.round(1000 / 60));
  setInterval(sheepSpawn, 20000);
}

function gameActions() {
  //farmerObj.moveForward()
  /*farmerObj.moveBackward()
  farmerObj.moveUp()
  farmerObj.moveDown()*/
  //dogObj.moveForward()
  /*dogObj.moveBackward()
  dogObj.moveUp()
  dogObj.moveDown()*/
  sheepArr.forEach((sheep) => {
    sheep.walk();
    /*sheep.moveBackward()
     sheep.moveDown()
     sheep.moveUp()*/
  });
  sheepArrSpawn.forEach((sheepSpawn) => {
    sheepSpawn.walk();
    /* sheepSpawn.moveBackward()
     sheepSpawn.moveDown()
     sheepSpawn.moveUp()*/
  });
  collisionFarmerSheep();
}
function makeSheep() {
  let randomPositionX = Math.floor(Math.random() * 150) + 250;
  let randomPositionY = Math.floor(Math.random() * 150) + 100;
  let gapX = 60;
  let gapY = 60;
  let sheep1 = new Sheep(randomPositionX, randomPositionY);
  sheepArr.push(sheep1);
  let sheep2 = new Sheep(randomPositionX + gapX, randomPositionY);
  sheepArr.push(sheep2);
  let sheep3 = new Sheep(randomPositionX, randomPositionY + gapY);
  sheepArr.push(sheep3);
  let sheep4 = new Sheep(randomPositionX + gapX, randomPositionY + gapY);
  sheepArr.push(sheep4);
}
function sheepSpawn() {
  let randomPositionX = Math.floor(Math.random() * 100) + 500;
  let randomPositionY = Math.floor(Math.random() * 150) + 40;
  let gapX = 100;
  let gapY = 10;
  let sheepSpawn1 = new Sheep(randomPositionX, randomPositionY);
  sheepArrSpawn.push(sheepSpawn1);
  let sheepSpawn2 = new Sheep(randomPositionX + gapX, randomPositionY + gapY);
  sheepArrSpawn.push(sheepSpawn2);
}

function barnConstruction() {
  fence1 = new Fence(700, 500);
  fence2 = new Fence(700, 310);
  fence3 = new Fence(780, 500);
  fence4 = new Fence(780, 310);
  verticalFence1 = new Fence(830, 445, "vertical");
  verticalFence2 = new Fence(830, 365, "vertical");
  verticalFence3 = new Fence(640, 445, "vertical", gateOpen3, numberGateOpenY3);
  verticalFence4 = new Fence(640, 365, "vertical", gateOpen4, numberGateOpenY4);
}

function checkOpenCloseGate3() {
  const farmerPositionX = farmerObj.x + farmerObj.width;
  const farmerPositionY = farmerObj.y + farmerObj.height;
  const fence3X = verticalFence3.x + farmerObj.width;

  const nearGateY = 310 <= farmerPositionY && farmerPositionY <= 500;
  const nearGate3X =
    farmerPositionX > fence3X - 60 && farmerPositionX < fence3X + 90;
  //Gate 3
  if (!verticalFence3.isOpen && nearGate3X && nearGateY) {
    verticalFence3.numberGateOpenY = 65;
    verticalFence3.openTheGate();
  } else if (verticalFence3.isOpen && (!nearGate3X || !nearGateY)) {
    verticalFence3.numberGateOpenY = 65;
    verticalFence3.closeTheGate();
  }
}
function checkOpenCloseGate4() {
  const farmerPositionX = farmerObj.x + farmerObj.width;
  const farmerPositionY = farmerObj.y + farmerObj.height;
  const fence4X = verticalFence4.x + farmerObj.width;

  const nearGateY = 310 <= farmerPositionY && farmerPositionY <= 500;
  const nearGate4X =
    farmerPositionX > fence4X - 60 && farmerPositionX < fence4X + 90;
  //Gate 3
  if (!verticalFence4.isOpen && nearGate4X && nearGateY) {
    verticalFence4.numberGateOpenY = -55;
    verticalFence4.openTheGate();
  } else if (verticalFence4.isOpen && (!nearGate4X || !nearGateY)) {
    verticalFence4.numberGateOpenY = -55;
    verticalFence4.closeTheGate();
  }
}

function collisionFarmerSheep() {
  if (caught) return  
  for (let i = 0; i < sheepArr.length; i++) {
    
    let isColliding = checkCollision(farmerObj, sheepArr[i]);
    if (isColliding) {
      sheepArr[i].x = farmerObj.x + 10;
      sheepArr[i].y = farmerObj.y + 10;
      sheepArr[i].speed= farmerObj.speed
      break;
    }
  }
}
function collisionFarmerBarn() {
  // birdObj
  sheepArr.forEach((eachSheepObj) => {
    // eachObstacleObj
    let isColliding = checkCollision(farmerObj, eachSheepObj);
    if (isColliding) {
      console.log("the farmer has collided with the Barn ");
      //gameOver()
    }
  });
}
function collisionSheepBarn() {
  // birdObj
  sheepArr.forEach((eachSheepObj) => {
    // eachObstacleObj
    let isColliding = checkCollision(Fence, eachSheepObj);
    if (isColliding) {
      console.log("the sheep has collided with the Barn");
      //gameOver()
    }
  });
}

function checkCollision(obj1, obj2) {
  // return true if both objects collide
  // return false if both objects don't collide
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

//* EVENT LISTENERS
StartScreenNode.addEventListener("click", startGame);
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    farmerObj.moveForward();
  } else if (event.key === "ArrowLeft") {
    farmerObj.moveBackward();
  } else if (event.key === "ArrowUp") {
    farmerObj.moveUp();
  } else if (event.key === "ArrowDown") {
    farmerObj.moveDown();
  }

  checkOpenCloseGate3();
  checkOpenCloseGate4();
  collisionFarmerSheep();
});
document.addEventListener("keydown",(event)=>{
    if(event.key===" "){
        caught=false
    }
})
/*document.addEventListener("keydown",(event)=>{
    if(event.key==="ArrowRight"){
        dogObj.moveForward() 
    }else if(event.key==="ArrowLeft"){
        dogObj.moveBackward()
    }else if(event.key==="ArrowUp"){
        dogObj.moveUp()
    }else if(event.key==="ArrowDown"){
        dogObj.moveDown()
    }
})*/

//const fence3Y= verticalFence3.y
//const nearGate3Y= farmerPositionY<=fence3Y-10 && farmerPositionY>=fence3Y-80

/*else if(verticalFence3.isOpen && !nearGate3X && !nearGateY){
       verticalFence3.numberGateOpenY=-65
       verticalFence3.closeTheGate()
    }*/
/*else if(verticalFence4.isOpen && !nearGate4X && !nearGateY){
       verticalFence4.numberGateOpenY=55
       verticalFence4.closeTheGate()
    }*/

/*
function checkGateOpen(){
    const farmerPositionX=farmerObj.x +farmerObj.width;
    const farmerPositionY=farmerObj.y +farmerObj.height;
    const fence3X=verticalFence3.x
    const fence4X=verticalFence4.x
  
    const nearGateY= 310<=farmerPositionY && farmerPositionY<=500
    const nearGate3X= farmerPositionX>= fence3X - 10 && farmerPositionX <= fence3X + 10
    const nearGate4X= farmerPositionX>= fence4X - 10 && farmerPositionX <= fence4X + 10
    //Gate 3
    if(!verticalFence3.isOpen && nearGate3X && nearGateY){
       verticalFence3.numberGateOpenY=65
       verticalFence3.openTheGate()
    }
    //Gate 4
    if(!verticalFence4.isOpen && nearGate4X && nearGateY){
       verticalFence4.numberGateOpenY=-55
       verticalFence4.openTheGate()
    }
}
function checkGateClose(){
    const farmerPositionX=farmerObj.x +farmerObj.width;
    const farmerPositionY=farmerObj.y +farmerObj.height;
    const fence3X=verticalFence3.x
    const fence4X=verticalFence4.x
  
    const nearGateY= 310<=farmerPositionY && farmerPositionY<=500
    const nearGate3X= farmerPositionX>= fence3X - 10 && farmerPositionX <= fence3X + 10
    const nearGate4X= farmerPositionX>= fence4X - 10 && farmerPositionX <= fence4X + 10
    //Gate 3
    if(verticalFence3.isOpen && (!nearGate3X || !nearGateY)){
       verticalFence3.numberGateOpenY=65
       verticalFence3.closeTheGate()
    }
    //Gate 4
    if(verticalFence4.isOpen && (!nearGate4X || !nearGateY)){
       verticalFence4.numberGateOpenY=-55
       verticalFence4.closeTheGate()
    }
}*/
/*function sheepSpawn(){
    let randomPositionX=Math.floor(Math.random()*100)+500
    let randomPositionY=Math.floor(Math.random()*100)+200
    let sheepSpawn1=new Sheep(randomPositionX, randomPositionY)
    sheepArrSpawn.push(sheepSpawn1)
    let sheepSpawn2=new Sheep(randomPositionX, randomPositionY)
    sheepArrSpawn.push(sheepSpawn2)
} */
