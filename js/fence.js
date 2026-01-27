class Fence{

    constructor(PosX,PosY,verticalOrHorizontaal,isOpen,numberGateOpenY){
      this.node=document.createElement("img")
      this.node.src="./images/fence.png"
      
      
      BoxScreenNode.append(this.node)
      this.node
      this.x=PosX
      this.y=PosY
      this.isOpen=isOpen
      this.numberGateOpenY=numberGateOpenY
      this.verticalOrHorizontaal=verticalOrHorizontaal
      if(verticalOrHorizontaal==="vertical"){
         this.node.style.transform="rotate(90deg)"
      }
      this.height=40
      this.width=80

      this.node.style.position="absolute"
      this.node.style.top=`${this.y}px`
      this.node.style.left=`${this.x}px`
      this.node.style.width=`${this.width}px`
      this.node.style.height=`${this.height}px`
    }
    openTheGate(){
      if(this.verticalOrHorizontaal==="vertical" && !this.isOpen){
          this.y=this.y+ this.numberGateOpenY
          this.isOpen=true
          this.node.style.top=`${this.y}px`
      }
    }
    closeTheGate(){
      if(this.verticalOrHorizontaal==="vertical" && this.isOpen){
          this.y=this.y+ (-this.numberGateOpenY)
          this.isOpen=false
          this.node.style.top=`${this.y}px`
      }
    }
}