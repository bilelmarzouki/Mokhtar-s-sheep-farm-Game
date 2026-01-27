class Sheep{
    constructor(PosX,PosY){
      this.node=document.createElement("img")
      this.node.src="./images/sheep.jpg"
      BoxScreenNode.append(this.node)
      this.x=PosX//250
      this.y=PosY//200
      this.height=40
      this.width=40
      this.speed=1
      this.dir="down"
      this.id=setInterval(()=>{
        let directions=["forward","backward","up","down"]
        this.dir=directions[Math.floor(Math.random()*directions.length)]
      },1000)
      this.node.style.position="absolute"
      this.node.style.top=`${this.y}px`
      this.node.style.left=`${this.x}px`
      this.node.style.width=`${this.width}px`
      this.node.style.height=`${this.height}px`
    }
    moveForward(){
      this.x+=this.speed
      this.node.style.left=`${this.x}px`
    }
    moveBackward(){
      this.x-=this.speed
      this.node.style.left=`${this.x}px`
    }
    moveDown(){
      this.y+=this.speed
      this.node.style.top=`${this.y}px`

    }
    moveUp(){
      this.y-=this.speed
      this.node.style.top=`${this.y}px`
    }
    
   walk(){
     switch (this.dir) {
        case "forward":
            this.moveForward()
            break;
        case "backward":
            this.moveBackward()
            break;
        case "down":
            this.moveDown()
            break;
        case "up":
            this.moveUp() 
            break;
        default:
            break;
     }
   }
   stopWalking(){
    clearInterval(this.id)
   }
}