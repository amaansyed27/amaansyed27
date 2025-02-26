let path = [];
let car = { pos: 0, speed: 0.02 };
let track = [];

function setup() {
  createCanvas(800, 600);
  defineTrack();
  frameRate(60);
}

function defineTrack() {
  // Monaco-inspired track points
  track = [
    {x: 400, y: 100},  // Start/Finish
    {x: 500, y: 100},  // Casino Square
    {x: 600, y: 150},
    {x: 600, y: 250},  // Mirabeau
    {x: 500, y: 300},  // Hairpin
    {x: 400, y: 350},
    {x: 300, y: 300},
    {x: 200, y: 250},  // Tunnel entrance
    {x: 200, y: 150},  // Tunnel exit
    {x: 300, y: 100}
  ];
  
  // Create smooth path
  for (let i = 0; i < track.length; i++) {
    let current = track[i];
    let next = track[(i + 1) % track.length];
    for (let t = 0; t < 1; t += 0.05) {
      path.push({
        x: lerp(current.x, next.x, t),
        y: lerp(current.y, next.y, t)
      });
    }
  }
}

function draw() {
  background(40);
  
  // Draw track
  stroke(255);
  strokeWeight(30);
  noFill();
  beginShape();
  for (let point of track) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);
  
  // Draw racing line
  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let point of path) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);
  
  // Draw car
  let pos = floor(car.pos % path.length);
  fill(255, 0, 0);
  noStroke();
  circle(path[pos].x, path[pos].y, 10);
  
  // Move car
  car.pos += car.speed;
}