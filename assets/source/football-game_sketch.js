let ball = {
  x: 400,
  y: 300,
  speedX: 7,
  speedY: 5,
  size: 15
};

let leftPaddle = {
  x: 30,
  y: 300,
  width: 15,
  height: 80,
  speed: 5
};

let rightPaddle = {
  x: 770,
  y: 300,
  width: 15,
  height: 80,
  speed: 5
};

function setup() {
  createCanvas(800, 600);
  frameRate(60);
}

function draw() {
  background(40);
  
  // Draw center line
  stroke(255, 255, 255, 127);
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]);
  line(width/2, 0, width/2, height);
  drawingContext.setLineDash([]);
  
  // Draw ball
  fill(255);
  noStroke();
  circle(ball.x, ball.y, ball.size);
  
  // Draw paddles
  fill(255);
  rect(leftPaddle.x, leftPaddle.y - leftPaddle.height/2, leftPaddle.width, leftPaddle.height);
  rect(rightPaddle.x, rightPaddle.y - rightPaddle.height/2, rightPaddle.width, rightPaddle.height);
  
  // Move ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  
  // Ball collisions
  if (ball.y < 0 || ball.y > height) ball.speedY *= -1;
  
  // Paddle collisions
  if (checkPaddleCollision(leftPaddle) || checkPaddleCollision(rightPaddle)) {
    ball.speedX *= -1.1; // Increase speed slightly
  }
  
  // Reset if ball goes past paddles
  if (ball.x < 0 || ball.x > width) {
    ball.x = width/2;
    ball.y = height/2;
    ball.speedX = 7 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 5 * (Math.random() > 0.5 ? 1 : -1);
  }
  
  // AI movement
  leftPaddle.y = lerp(leftPaddle.y, ball.y, 0.1);
  rightPaddle.y = lerp(rightPaddle.y, ball.y, 0.1);
}

function checkPaddleCollision(paddle) {
  return ball.x > paddle.x && 
         ball.x < paddle.x + paddle.width && 
         ball.y > paddle.y - paddle.height/2 && 
         ball.y < paddle.y + paddle.height/2;
}