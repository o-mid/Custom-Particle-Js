const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//
let fillStartX = 0;
let fillStartY = 40;
let fillEndX = 250;

//
canvasContext.fillStyle = "white";
canvasContext.font = "35px Verdana";
canvasContext.fillText("omid", fillStartX, fillStartY);

const getImageData = canvasContext.getImageData(
  fillStartX,
  fillStartY,
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
    this.speed = Math.random() * 20 + 1;
  }
  drawPartciler() {
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.particleRadius, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.fill();
  }
  updateLocation() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance < 100) {
      this.particleRadius = 7;
    } else {
      this.particleRadius = 3;
    }
  }
}

function addParticle() {
  particles = [];
  for (let n = 0; n < 500; n++) {
    let randomx = Math.random() * window.innerWidth;
    let randomy = Math.random() * window.innerHeight;
    particles.push(new particle(randomx, randomy));
  }
}
addParticle();

function animateParticles() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].drawPartciler();
    particles[i].updateLocation();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
