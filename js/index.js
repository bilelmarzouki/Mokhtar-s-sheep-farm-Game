const StartScreenNode = document.querySelector("#game-start-screen");
const StartButtonNode = document.querySelector("#start-btn");
const ScreenNode = document.querySelector("#game-screen");
const BoxScreenNode = document.querySelector("#box-game");
const EndScreenNode = document.querySelector("#game-end-screen");
const RestartGameButtonNode = document.querySelector("#restart-btn");
/*const timeRemainingContainer = document.getElementById("timeRemaining");
timeRemainingContainer.style.position = "absolute";
timeRemainingContainer.style.top = "50px";
timeRemainingContainer.style.right = "20px";*/
/*const scoreContainer = document.getElementById("score");
scoreContainer.style.position = "absolute";
scoreContainer.style.top = "50px";
scoreContainer.style.left = "40px";
scoreContainer.style.fontSize = "30px";
scoreContainer.style.fontWeight = "bold";*/
const resultContainer = document.querySelector("#result");

//* GLOBAL GAME VARIABLES
let farmerObj = null;
let dogObj = null;
let sheepArr = [];
let sheepArrSpawn = [];
let fencesObj;
let fencesArr;
let gateOpen3 = false;
let gateOpen4 = false;
let numberGateOpenY3 = 0;
let numberGateOpenY4 = 0;
let caught = false;
let caughtSheep = null;
let AllSheep = [];
const quizDuration = 120;
let timeRemaining = quizDuration;
let timeLimit = quizDuration;
let countSheepInBarn = 0;
let timer;
let sheepSpawnId;
let gameId;
let sun;
let nature;
let scoreDiv;
let timeDiv;
StartScreenNode.style.display = "flex";
ScreenNode.style.display = "none";
//* GLOBAL GAME FUNCTIONS
function startGame() {
  StartScreenNode.style.display = "none";
  ScreenNode.style.display = "flex";
  sun = document.createElement("img");
  sun.src = "./images/summerSun.png";
  sun.alt = "sun";
  sun.style.position = "absolute";
  sun.style.width = "200px";
  sun.style.height = "200px";
  sun.style.top = "0px";
  sun.style.left = "500px";
  BoxScreenNode.append(sun);

  nature = document.createElement("img");
  nature.src = "./images/nature.jpg";
  nature.alt = "nature";
  nature.style.position = "absolute";
  nature.style.width = "1000px";
  nature.style.height = "400px";
  nature.style.top = "200px";
  nature.style.left = "0px";
  BoxScreenNode.append(nature);

  timeDiv = document.createElement("div");
  timeDiv.id = "timeRemaining";
  timeDiv.style.position = "absolute";
  timeDiv.style.top = "50px";
  timeDiv.style.right = "20px";
  BoxScreenNode.append(timeDiv);

  scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.style.position = "absolute";
  scoreDiv.style.top = "50px";
  scoreDiv.style.left = "40px";
  scoreDiv.style.fontSize = "30px";
  scoreDiv.style.fontWeight = "bold";
  BoxScreenNode.append(scoreDiv);

  farmerObj = new Farmer();
  console.log(farmerObj);
  dogObj = new Dog();
  console.log(dogObj);
  makeSheep();
  fencesObj = barnConstruction();
  fencesArr = Object.values(fencesObj);

  timer = setInterval(() => {
    timeRemaining -= 1;
    if (timeRemaining <= 0) {
      //quiz.hasEnded();
      gameOver();
      //showResults();
      //Won Or Loose
      const minutes = Math.floor(timeLimit / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (timeLimit % 60).toString().padStart(2, "0");
      timeDiv.innerText = `${minutes}:${seconds}`;
      //endView.style.display = "block";
      // quizView.style.display = "none";
      clearInterval(timer);
    }
    const minutes = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeRemaining % 60).toString().padStart(2, "0");
    timeDiv.innerText = `${minutes}:${seconds}`;
    timeDiv.style.fontSize = "30px";
    timeDiv.style.fontWeight = "bold";
  }, 1000);

  gameId = setInterval(gameActions, Math.round(1000 / 60));
  sheepSpawnId = setInterval(sheepSpawn, 20000);
}

function gameActions() {
  sheepArr.forEach((sheep) => {
    sheep.walk();
  });
  sheepArrSpawn.forEach((sheepSpawn) => {
    sheepSpawn.walk();
  });
  collisionFarmerSheep();
  collisionSheepBarn();
  myScore();
  scoreDiv.innerText = `Score:${countSheepInBarn}`;
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
  return {
    fence1: new Fence(700, 500),
    fence2: new Fence(700, 310),
    fence3: new Fence(780, 500),
    fence4: new Fence(780, 310),
    verticalFence1: new Fence(830, 445, "vertical"),
    verticalFence2: new Fence(830, 365, "vertical"),
    verticalFence3: new Fence(
      640,
      445,
      "vertical",
      gateOpen3,
      numberGateOpenY3,
    ),
    verticalFence4: new Fence(
      640,
      365,
      "vertical",
      gateOpen4,
      numberGateOpenY4,
    ),
  };
}

