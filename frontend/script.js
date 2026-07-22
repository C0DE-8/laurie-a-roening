const canvas = document.querySelector("#confetti");
const context = canvas.getContext("2d");
const card = document.querySelector("#birthdayCard");
const openCardButton = document.querySelector("#openCard");
const cardCover = document.querySelector("#cardCover");
const celebrateButton = document.querySelector("#celebrate");
const blowCandle = document.querySelector("#blowCandle");
const cake = document.querySelector("#cake");

const colors = ["#c8305d", "#f26f61", "#f7b733", "#137b7a", "#6f1739", "#fff2dc"];
let pieces = [];
let animationFrame;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function makePiece() {
  return {
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.4,
    size: 6 + Math.random() * 9,
    speed: 2 + Math.random() * 4,
    drift: -1.8 + Math.random() * 3.6,
    spin: Math.random() * Math.PI,
    spinSpeed: -0.12 + Math.random() * 0.24,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

function drawConfetti() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.spin += piece.spinSpeed;

    context.save();
    context.translate(piece.x, piece.y);
    context.rotate(piece.spin);
    context.fillStyle = piece.color;
    context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    context.restore();
  });

  pieces = pieces.filter((piece) => piece.y < window.innerHeight + 30);

  if (pieces.length > 0) {
    animationFrame = requestAnimationFrame(drawConfetti);
  } else {
    cancelAnimationFrame(animationFrame);
  }
}

function burstConfetti(amount = 140) {
  pieces = pieces.concat(Array.from({ length: amount }, makePiece));
  cancelAnimationFrame(animationFrame);
  drawConfetti();
}

function openCard() {
  card.classList.add("is-open");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  burstConfetti(90);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
openCardButton.addEventListener("click", openCard);
cardCover.addEventListener("click", openCard);
celebrateButton.addEventListener("click", () => burstConfetti(180));

blowCandle.addEventListener("click", () => {
  cake.classList.toggle("wished");
  blowCandle.textContent = cake.classList.contains("wished") ? "Wish made" : "Make a wish";
  burstConfetti(110);
});
