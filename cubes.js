console.clear();

let s;
let s2;
let cubes = [];
let amountCubes;
let cubeSize;
let amountCubesY;
let angle = (Math.PI * 2) / 6;

function setup() {
  windowResized();
  createCanvas(s, s);

  strokeWeight(3);
  noFill();
  strokeCap(SQUARE);
}

function windowResized() {
  s = windowWidth > windowHeight ? windowHeight : windowWidth;
  s *= 0.8;
  s2 = s / 2;
  resizeCanvas(s, s);
  amountCubes = max(floor(s / 80), 6);
  cubeSize = s / (amountCubes * (cos(angle - HALF_PI) * 2));
  amountCubesY = floor(s / (cubeSize / 1.5) / 2);
  const distanceX = cos(angle - HALF_PI) * cubeSize;
  cubes = [];

  const diag = createVector(0, 0).dist(createVector(s2, s2));
  for (var x = 0; x <= amountCubes; x++) {
    for (var y = 0; y <= amountCubesY; y++) {
      const offset = (y % 2) * distanceX;
      const centerX = x * distanceX * 2 + offset;
      const centerY = y * cubeSize * 1.5;
      const dist = createVector(centerX, centerY).dist(createVector(s2, s2));
      cubes.push(new Cube(centerX, centerY, dist / diag));
    }
  }
}

function draw() {
  clear();
  var delta = millis() * 0.0015;

  stroke(0, 0, 0, 120);
  cubes.forEach(cube => {
    cube.draw(delta);
  });

  resetMatrix();
  strokeWeight(4);
  stroke(0, 0, 0, 255);
  rect(2, 2, s - 4, s - 4);
  strokeWeight(3);
}

class Cube {
  constructor(centerX, centerY, distance) {
    this.x = centerX;
    this.y = centerY;
    this.v = [];
    this.r = 0;
    this.size = 1;
    this.opacity = 1;
    this.angle = 0;
    this.distance = distance;
    this.tl = new TimelineMax({
      repeat: -1,
      delay: distance,
      repeatDelay: 1
    });
    this.tl.to(this, 1, {
      size: 0.8,
      ease: Back.easeOut
    });
    this.tl.to(this, 1.3, {
      r: (PI / 3) * 2,
      ease: Back.easeOut
    });
    this.tl.to(this, 1, {
      size: 1,
      ease: Power1.easeOut
    });
  }
  getVertices() {}
  draw(delta) {
    translate(this.x, this.y);
    rotate(this.r);
    beginShape();
    this.v = [];
    for (var i = 0; i <= 6; i++) {
      const a = i * angle;
      const sx = cos(a + HALF_PI) * (cubeSize * this.size);
      const sy = sin(a + HALF_PI) * (cubeSize * this.size);
      this.v.push(createVector(sx, sy));
      vertex(sx, sy);
    }
    stroke(0, 0, 0, this.opacity * 255);
    endShape();

    stroke(0, 0, 0, 255);
    line(0, 0, this.v[0].x, this.v[0].y);
    line(0, 0, this.v[2].x, this.v[2].y);
    line(0, 0, this.v[4].x, this.v[4].y);
    resetMatrix();

    // line(this.x, this.y, this.v[1].x, this.v[1].y);
    // line(this.x, this.y, this.v[3].x, this.v[3].y);
    // line(this.x, this.y, this.v[5].x, this.v[5].y);
  }
}
