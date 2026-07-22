const canvas = document.querySelector("#confetti");
const context = canvas.getContext("2d");
const card = document.querySelector("#birthdayCard");
const openCardButton = document.querySelector("#openCard");
const cardCover = document.querySelector("#cardCover");
const bookFlips = Array.from(document.querySelectorAll(".book-flip"));
const prevPageButton = document.querySelector("#prevPage");
const nextPageButton = document.querySelector("#nextPage");
const pageStatus = document.querySelector("#pageStatus");
const celebrateButton = document.querySelector("#celebrate");
const blowCandle = document.querySelector("#blowCandle");
const cake = document.querySelector("#cake");

const colors = ["#c8305d", "#f26f61", "#f7b733", "#137b7a", "#6f1739", "#fff2dc"];
let pieces = [];
let animationFrame;
let bookPage = 0;

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

function updateBook() {
  bookFlips.forEach((flip, index) => {
    flip.classList.toggle("is-flipped", index < bookPage);
    flip.style.zIndex = index < bookPage ? index + 1 : bookFlips.length + 2 - index;
  });

  card.classList.toggle("is-open", bookPage > 0);
  prevPageButton.disabled = bookPage === 0;
  nextPageButton.disabled = bookPage === bookFlips.length;
  pageStatus.textContent = bookPage === 0 ? "Tap right side to open" : `Page ${bookPage} of ${bookFlips.length}`;
}

function setBookPage(nextPage, options = {}) {
  const clampedPage = Math.max(0, Math.min(bookFlips.length, nextPage));
  const didAdvance = clampedPage > bookPage;
  bookPage = clampedPage;
  updateBook();
  card.scrollIntoView({ behavior: options.instant ? "auto" : "smooth", block: "start" });

  if (didAdvance && !options.quiet) {
    burstConfetti(70);
  }
}

function openCard(options = {}) {
  setBookPage(Math.max(1, bookPage), options);
}

resizeCanvas();
updateBook();

window.addEventListener("resize", resizeCanvas);
openCardButton.addEventListener("click", openCard);
cardCover.addEventListener("click", (event) => {
  event.stopPropagation();
  setBookPage(bookPage + 1);
});
prevPageButton.addEventListener("click", () => setBookPage(bookPage - 1, { quiet: true }));
nextPageButton.addEventListener("click", () => setBookPage(bookPage + 1));
celebrateButton.addEventListener("click", () => burstConfetti(180));

blowCandle.addEventListener("click", () => {
  cake.classList.toggle("wished");
  blowCandle.textContent = cake.classList.contains("wished") ? "Wish made" : "Make a wish";
  burstConfetti(110);
});

if (window.location.hash === "#card") {
  window.requestAnimationFrame(() => openCard({ instant: true, quiet: true }));
}
