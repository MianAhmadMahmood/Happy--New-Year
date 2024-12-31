const year2024 = document.getElementById('year-2024');
const year2025 = document.getElementById('year-2025');
const message = document.querySelector('.message');
const countdownDisplay = document.getElementById('countdown');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Night Sky with Stars
const stars = [];
for (let i = 0; i < 300; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.5,
    speed: Math.random() * 0.1 + 0.05, // Speed for animation
    direction: Math.random() * Math.PI * 2 // Random direction for movement
  });
}

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
    
    // Animate stars slightly moving
    star.x += Math.cos(star.direction) * star.speed;
    star.y += Math.sin(star.direction) * star.speed;

    // Reset star position if out of bounds
    if (star.x > canvas.width) star.x = 0;
    if (star.y > canvas.height) star.y = 0;
    if (star.x < 0) star.x = canvas.width;
    if (star.y < 0) star.y = canvas.height;
  });
}

// Fireworks
const fireworks = [];
class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.speed = Math.random() * 2 + 2;
    this.size = Math.random() * 3 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }
  update() {
    this.y -= this.speed;
    if (this.y < this.targetY) {
      fireworks.splice(fireworks.indexOf(this), 1);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  fireworks.forEach((fw) => {
    fw.update();
    fw.draw();
  });
  requestAnimationFrame(animateFireworks);
}

// Countdown Timer
function startCountdown() {
  const targetDate = new Date("2025-01-01T00:00:00");
  setInterval(function() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference <= 0) {
      countdownDisplay.textContent = "Happy New Year!";
      // Transition from 2024 to 2025 automatically when the countdown hits 0
      year2024.classList.add('new-year');
      year2025.classList.remove('new-year');
      year2025.style.transform = 'translateX(0)';
      year2024.style.opacity = '0';
      setTimeout(() => {
        // Show Happy New Year message
        message.style.opacity = '1';
        // Create fireworks
        setInterval(() => fireworks.push(new Firework()), 100);
      }, 1000);
      return;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(difference / (1000 * 60)) % 60;
    const seconds = Math.floor(difference / 1000) % 60;
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

startCountdown();
animateFireworks();
