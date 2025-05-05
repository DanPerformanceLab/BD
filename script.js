const countdownEl = document.querySelector(".countdown");
const presentEl = document.querySelector(".present"); 
const timeEl = document.getElementById("time");         
const targetDate = new Date("2025-05-06T00:00:00");

let timer;

function updateCountdown() {
	const now = new Date();
	const diff = targetDate - now;

	if (diff <= 0) {
		clearInterval(timer);

		// Fade out countdown
		countdownEl.classList.add("fade-out");

		// After fade-out, show present and launch balloons
		setTimeout(() => {
			countdownEl.style.display = "none";
			presentEl.classList.add("fade-in");
			releaseBalloons(); // 🎈 Launch balloons for 20s
		}, 1000);

		return;
	}	

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	timeEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// 🎈 Launch floating balloons for 20 seconds
function releaseBalloons(duration = 20000, interval = 300) {
	const container = document.getElementById("balloon-container");
	let balloonInterval;

	balloonInterval = setInterval(() => {
		const balloon = document.createElement("div");
		balloon.classList.add("balloon");

		const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
		balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		balloon.style.left = Math.random() * 100 + "vw";
		balloon.style.animationDelay = (Math.random() * 1.5) + "s";

		container.appendChild(balloon);

		setTimeout(() => {
			balloon.remove();
		}, 6000);
	}, interval);

	// Stop generating new balloons after duration
	setTimeout(() => {
		clearInterval(balloonInterval);
	}, duration);
}

// Start countdown
timer = setInterval(updateCountdown, 1000);
updateCountdown();
