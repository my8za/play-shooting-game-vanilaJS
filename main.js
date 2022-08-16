//  캔버스 생성
let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas)


let backgroundImg, spaceshipImg, bulletImg, enemyImg, gameoverImg; 

// 우주선 좌표
let spaceshipX = canvas.width / 2 -32;
let spaceshipY = canvas.height - 64;

let bulletList = [] //총알 저장 배열
function Bullet () {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 20;
    this.y = spaceshipY;

    bulletList.push(this)
  }
  this.update = function () {
    this.y -= 7;
  }
}
function loadImage () {
  backgroundImg = new Image();
  backgroundImg.src='images/background.png';

  spaceshipImg = new Image();
  spaceshipImg.src = 'images/spaceship.png';

  bulletImg = new Image();
  bulletImg.src = 'images/bullet.png';

  enemyImg = new Image();
  enemyImg.src = 'images/enemy.png';

  gameoverImg = new Image();
  gameoverImg.src = 'images/gameover.png';
}

let keysDown = {}
function setupKeyboardListner () {
  document.addEventListener('keydown', (e) => {
    keysDown[e.key] = true;
  })
  document.addEventListener('keyup', (e) => {
    delete keysDown[e.key]

    if(e.keyCode == 32) {
      createBullet(); //총알 생성
    }
  })
}

function createBullet () {
  console.log('총알')
  let b = new Bullet();
  b.init()
  console.log(bulletList)
}

function update () {
  if('ArrowRight' in keysDown) {
    spaceshipX += 5;
  } //right
  if('ArrowLeft' in keysDown) {
    spaceshipX -= 5;
  } //left

  // 우주선이 캔버스 안에서만 움직일 수 있도록
  if(spaceshipX <= 0) {
    spaceshipX = 0
  } else if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }

  // 총알 y좌표 업데이트 함수 호출
  bulletList.map(bullet => bullet.update())
}

function render () {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY)
  
  bulletList.map(bullet => ctx.drawImage(bulletImg, bullet.x, bullet.y))
}

function main () {
  update(); //좌표값 변경
  render(); //출력
  // console.log('animation calls main function')
  requestAnimationFrame(main);
}
loadImage();
setupKeyboardListner();
main();


// 총알
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알 발사 : 총알의 y값이 --, 
//    총알의 x값은 스페이스를 누룬 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장
// 4. 총알들은 x,y 좌표값이 있어야한다.
// 5. 총알 배열을 render