

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray = [];
const mouse = {
    x : null,
    y : null,
    radius : 250
}
window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    mouse.radius = 150;
})

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('Hello!', 0, 30);
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 200, 200);
const textCoordinates = ctx.getImageData(0, 0, 200,100);
let adjustX = 10;
let adjustY = 10;

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 3) + 1;
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx**2 + dy**2)
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX ){
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            } 
            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }
}

function init () {
    particlesArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 *textCoordinates.width) + (x * 4) + 3
            ] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particlesArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();