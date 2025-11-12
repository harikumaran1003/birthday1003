/* ------------ MUSIC ------------ */
const welcomeMusic = new Audio("assets/surprise-music.mp3");
welcomeMusic.loop = true;
const storyMusic = new Audio("assets/story-music.mp3");
storyMusic.loop = true;
const cakeMusic = new Audio("assets/cake-music.mp3");
const wishesMusic = new Audio("assets/welcome-music.mp3");
wishesMusic.loop = true;
const surpriseMusic = new Audio("assets/story-music.mp3");
surpriseMusic.loop = true;
const birthdayWishMusic = new Audio("assets/wishes-music.mp3");

let currentScene = 0, currentGiftIndex = 0, currentSlideIndex = 1;
let particles = [];

window.addEventListener("DOMContentLoaded", showCountdownScreen);

/* ------------ COUNTDOWN ------------ */
function showCountdownScreen(){
  const c=document.getElementById("story-container");
  c.innerHTML=`
    <div class="countdown-screen">
      <h1 class="countdown-title">🎉 Countdown To Ur Special Day 💖</h1>
      <div id="countdown" class="countdown-timer">Loading...</div>
      <button class="skip-btn" onclick="showWelcomeScreen()">Skip ⏩</button>
    </div>`;
  createFloatingHearts();fireworksInit();
  const target=new Date("November 14, 2025 00:00:00").getTime();
  const t=setInterval(()=>{
    const now=new Date().getTime(),diff=target-now;
    if(diff<=0){clearInterval(t);startBirthdayShow();return;}
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m=Math.floor((diff%(1000*60*60))/(1000*60));
    const s=Math.floor((diff%(1000*60))/1000);
    document.getElementById("countdown").innerHTML=`${d}D ${h}H ${m}M ${s}S`;
  },1000);
}

/* -------------------------------------------------------------
   FLOATING HEARTS (Pink + White)
------------------------------------------------------------- */
function createFloatingHearts() {
  const screen = document.querySelector(".countdown-screen");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";

    // Randomly pick pink or white heart
    heart.textContent = Math.random() > 0.5 ? "💖" : "🤍";

    // Random position & style
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = 4 + Math.random() * 4 + "s";
    heart.style.fontSize = 15 + Math.random() * 25 + "px";
    heart.style.opacity = 0.7 + Math.random() * 0.3;

    // Append & remove
    screen.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 400);
}

/* ------------ FIREWORKS ------------ */
let fireworksCanvas,ctx;
function fireworksInit(){
  fireworksCanvas=document.getElementById("fireworks");
  ctx=fireworksCanvas.getContext("2d");
  resizeCanvas();window.addEventListener("resize",resizeCanvas);
  animateFireworks();
}
function resizeCanvas(){
  fireworksCanvas.width=window.innerWidth;
  fireworksCanvas.height=window.innerHeight;
}
function animateFireworks(){
  ctx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx;p.y+=p.vy;p.alpha-=.015;
    if(p.alpha<=0)particles.splice(i,1);else drawParticle(p);
  });
  requestAnimationFrame(animateFireworks);
}
function drawParticle(p){
  ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;
  ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;
}
function launchFirework(x,y){
  for(let i=0;i<100;i++){
    particles.push({x,y,vx:Math.random()*6-3,vy:Math.random()*6-3,
      size:Math.random()*3+1,color:`hsl(${Math.random()*360},100%,70%)`,alpha:1});
  }
}

/* ------------ MIDNIGHT SHOW ------------ */
function startBirthdayShow(){
  const c=document.getElementById("story-container");
  let fireTimer=setInterval(()=>{
    launchFirework(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5));
  },250);
  c.innerHTML=`
  <div class="countdown-screen">
    <h1 class="countdown-title">🎂 HAPPY BIRTHDAY MY DEAREST!!💐💖</h1>
    <p class="countdown-timer" style="font-size:1rem;">sorry for not being with you on your Big day🫂</p>
  </div>`;
  stopAllMusic();
  
  birthdayWishMusic.currentTime=0;
  birthdayWishMusic.play();
  birthdayWishMusic.onended=()=>{clearInterval(fireTimer);showWelcomeScreen();};
}

/* ------------ WELCOME ------------ */
function showWelcomeScreen(){
  stopAllMusic();welcomeMusic.play();
  const c=document.getElementById("story-container");
  c.innerHTML=`
  <div class="welcome-grid">
    <h1 class="welcome-title">Love_of_us💖</h1>
    <p class="welcome-subtitle">CLICK_BELOW✨</p>
    <div class="button-img-grid">
      <div class="image-btn" onclick="startStory()"><img src="assets/btn1.gif"><p>Story</p></div>
      <div class="image-btn" onclick="viewMemories()"><img src="assets/btn2.gif"><p>Memories</p></div>
      <div class="image-btn" onclick="showWishes()"><img src="assets/btn3.gif"><p>Wishes</p></div>
      <div class="image-btn" onclick="showSurprise()"><img src="assets/btn4.gif"><p>Surprise</p></div>
    </div>
  </div>`;
}

