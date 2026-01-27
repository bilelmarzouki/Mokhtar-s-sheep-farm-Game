class Dog{
    constructor(){
      this.node=document.createElement("img")
      this.node.src="./images/dog.png" 
      BoxScreenNode.append(this.node)
      this.x=90
      this.y=500
      this.height=50
      this.width=50

      this.node.style.position="absolute"
      this.node.style.top=`${this.y}px`
      this.node.style.left=`${this.x}px`
      this.node.style.width=`${this.width}px`
      this.node.style.height=`${this.height}px`
    }
    moveForward(){
      this.x+=4
      this.node.style.left=`${this.x}px`
    }
    moveBackward(){
      this.x-=4
      this.node.style.left=`${this.x}px`
    }
    moveUp(){
      this.y-=4
      this.node.style.top=`${this.y}px`
    }
    moveDown(){
      this.y+=4
      this.node.style.top=`${this.y}px`

    }
}