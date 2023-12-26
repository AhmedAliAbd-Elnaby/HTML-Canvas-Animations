const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight


let particlesArray = [];

class Particles {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.weight = Math.random() * 5 + 1;
        this.directionX = -4;
    }
    update() {
        if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.weight = Math.random() * 5 + 1;
                this.x = Math.random() * canvas.width * 1.2;
            }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 200; i++){
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particles(x, y))
    }
}
init();

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();