/* ------------ STORY ------------ */
const storyScenes=[
  {img:"assets/boy-driving.png",text:"This is how I wana celebrate Today💕"},
  {img:"assets/boy-driving.png",text:"A boy was driving all night... just to see the one he loves 💕"},
  {img:"assets/girl-waiting.png",text:"She waits at the bus stop, hoping he'll arrive soon 🥺"},
  {img:"assets/car-horn.png",text:"He horns to catch her attention 🚗🔊"},
  {img:"assets/hug.png",text:"She sees him and runs right into his arms 🤗💞"},
  {img:"assets/car-driving.png",text:"Hand in hand, they drive off into the night..."},
  {img:"assets/beach.png",text:"They reach a beach under the moonlight ✨"},
  {img:"assets/cake-before.png",text:"It's midnight... time to cut the cake 🎂",isCakeScene:true},
  {img:"assets/cake-after.png",text:"Happy Birthday, my love 💖🎉"},
  {img:"assets/cake.png",text:"They both are enjoying her day with happyface🎉"},
  {img:"assets/cake1.png",text:"They both are enjoying her day with happyface🎉"}
];
function startStory(){stopAllMusic();storyMusic.play();currentScene=0;loadScene();}
function loadScene() {
  const c = document.getElementById("story-container");
  const s = storyScenes[currentScene];
  c.innerHTML = `
    <div class="story-scene">
      <img src="${s.img}" alt="Story Scene">
      <p>${s.text}</p>
      <button onclick="nextScene()">Next ➜</button>
    </div>
  `;
  if (s.isCakeScene) setTimeout(playCakeMusic, 500);
}

function nextScene(){
  currentScene++;
  if(currentScene<storyScenes.length)loadScene();else endExperience();
}
function playCakeMusic(){
  storyMusic.pause();cakeMusic.currentTime=0;cakeMusic.play();
  cakeMusic.onended=()=>storyMusic.play();
}

/* ------------ MEMORIES ------------ */
function viewMemories(){
  stopAllMusic();storyMusic.play();
  const c=document.getElementById("story-container");
  c.innerHTML = `
  <h2 style="text-align:center;">Our Memories Together 📸</h2>
  <div class="slideshow-container">
    ${Array.from({length:12},(_,i)=>`
      <div class="mySlide fade">
        <img src="assets/memory${i+1}.jpg"><div class="caption">Memory #${i+1} 💗</div>
      </div>`).join("")}
    <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
    <a class="next" onclick="changeSlide(1)">&#10095;</a>
  </div><button onclick="endExperience()">Finish</button>`;
  showSlide(currentSlideIndex);
}
function changeSlide(n){showSlide(currentSlideIndex+=n);}
function showSlide(i){
  const s=document.getElementsByClassName("mySlide");
  if(i>s.length)currentSlideIndex=1;
  if(i<1)currentSlideIndex=s.length;
  Array.from(s).forEach(x=>x.style.display="none");
  s[currentSlideIndex-1].style.display="block";
}

/* ------------ WISHES ------------ */
const giftMessages=[
  "You're the only girl who made me fell for u again & again💖","Your smile is my sunshine ☀️",
  "my heart feels at home when I’m with you🌷","You light up my whole heart  ✨",
  "annoying u is my favt routine💕","Every moment with you is precious💫",
  "You’re the best gift life gave me🎁 please be with me 4vr😘","My day is nothing without your call💞",
  "I miss you more every day💗","You’re not just my love — you’re my peace, my happiness, my everything ❤️"
];
function showWishes(){
  stopAllMusic();wishesMusic.play();currentGiftIndex=0;
  const c=document.getElementById("story-container");
  c.innerHTML = `
  <h2 style="color:#ff94c6;margin-bottom:20px;">Pick a Gift 🎁</h2>
  <div id="gift-grid" class="gift-grid">
    ${Array.from({ length: 10 }, () => `<div class="gift-box" onclick="startGiftSequence()"><img src="assets/gift-box.gif"></div>`).join("")}
  </div>
  <button onclick="endExperience()">Back to Home</button>
`;
}

