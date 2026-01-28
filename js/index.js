const StartScreenNode = document.querySelector("#game-start-screen");
const StartButtonNode = document.querySelector("#start-btn");
const ScreenNode = document.querySelector("#game-screen");
const BoxScreenNode = document.querySelector("#box-game");
const EndScreenNode = document.querySelector("#game-end-screen");
const RestartGameButtonNode = document.querySelector("#restart-btn");
const timeRemainingContainer = document.getElementById("timeRemaining");
timeRemainingContainer.style.position = "absolute";
timeRemainingContainer.style.top = "50px";
timeRemainingContainer.style.right = "20px";
const scoreContainer = document.getElementById("score");
scoreContainer.style.position = "absolute";
scoreContainer.style.top = "50px";
scoreContainer.style.left = "40px";
scoreContainer.style.fontSize = "30px";
scoreContainer.style.fontWeight = "bold";
const resultContainer = document.querySelector("#result");

//* GLOBAL GAME VARIABLES
let WinOrLoose = "";
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
let caughtSheep = null;
let AllSheep = [];
const quizDuration = 120;
let timeRemaining = quizDuration;
let timeLimit = quizDuration;
let countSheepInBarn = 0;
StartScreenNode.style.display = "flex";
ScreenNode.style.display = "none";
let sheepSpawnId = null;
let gameId = null;
/*let fences = [
  new Fence(700, 500),
  new Fence(700, 310),
  new Fence(780, 500),
  new Fence(780, 310),
  new Fence(830, 445, "vertical"),
  new Fence(830, 365, "vertical"),
  new Fence(640, 445, "vertical", gateOpen3, numberGateOpenY3),
  new Fence(640, 365, "vertical", gateOpen4, numberGateOpenY4),
];*/

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
    setTimeout(() => {
     let timer = setInterval(() => {
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
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
        //endView.style.display = "block";
        // quizView.style.display = "none";
        clearInterval(timer);
      }
      const minutes = Math.floor(timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      timeRemainingContainer.style.fontSize = "30px";
      timeRemainingContainer.style.fontWeight = "bold";
    }, 1000);
  }, 0);

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
  //collisionSheepBarn()
  myScore();
  scoreContainer.innerText = `Score:${countSheepInBarn}`;
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
      // sheepArr[i].speed= farmerObj.speed
      break;
    }
  }
}

//I will make it as a Bonus it's Not that important
/*function collisionFarmerBarn() {
  AllSheep.forEach((eachSheepObj) => {
    let lastMoveSheepX = eachSheepObj.x;
    let lastMoveSheepY = eachSheepObj.y;
    eachSheepObj.walk();
    fences.forEach((fence) => {
      let isColliding = checkCollision(fence, eachSheepObj);
      if (isColliding) {
        eachSheepObj.x = lastMoveSheepX;
        eachSheepObj.y = lastMoveSheepY;
      }
    });
  });
}
*/
// I will make it as a Bonus it's Not that important
/*function collisionSheepBarn() {
  AllSheep.forEach((eachSheepObj) => {
    let lastMoveSheepX = eachSheepObj.x;
    let lastMoveSheepY = eachSheepObj.y;
    //eachSheepObj.walk();
    fences.forEach((fence) => {
      if (!eachSheepObj.isCaught) {
        let isColliding = checkCollision(fence, eachSheepObj);
        if (isColliding) {
          eachSheepObj.x = lastMoveSheepX;
          eachSheepObj.y = lastMoveSheepY;
          eachSheepObj.node.style.left = `${eachSheepObj.x} px`;
          eachSheepObj.node.style.top = `${eachSheepObj.y}px`;
        }
      }
    });
  });
}
*/

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
  ScreenNode.innerHTML = "";
}

function gameOver() {
  /*clearInterval(gameId);
  clearInterval(sheepSpawnId);
  clearTimeout(id);*/
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
RestartGameButtonNode.addEventListener("click", () => {
  EndScreenNode.style.display = "none";
  //ScreenNode.style.display = "flex";
  //resetGame();
  //startGame();
  ScreenNode.style.display = "flex";
});

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
    caught = false;
    caughtSheep.isInBarn = true;
    countSheepInBarn++;
  }
});
