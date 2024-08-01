const ctx = canvas.getContext('2d');

let perlin0 = new Perlin();
let perlin1 = new Perlin();
let perlin = {
	get: (x, y) => {
		return perlin0.get(x, y) + perlin1.get(time, time + 2.134);
	}
}

let scale = 3;
let size = 50;
let speed = 1;
let time = 1.3;
let timeStep = 0.0001;

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
	}
	update() {
		let v = perlin.get(scale * this.x / canvas.width, scale * this.y / canvas.width);
		let angle = (v + 1) * Math.PI;
		let vector = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
		
		this.x += speed * vector.x;
		this.y += speed * vector.y;
		if (this.x > canvas.width) this.x -= canvas.width;
		if (this.x < 0) this.x += canvas.width;
		if (this.y > canvas.height) this.y -= canvas.height;
		if (this.y < 0) this.y += canvas.height;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 0.1, 0, 2 * Math.PI);
		ctx.fillStyle = 'cyan';
		ctx.fill();
	}
}
let Particles = [];

function loop() {
	requestAnimationFrame(loop);
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = `rgba(0, 0, 0, ${0.01})`;
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	/*for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let x = i * canvas.width / size;
			let y = j * canvas.height / size;
			let w = canvas.width / size;
			let h = canvas.height / size;
			let v = perlin.get(scale * x / canvas.width, scale * y / canvas.width);

			ctx.beginPath();
			let value = 255 * (v + 1) / 2;
			ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
			ctx.fillRect(x, y, w, h);
			
			let angle = (v + 1) * Math.PI;
			let vector = {
				x: Math.cos(angle),
				y: Math.sin(angle)
			};
			
			ctx.beginPath();
			ctx.moveTo(x + w / 2, y + h / 2);
			ctx.lineTo(x + w / 2 + vector.x * 5, y + h / 2 + vector.y * 5);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'lime';
			ctx.stroke();
		}
	}*/

	Particles.forEach(particle => {
		particle.update();
		particle.draw();
	});

	time += timeStep;
}

window.onload = () => {
	window.onresize();

	for (let i = 0; i < 1000; i++) Particles.push(new Particle());

	loop();
};

window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};