function checkOpenCloseGate3() {
  const farmerPositionX = farmerObj.x + farmerObj.width;
  const farmerPositionY = farmerObj.y + farmerObj.height;
  const fence3X = fencesObj.verticalFence3.x + farmerObj.width;

  const nearGateY = 310 <= farmerPositionY && farmerPositionY <= 500;
  const nearGate3X =
    farmerPositionX > fence3X - 60 && farmerPositionX < fence3X + 90;
  //Gate 3
  if (!fencesObj.verticalFence3.isOpen && nearGate3X && nearGateY) {
    fencesObj.verticalFence3.numberGateOpenY = 65;
    fencesObj.verticalFence3.openTheGate();
  } else if (fencesObj.verticalFence3.isOpen && (!nearGate3X || !nearGateY)) {
    fencesObj.verticalFence3.numberGateOpenY = 65;
    fencesObj.verticalFence3.closeTheGate();
  }
}
function checkOpenCloseGate4() {
  const farmerPositionX = farmerObj.x + farmerObj.width;
  const farmerPositionY = farmerObj.y + farmerObj.height;
  const fence4X = fencesObj.verticalFence4.x + farmerObj.width;

  const nearGateY = 310 <= farmerPositionY && farmerPositionY <= 500;
  const nearGate4X =
    farmerPositionX > fence4X - 60 && farmerPositionX < fence4X + 90;
  //Gate 3
  if (!fencesObj.verticalFence4.isOpen && nearGate4X && nearGateY) {
    fencesObj.verticalFence4.numberGateOpenY = -55;
    fencesObj.verticalFence4.openTheGate();
  } else if (fencesObj.verticalFence4.isOpen && (!nearGate4X || !nearGateY)) {
    fencesObj.verticalFence4.numberGateOpenY = -55;
    fencesObj.verticalFence4.closeTheGate();
  }
}
function getAlltheSheep() {
  return sheepArr.concat(sheepArrSpawn);
}

function collisionFarmerSheep() {
  if (caught) return;
  AllSheep = getAlltheSheep();
  for (let i = 0; i < AllSheep.length; i++) {
    let isColliding = checkCollision(farmerObj, AllSheep[i]);
    if (isColliding && AllSheep[i].isInBarn === false) {
      caughtSheep = AllSheep[i];
      AllSheep[i].isCaught = true;
      AllSheep[i].x = farmerObj.x + 10;
      AllSheep[i].node.style.left = `${AllSheep[i].x}px`;
      AllSheep[i].y = farmerObj.y + 10;
      AllSheep[i].node.style.top = `${AllSheep[i].y}px`;
      break;
    }
  }
}

//I will make it as a Bonus it's Not that important
/*function collisionFarmerBarn() {}
*/
function collisionSheepBarn() {
  AllSheep.forEach((eachSheepObj) => {
    fencesArr.forEach((fence) => {
      if (!eachSheepObj.isCaught) {
        let isColliding = checkCollision(fence, eachSheepObj);
        if (isColliding) {
          if (eachSheepObj.dir === "up") {
            eachSheepObj.dir = "down";
          } else if (eachSheepObj.dir === "down") {
            eachSheepObj.dir = "up";
          } else if (eachSheepObj.dir === "forward") {
            eachSheepObj.dir = "backward";
          } else if (eachSheepObj === "backward") {
            eachSheepObj.dir = "forward";
          } else {
            console.log("what happend to the sheep!!");
          }
        }
      }
    });
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
function myScore() {
  return countSheepInBarn;
}
function resetGame() {
  BoxScreenNode.innerHTML = "";
}

function gameOver() {
  ScreenNode.style.display = "none";
  EndScreenNode.style.display = "flex";

  if (countSheepInBarn > AllSheep.length / 2) {
    resultContainer.innerText = `You catched ${countSheepInBarn} out of ${AllSheep.length} sheep in the field!
       Congratulation You Win
    `;
  } else {
    resultContainer.innerText = `You catched ${countSheepInBarn} out of ${AllSheep.length} sheep in the field!
        Oops You Loose
        `;
  }
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
});
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if(!caughtSheep) return;
    
    if(caughtSheep.sheepIsInBarn()){
      caughtSheep.isInBarn = true;
      countSheepInBarn++;
      caughtSheep=null;
    }
    caught = false;
  }
});
RestartGameButtonNode.addEventListener("click", () => {
  RestartGameButtonNode.blur();
  clearInterval(gameId);
  clearInterval(sheepSpawnId);
  clearInterval(timer);
  farmerObj = null;
  dogObj = null;
  sun = null;
  nature = null;
  scoreDiv = null;
  timeDiv = null;
  sheepArr = [];
  sheepArrSpawn = [];
  fencesObj=null;
  fencesArr=[];
  gateOpen3 = false;
  gateOpen4 = false;
  numberGateOpenY3 = 0;
  numberGateOpenY4 = 0;
  caught = false;
  caughtSheep = null;
  AllSheep = [];
  timeRemaining = quizDuration;
  timeLimit = quizDuration;
  countSheepInBarn = 0;
  resetGame();
  EndScreenNode.style.display = "none";
  startGame();
});
