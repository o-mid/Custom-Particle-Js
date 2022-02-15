const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//
let fillStartX = 0;
let fillStartY = 40;
let fillEndX = 250;
let adjustY = 10;
let adjustX = 0;
//
canvasContext.fillStyle = "white";
canvasContext.font = "45px Verdana";
canvasContext.fillText("OM", fillStartX, fillStartY);

const getImageDataCoordinate = canvasContext.getImageData(
  0,
  0,
  fillEndX,
  fillEndX
);

// canvasContext.strokeStyle = "white";

// canvasContext.strokeRect(0, 0, fillEndX, fillEndX);

const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  // console.log(mouse.x, mouse.y);
});

let particles = [];

class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particleRadius = 3;
    this.basex = this.x;
    this.basey = this.y;
    this.density = Math.random() * 100 + 1;
  }
  drawPartciler() {
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.particleRadius, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    let moveX = dx / distance;
    let moveY = dy / distance;
    let maxdistance = mouse.radius;
    let calculateSpeed = (maxdistance - distance) / maxdistance;
    let directionX = moveX * calculateSpeed * this.density;
    let directionY = moveY * calculateSpeed * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;

      //this.particleRadius = 7;
    } else {
      if (this.x !== this.basex) {
        let dx = this.x - this.basex;
        this.x -= dx / 7;
      }
      if (this.y !== this.basey) {
        let dy = this.y - this.basey;
        this.y -= dy / 7;
      }
    }
  }
}

function addParticle() {
  particles = [];
  // for (let n = 0; n < 500; n++) {
  //   let randomx = Math.random() * window.innerWidth;
  //   let randomy = Math.random() * window.innerHeight;
  //   particles.push(new particle(randomx, randomy));
  // }
  // console.log(getImageDataCoordinate.data);

  let cordinatesHeight = getImageDataCoordinate.height;
  let cordinatesWidth = getImageDataCoordinate.width;

  for (let y = 0; y < cordinatesHeight; y++) {
    for (let x = 0; x < cordinatesWidth; x++) {
      if (
        getImageDataCoordinate.data[y * 4 * cordinatesWidth + x * 4 + 3] > 128
      ) {
        let positionX = x + adjustX;
        let positiony = y + adjustY;
        particles.push(new particle(positionX * 10, positiony * 10));
      }
    }
  }
  console.log(particles.length);
}
addParticle();

function animateParticles() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].drawPartciler();
    particles[i].update();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

function connectParticles() {
  let lineOpasity = 1;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let distancex = particles[a].x - particles[b].x;
      let distancey = particles[a].y - particles[b].y;
      let distance = Math.sqrt(Math.pow(distancex, 2) + Math.pow(distancey, 2));
      if (distance < 30) {
        lineOpasity = 1 - distance / 30;
        canvasContext.strokeStyle = "rgba(255,255,255," + lineOpasity + ")";
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();
        canvasContext.moveTo(particles[a].x, particles[a].y);
        canvasContext.lineTo(particles[b].x, particles[b].y);
        canvasContext.stroke();
      }
    }
  }
}
