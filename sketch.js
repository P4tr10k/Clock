const MULT = 5, SIDE = 10 * MULT, WW = SIDE * 17, HH = SIDE * 5;
let digits = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(1);
  digits[0] = new Digit(SIDE*-2.5,1);
  digits[1] = new Digit(SIDE*3, 3);
  digits[2] = new Digit(SIDE*7, 2);
  digits[3] = new Digit(SIDE*12.5);
}

function draw() {
  background(15);


translate(width * 0.5 - WW * 0.5 , height * 0.5 - HH * 0.5 )

  fill(0);
  let d = new Date(), time = d.toString();
  time = time.replace(/.+(\d\d):(\d\d):.*/g, "$1$2");
  let ds = time.split("");

  for (var i in ds) {
    digits[i].set(ds[i]);
    digits[i].show();
  }

}

function Digit(placement, rows = 3) {
  this.placement = placement;
  this.value = 0;
  this.rows = rows;

  this.resetLights = function() {
    this.lights = [
      false, false, false,
      false, false, false,
      false, false, false
    ];
    if (this.rows == 1) {
      this.lights.splice(3, 6);
    } else if (this.rows == 2) {
      this.lights.splice(6, 3);
    }
  }
  this.resetLights();

  this.set = function(v) {
    //if (v == this.value) return;
    this.value = v;
    this.resetLights();
    let ps = Array.from(this.lights.keys()), n = v;
    while (n > 0) {
      let p = random(ps);
      let i = ps.indexOf(p);
      ps.splice(i, 1);
      this.lights[p] = true;
      n--;
    }
  }

  this.show = function() {
    push();
  //this.color = color(random(255),random(255),random(255));
    this.color = color(31,232,33);
    this.reccolor = color(0);
    stroke(150);
    strokeWeight(0.75);
    translate(this.placement, 10);
    let y1 = 0, y2 = SIDE + SIDE/2, y3 = 3*SIDE;
    let x1 = 0, x2 = SIDE + SIDE/2, x3 = 3*SIDE;

    fill(this.lights[0]?this.color:this.reccolor); rect(x3, y1, SIDE, SIDE);
    fill(this.lights[1]?this.color:this.reccolor); rect(x3, y2, SIDE, SIDE);
    fill(this.lights[2]?this.color:this.reccolor); rect(x3, y3, SIDE, SIDE);
    if (rows > 1) {
      fill(this.lights[3]?this.color:this.reccolor); rect(x2, y1, SIDE, SIDE);
      fill(this.lights[4]?this.color:this.reccolor); rect(x2, y2, SIDE, SIDE);
      fill(this.lights[5]?this.color:this.reccolor); rect(x2, y3, SIDE, SIDE);
    }
    if (rows > 2) {
      fill(this.lights[6]?this.color:this.reccolor); rect(x1, y1, SIDE, SIDE);
      fill(this.lights[7]?this.color:this.reccolor); rect(x1, y2, SIDE, SIDE);
      fill(this.lights[8]?this.color:this.reccolor); rect(x1, y3, SIDE, SIDE);
    }
    pop();
  }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