function startGiftSequence(){openGiftSequentially();}
function openGiftSequentially(){
  const c=document.getElementById("story-container");
  c.innerHTML=`<div class="fullscreen-gift"><img src="assets/gift-box.gif" class="zoom-gift" id="giftZoom"></div>`;
  setTimeout(()=>{
    document.getElementById("giftZoom").classList.add("blast");
    confetti({particleCount:200,spread:120,origin:{y:.6}});
    setTimeout(()=>{
      const last=currentGiftIndex===9;
      c.innerHTML=`
      <div class="message-box">
        <h2 class="gift-message">${giftMessages[currentGiftIndex]}</h2>
        ${last?`<img src="assets/romantic.gif" class="love-gif glow-in"><button onclick="endExperience()">Back to Home</button>`:`<button onclick="nextGift()">Next Gift 🎁</button>`}
      </div>`;
      if(last)launchGlowHearts();
    },800);
  },600);
}
function nextGift(){currentGiftIndex++;openGiftSequentially();}
function launchGlowHearts(){
  for(let i=0;i<40;i++){
    const h=document.createElement("div");
    h.innerText="💖";h.className="glow-heart";
    h.style.left=window.innerWidth/2+"px";h.style.top=window.innerHeight/2+"px";
    document.body.appendChild(h);
    setTimeout(()=>{
      h.style.transform=`translate(${(Math.random()-.5)*800}px,${(Math.random()-.5)*600}px)`;
      h.style.opacity="0";
    },50);
    setTimeout(()=>h.remove(),2000);
  }
}

/* ------------ SURPRISE PAGE: THIS OR THAT GAME (Centered & Boxed) ------------ */

const thisOrThatQuestions = [
  { q: "Cute fights 💢 or Sweet moments 💕?", a: "Cute fights", b: "Sweet moments" },
  { q: "Beach 🌊 or Hills 🌄?", a: "Beach", b: "Hills" },
  { q: "Movies 🎬 or Music 🎵?", a: "Movies", b: "Music" },
  { q: "Holding hands 💞 or Cuddling 🤍?", a: "Holding hands", b: "cuddling" },
  { q: "Hug 🤗 or Kiss 😘?", a: "Hug", b: "Kiss" },
  { q: "Morning texts 🌅 or Late-night talks 🌙?", a: "Texts", b: "Talks" },
  { q: "Our first meet 💫 or Our first call 📞?", a: "Meet", b: "Call" },
  { q: "Phone 📱 or Letters 💌?", a: "Phone", b: "Letters" },
  { q: "Me annoying you 😜 or Me missing you 😔?", a: "annoying", b: "missing" },
  { q: "Forever with me? 💍", a: "Yes 💖", b: "Of course 💞" }
];

let currentQ = 0;

function showSurprise() {
  stopAllMusic();
  surpriseMusic.play();
  const c = document.getElementById("story-container");
  c.innerHTML = `
    <div class="surprise-game">
      <h2 class="countdown-title">💝 This or That 💝</h2>
      <div id="gameContent" class="game-content"></div>
    </div>
  `;
  currentQ = 0;
  showQuestion();
}

function showQuestion() {
  const q = thisOrThatQuestions[currentQ];
  const g = document.getElementById("gameContent");

  g.innerHTML = `
    <div class="question-card pop-in">
      <h3 class="question">${q.q}</h3>
      <div class="options">
        <button class="choice" onclick="nextQuestion('${q.a}')">${q.a}</button>
        <button class="choice" onclick="nextQuestion('${q.b}')">${q.b}</button>
      </div>
    </div>
  `;
}

function nextQuestion(answer) {
  confetti({ particleCount: 100, spread: 100, origin: { y: 0.7 } });
  currentQ++;
  if (currentQ < thisOrThatQuestions.length) {
    showQuestion();
  } else {
    showFinalSurprise();
  }
}

function showFinalSurprise() {
  const g = document.getElementById("gameContent");
  g.innerHTML = `
    <div class="final-surprise-box pop-in">
      <h2>💌 Your Result 💌</h2>
      <p>You picked every choice with lovely smile💋</p>
      <p>And guess what... you’ve won the best gift ever in ur life 🎁</p>
      <button class="finish-btn" onclick="showGiftReveal()">Finish</button>
    </div>
  `;
  confetti({ particleCount: 250, spread: 180 });
  launchGlowHearts();
}

function showGiftReveal() {
  const g = document.getElementById("gameContent");
  let fireTimer=setInterval(()=>{
    launchFirework(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5));
  },250);
  g.innerHTML = `
    <div class="gift-reveal">
      <h2 class="gift-title">🎁 Your Special Gift 🎁</h2>
      <img src="assets/gift-box.gif" class="gift-box-img" id="finalGiftBox" />
    </div>
  `;

  const gift = document.getElementById("finalGiftBox");
  gift.onclick = () => {
    gift.classList.add("open-blast");
    confetti({ particleCount: 500, spread: 200, origin: { y: 0.7 } });
    setTimeout(() => {
      g.innerHTML = `
        <div class="congrats-box pop-in">
          <h2>🎉 Congrats! 🎉</h2>
          <p>You’ve got <b>#HARI🤍</b> as your Birthday gift 💖</p>
          <button onclick="endExperience()">Back to Home</button>
        </div>
      `;
      launchGlowHearts();
    }, 1200);
  };
}


/* ------------ UTILITIES ------------ */
function endExperience(){stopAllMusic();showWelcomeScreen();}
function stopAllMusic(){
  [welcomeMusic,storyMusic,cakeMusic,wishesMusic,surpriseMusic,birthdayWishMusic].forEach(m=>{
    m.pause();m.currentTime=0;
  });
}

