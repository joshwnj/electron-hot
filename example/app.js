var physics = require('./physics.js');
var canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.background = '#222222';

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

var balls = [];
var start = null;

function render(now) {
  window.requestAnimationFrame(render);

  if (!start) {
    start = now;
  }

  var seconds = (now - start) / 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Helvetica Neue';
  ctx.textAlign = 'center';

  ctx.fillText(seconds.toFixed(1) + 's', canvas.width / 2, 32);

  physics.step(balls, canvas);

  balls.forEach(function(ball) {
    ctx.beginPath();
    ctx.arc(ball.position[0], ball.position[1], ball.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.closePath();
  });
}

window.requestAnimationFrame(render);

window.addEventListener('click', function (evt) {
  balls.push({
    position: [evt.x, evt.y],
    velocity: [0, 0],
    radius: 25,
    elasticity: 0.5
  });
});
