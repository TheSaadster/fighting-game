const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
const backgroundMusic = document.querySelector('#music')
const swordAttack = new Audio('./sounds/sword.mp3')
const mageAttack = new Audio('./sounds/mage.mp3')
backgroundMusic.play()
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: "./images/shop.png",
  scale: 2.75,
  framesMax: 6,
});
const player1 = new Fighter({
  position: {
    x: -100,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/player1/Idle.png",
  framesMax: 10,
  scale: 4,
  offset: {
    x: 100,
    y: 250,
  },
  sprites: {
    idle: {
      name: "idle",
      imageSrc: "./images/player1/Idle.png",
      framesMax: 10,
      attack: false,
    },
    run: {
      name: "run",
      imageSrc: "./images/player1/Run.png",
      framesMax: 8,
      attack: false,
    },
    jump: {
      name: "jump",
      imageSrc: "./images/player1/Jump.png",
      framesMax: 3,
      attack: false,
    },
    fall: {
      name: "fall",
      imageSrc: "./images/player1/Fall.png",
      framesMax: 3,
      attack: false,
    },
    attack1: {
      name: "attack1",
      imageSrc: "./images/player1/Attack1.png",
      framesMax: 7,
      attack: true,
    },
    attack2: {
      name: "attack2",
      imageSrc: "./images/player1/Attack2.png",
      framesMax: 7,
      attack: true,
    },
    attack3: {
      name: "attack3",
      imageSrc: "./images/player1/Attack3.png",
      framesMax: 8,
      attack: true,
    },
    takeHit: {
      name: "takeHit",
      imageSrc: "./images/player1/Take hit.png",
      framesMax: 3,
      attack: false,
    },
    death: {
      name: "death",
      imageSrc: "./images/player1/Death.png",
      framesMax: 7,
      attack: false,
    },
  },
  attackBox: {
    offset: {
      x: 150,
      y: 50,
    },
    width: 150,
    height: 50,
  },
});

const player2 = new Fighter({
  position: {
    x: 700,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./images/player2/Idle.png",
  framesMax: 8,
  scale: 3.6,
  offset: {
    x: 350,
    y: 449,
  },
  sprites: {
    idle: {
      name: "idle",
      imageSrc: "./images/player2/Idle.png",
      framesMax: 8,
      attack: false,
    },
    run: {
      name: "run",
      imageSrc: "./images/player2/Run.png",
      framesMax: 8,
      attack: false,
    },
    jump: {
      name: "jump",
      imageSrc: "./images/player2/Jump.png",
      framesMax: 3,
      attack: false,
    },
    fall: {
      name: "fall",
      imageSrc: "./images/player2/Fall.png",
      framesMax: 3,
      attack: false,
    },
    attack1: {
      name: "attack1",
      imageSrc: "./images/player2/Attack1.png",
      framesMax: 8,
      attack: true,
    },
    attack2: {
      name: "attack2",
      imageSrc: "./images/player2/Attack2.png",
      framesMax: 8,
      attack: true,
    },
    attack3: {
      name: "attack2",
      imageSrc: "./images/player2/Attack2.png",
      framesMax: 8,
      attack: true,
    },
    takeHit: {
      name: "takeHit",
      imageSrc: "./images/player2/Take hit.png",
      framesMax: 3,
      attack: false,
    },
    death: {
      name: "death",
      imageSrc: "./images/player2/Death.png",
      framesMax: 7,
      attack: false,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 50,
    },
    width: 175,
    height: 50,
  },
});
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

// decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  
  background.update();
  shop.update();
  c.fillStyle = 'rgba(255,255,255,0.1)'
  c.fillRect(0,0,canvas.width, canvas.height)
  player1.update();
  player2.update();

  //player 1 movement
  player1.velocity.x = 0; //set velocity to 0 if not pressing key
  player2.velocity.x = 0;
  //change x velocity if holding down a or d
  //player1.framesMax = player1.sprites.idle.framesMax;

  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -5;
    player1.switchSprite("run");
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 5;
    player1.switchSprite("run");
  } else {
    player1.switchSprite("idle");
  }

  if (player1.velocity.y < 0) {
    player1.switchSprite("jump");
  } else if (player1.velocity.y > 0) {
    player1.switchSprite("fall");
  }

  //player 2 movement

  if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -5;
    player2.switchSprite("run");
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 5;
    player2.switchSprite("run");
  } else {
    player2.switchSprite("idle");
  }
  if (player2.velocity.y < 0) {
    player2.switchSprite("jump");
  } else if (player2.velocity.y > 0) {
    player2.switchSprite("fall");
  }
  //Detect attack from player 1
  if ( timer !== 0 &&
    rectangularCollision({
      rectangle1: player1,
      rectangle2: player2,
    }) &&
    player1.isAttacking &&
    player1.frameCurrent === 4
  ) {
    player2.takeHit();
    player1.isAttacking = false;
    document.querySelector("#player2-hp").style.width = player2.health + "%";
    
  }
  if (player1.isAttacking && player1.frameCurrent === 4) {
    player1.isAttacking = false;
  }
  if ( timer !== 0 &&
    rectangularCollision({
      rectangle1: player1,
      rectangle2: player2,
    }) &&
    player2.isAttacking &&
    player2.frameCurrent === 4
  ) {
    player1.takeHit();
    player2.isAttacking = false;

    document.querySelector("#player1-hp").style.width = player1.health + "%";
    
  }
  if (player2.isAttacking && player2.frameCurrent === 4) {
    player2.isAttacking = false;
  }
  //end game based on health
  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner({ player1, player2, timerId });
    askRestart();
  }
}

// animate();
function startGame(){
  const start = document.querySelector('#start-screen')
  start.style.display = 'none'
  animate();
  decreaseTimer();
}
function askRestart(){
  const restart = document.querySelector("#restart")
  restart.style.display = 'block'
}


//sets pressed value of corresponding keys value to true
window.addEventListener("keydown", (event) => {
  if (!player1.dead) {
    switch (event.key) {
      //player 1 keys

      case "d":
        keys.d.pressed = true;
        player1.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player1.lastKey = "a";
        break;
      case "w":
        player1.velocity.y = -20;
        break;
      case " ":
        swordAttack.pause()
        swordAttack.currentTime=0
        swordAttack.play()
        player1.attack();
        break;
    }
  }
  if (!player2.dead) {
    //Player 2 keys
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        player2.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        player2.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
          player2.velocity.y = -20;
        break;
      case "Enter":
        mageAttack.pause()
        mageAttack.currentTime = 0
        mageAttack.play()
        player2.attack();
        break;
    }
  }
});
//sets pressed value of corresponding keys value to false
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    //player 1 keys
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    //player 2 keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
