

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



class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 5;
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
            this.x += directionX;
            this.y += directionY;
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
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill();
    }
}




let originX = canvas.width / 2;
let originY = canvas.height / 2;
function getRandomPointInCircle(radius) {
    var x = Math.random() * ((originX + radius) - (originX - radius)) + (originX - radius)
    var y = Math.random() * ((originY + radius) - (originY - radius)) + (originY - radius)
    let dx = originX - x;
    let dy = originY - y;
    let distance = Math.sqrt(dx**2 + dy**2)
    if (distance <= radius){
        return {x: x, y: y}
    }
    else return getRandomPointInCircle(radius - 10)
}


function init () {
    particlesArray = [];
    for (let i = 0; i < 800; i++){
        let {x, y} = getRandomPointInCircle(250)
        particlesArray.push(new Particle(x, y))
    }
}
init();5

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();