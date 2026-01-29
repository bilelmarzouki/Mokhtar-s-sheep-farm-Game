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
      setInterval(()=>{
        let directions=["forward","backward","up","down"]
        this.dir=directions[Math.floor(Math.random()*directions.length)]
      },2000)
      this.node.style.position="absolute"
      this.node.style.top=`${this.y}px`
      this.node.style.left=`${this.x}px`
      this.node.style.width=`${this.width}px`
      this.node.style.height=`${this.height}px`
      this.isInBarn=false
      this.isCaught = false
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

     if (this.isCaught) return 

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
  /* stopWalking(){
      this.isCaught=true;
   }*/
   sheepIsInBarn(){
      return (this.x>700 && this.x<830)&&(this.y>300 && this.y<520)
  }
}