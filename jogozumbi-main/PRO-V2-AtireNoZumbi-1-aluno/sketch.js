var bg,bgImg;
var player, shooterImg, shooter_shooting,playerimg;
var cavernaimg,caverna
var chao
var zumbie,zombieimg
var vida,vidaimg,umavida,umavidaimg,duasvida,duasvidaimg
var vidas=3
var tiros=70
var tiro
var gameState="play"

function preload(){
  shooterImg=loadImage("./assets/shooter_2.png")
playerimg=loadImage("./assets/shooter_1.png")
  shooter_shooting=loadImage("./assets/shooter_3.png")
  bgImg=loadImage("./assets/fundo.png")
  cavernaimg=loadImage("./assets/caverna.png")
zombieimg=loadImage("./assets/zombie.png")
  vidaimg=loadImage("./assets/heart_3.png")
  duasvidaimg=loadImage("./assets/heart_2.png")
  umavidaimg=loadImage("./assets/heart_1.png")
}

function setup() {

  
  
  createCanvas(1300,600);

  //adicionando a imagem de fundo
  bg = createSprite(600,300,1200,600)
  bg.addImage("fundo.png",bgImg)

  caverna=createSprite(960,520)
  caverna.addImage("caverna.png",cavernaimg)
  caverna.scale =0.6

  //criando o sprite do jogador
  player = createSprite(50,500,50,50);
player.addImage("shooter_2.png",shooterImg)
player.scale=0.3
player.addImage("atirando",shooter_shooting)
player.addImage("normal",shooterImg)
player.changeImage("normal")

chao = createSprite(600,600,1200,1);

vida=createSprite(1200,40,20,20)
vida.addImage("heart_3png",vidaimg)
vida.scale=0.3
vida.visible=true

duasvida=createSprite(1200,40,20,20)
duasvida.addImage("heart_2png",duasvidaimg)
duasvida.scale=0.3
duasvida.visible=false

umavida=createSprite(1200,40,20,20)
umavida.addImage("heart_1png",umavidaimg)
umavida.scale=0.3
umavida.visible=false

zombiegroup= new Group()

tirogroup=new Group()
}

function draw() {
  background(0); 

  if(gameState==="play"){

if(vidas===3){
  vida.visible=true
  duasvida.visible=false
  umavida.visible=false
}

if(vidas===2){
  umavida.visible=false
  duasvida.visible=true
  vida.visible=false
}

if(vidas===1){
  umavida.visible=true
  duasvida.visible=false
  vida.visible=false
}

if(vidas===0){
  umavida.visible=false
  duasvida.visible=false
  vida.visible=false
  gameOver()
  gameState="over"
}

 //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
 if(player.y>490){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.velocityY=-5

  }}
  player.velocityY = player.velocityY+0.8
player.collide(chao)



  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+10
  }

  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-10
  }
  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
    tiros-=1
    player.changeImage("atirando") 
    tiro=createSprite(player.x+40,player.y-20,5,5)
    tiro.velocityX=10
    tirogroup.add(tiro);
    console.log(tiro)
    
  
  }
      else if(keyWentUp("space")){
    
    player.changeImage("normal")
     
       }
  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço

  player.overlap(zombiegroup, function(collector, collected) {
    collected.remove();
    vidas-=1
  });

  tirogroup.overlap(zombiegroup, function(collector, collected) {
    collected.remove();
    collector.remove()
  });

  if(tiros===0){
    gameOver()
   gameState="over"
  }




  
  spawzombi()
}

textSize(20) 
  fill("white")
   text("munição = " + tiros,1150,100)


  drawSprites();
if(gameState==="over"){
    zombiegroup.remove()
tirogroup.remove()

}


}

function spawzombi() {
  //escrever código aqui para gerar zombi
  if (frameCount % 20 === 0) {
    var zombie = createSprite(1000,550,40,10);
    zombie.y = Math.round(random(500,550));
    zombie.addImage(zombieimg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    
     //atribuir tempo de vida à variável
    //cloud.lifetime = 200;
    
    //ajustar a profundidade
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //acrescentar cada nuvem ao grupo
    zombiegroup.add(zombie);
  }
}

function gameOver() {
  swal({
    title: `Fim de Jogo`,
    text: "Os zombis te pegaram",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  });
}
