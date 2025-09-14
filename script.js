// script.js - Becky's Quest
document.addEventListener("DOMContentLoaded", () => {
  // --- DOM references ---
  const startBtn = document.getElementById("startBtn");
  const helpBtn = document.getElementById("helpBtn");
  const helpText = document.getElementById("helpText");

  const gameSection = document.getElementById("game");
  const introSection = document.getElementById("intro");
  const seasonEndSection = document.getElementById("seasonEnd");

  const seasonNumEl = document.getElementById("seasonNum");
  const levelNumEl = document.getElementById("levelNum");
  const scoreNumEl = document.getElementById("scoreNum");
  const progressBar = document.getElementById("progressBar");

  const characterPromptEl = document.getElementById("characterPrompt");
  const questionTextEl = document.getElementById("questionText");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const seasonResultEl = document.getElementById("seasonResult");

  const nextSeasonBtn = document.getElementById("nextSeasonBtn");
  const restartBtn = document.getElementById("restartBtn");
  const skipBtn = document.getElementById("skipBtn");
  const endSeasonBtn = document.getElementById("endSeasonBtn");

  const beckyAvatar = document.getElementById("beckyAvatar");
  const introMessageEl = document.getElementById("introMessage");

  // --- Game state ---
  let season = 1;
  let pointer = 0;   // index into seasonShuffled (0-based)
  let score = 0;
  const SEASON_SIZE = 30;

  // characters for flavor
  const characters = [
    { name: "Becky", emoji: "💙" },
    { name: "Manu", emoji: "🧢" },
    { name: "Ocean Baby", emoji: "🌊" },
    { name: "Makwins", emoji: "🎶" },
    { name: "Rusana", emoji: "✨" },
    { name: "Lorenzo", emoji: "🎩" }
  ];

  // --- Question bank (100 items) ---
  const QUESTION_BANK = [
    { q: "What is Becky's favorite color?", options: ["Blue 💙", "Red ❤️", "Green 🌱"], a: "Blue 💙" },
    { q: "Who is Becky's brother?", options: ["Manu 🧢", "Lorenzo 🎩", "Rusana ✨"], a: "Manu 🧢" },
    { q: "Which animal says 'Moo'?", options: ["Dog 🐶", "Cow 🐮", "Cat 🐱"], a: "Cow 🐮" },
    { q: "I speak without a mouth and hear without ears. What am I?", options: ["Echo", "Shadow", "Wind"], a: "Echo" },
    { q: "Which fruit is red and crunchy?", options: ["Banana 🍌", "Apple 🍎", "Grapes 🍇"], a: "Apple 🍎" },
    { q: "What is 5 + 7?", options: ["10", "12", "13"], a: "12" },
    { q: "What flies in the sky and has feathers?", options: ["Fish 🐟", "Bird 🐦", "Cow 🐮"], a: "Bird 🐦" },
    { q: "Which planet is called the Red Planet?", options: ["Mars", "Jupiter", "Venus"], a: "Mars" },
    { q: "I have keys but no locks. I have space but no room. What am I?", options: ["Piano", "Keyboard", "Map"], a: "Keyboard" },
    { q: "Which one is a musical instrument?", options: ["Drum 🥁", "Spoon 🥄", "Book 📚"], a: "Drum 🥁" },

    { q: "Which lives in the ocean?", options: ["Shark 🦈", "Lion 🦁", "Elephant 🐘"], a: "Shark 🦈" },
    { q: "How many legs does a spider have?", options: ["6", "8", "10"], a: "8" },
    { q: "Which is NOT a fruit?", options: ["Carrot 🥕", "Mango 🥭", "Orange 🍊"], a: "Carrot 🥕" },
    { q: "I am round and bright at night. What am I?", options: ["Moon 🌙", "Sun ☀️", "Star ⭐"], a: "Moon 🌙" },
    { q: "What color do you get when you mix blue and yellow?", options: ["Green", "Purple", "Orange"], a: "Green" },
    { q: "What is 9 - 4?", options: ["3", "5", "6"], a: "5" },
    { q: "Which animal says 'Woof'?", options: ["Dog 🐶", "Cat 🐱", "Sheep 🐑"], a: "Dog 🐶" },
    { q: "Which of these is a vehicle that flies?", options: ["Plane ✈️", "Boat 🚤", "Car 🚗"], a: "Plane ✈️" },
    { q: "What is the opposite of 'big'?", options: ["Tiny", "Huge", "Tall"], a: "Tiny" },
    { q: "Which object tells time?", options: ["Clock 🕰️", "Lamp 💡", "Shoe 👟"], a: "Clock 🕰️" },

    { q: "What do bees make?", options: ["Milk 🥛", "Honey 🍯", "Bread 🍞"], a: "Honey 🍯" },
    { q: "Which number is even?", options: ["7", "4", "9"], a: "4" },
    { q: "Which color is the ocean usually?", options: ["Blue 💙", "Pink 🎀", "Brown 🟤"], a: "Blue 💙" },
    { q: "What grows in the ground and is orange?", options: ["Banana", "Carrot 🥕", "Apple"], a: "Carrot 🥕" },
    { q: "I run but never walk. What am I?", options: ["River", "Clock", "Car"], a: "River" },
    { q: "Which fruit is yellow and long?", options: ["Apple", "Banana 🍌", "Grapes"], a: "Banana 🍌" },
    { q: "Which of these is a mammal?", options: ["Shark", "Dolphin", "Turtle"], a: "Dolphin" },
    { q: "What sound does a cow make?", options: ["Meow", "Moo", "Quack"], a: "Moo" },
    { q: "Which does NOT belong (colors)?", options: ["Blue", "Circle", "Green"], a: "Circle" },
    { q: "Which tool do you use to write on paper?", options: ["Spoon", "Pencil ✏️", "Fork"], a: "Pencil ✏️" },

    { q: "What season has snow in many places?", options: ["Summer", "Winter ❄️", "Autumn"], a: "Winter ❄️" },
    { q: "Which is healthy to drink?", options: ["Soda", "Water 💧", "Oil"], a: "Water 💧" },
    { q: "How many hours in a day?", options: ["12", "24", "48"], a: "24" },
    { q: "Which animal hops and has long legs?", options: ["Kangaroo 🦘", "Dog", "Cow"], a: "Kangaroo 🦘" },
    { q: "Which place has lots of sand?", options: ["Desert 🏜️", "Forest 🌳", "Lake"], a: "Desert 🏜️" },
    { q: "What is 3 × 4?", options: ["12", "10", "14"], a: "12" },
    { q: "Which one do you wear on your feet?", options: ["Hat", "Shoes 👟", "Gloves"], a: "Shoes 👟" },
    { q: "What is the name of the star at day?", options: ["Moon", "Sun ☀️", "Mars"], a: "Sun ☀️" },
    { q: "Which insect makes a buzzing sound?", options: ["Mouse", "Bee 🐝", "Snake"], a: "Bee 🐝" },
    { q: "Which animal lives on a farm and gives milk?", options: ["Horse", "Cow 🐮", "Eagle"], a: "Cow 🐮" },

    { q: "Riddle: I have a face and hands but no arms. What am I?", options: ["Clock", "Tree", "Car"], a: "Clock" },
    { q: "Which shape has 3 sides?", options: ["Square", "Triangle", "Circle"], a: "Triangle" },
    { q: "What is 7 + 6?", options: ["13", "12", "14"], a: "13" },
    { q: "Which is a sweet fruit with spiky skin?", options: ["Pineapple 🍍", "Tomato", "Potato"], a: "Pineapple 🍍" },
    { q: "Which animal lives in a hole and is small?", options: ["Rabbit 🐰", "Elephant", "Shark"], a: "Rabbit 🐰" },
    { q: "Which one can you eat?", options: ["Rock", "Bread 🍞", "Paper"], a: "Bread 🍞" },
    { q: "What color are most leaves?", options: ["Blue", "Green 🌿", "Black"], a: "Green 🌿" },
    { q: "Which vehicle sails on water?", options: ["Boat 🚤", "Car 🚗", "Plane ✈️"], a: "Boat 🚤" },
    { q: "Which animal has a long trunk?", options: ["Elephant 🐘", "Cat", "Duck"], a: "Elephant 🐘" },
    { q: "Which instrument has keys and sounds sweet?", options: ["Piano 🎹", "Spoon", "Brush"], a: "Piano 🎹" },

    { q: "Riddle: The more you take, the more you leave behind. What are they?", options: ["Footsteps", "Coins", "Books"], a: "Footsteps" },
    { q: "Which is used to cut paper?", options: ["Scissors ✂️", "Spoon", "Fork"], a: "Scissors ✂️" },
    { q: "Which fruit is sour and green?", options: ["Lemon 🍋", "Banana", "Apple"], a: "Lemon 🍋" },
    { q: "Which number comes after 19?", options: ["20", "18", "21"], a: "20" },
    { q: "Which animal says 'Neigh'?", options: ["Horse 🐴", "Sheep 🐑", "Pig 🐷"], a: "Horse 🐴" },
    { q: "Which of these is a color of the rainbow?", options: ["Turquoise", "Cyan", "Violet"], a: "Violet" },
    { q: "Riddle: I have teeth but cannot bite. What am I?", options: ["Comb", "Dog", "Lemon"], a: "Comb" },
    { q: "What do you use to see far away?", options: ["Binoculars 🔭", "Spoon", "Socks"], a: "Binoculars 🔭" },
    { q: "Which animal is known for its stripes?", options: ["Tiger 🐯", "Giraffe 🦒", "Elephant"], a: "Tiger 🐯" },
    { q: "What grows on trees and you can eat?", options: ["Stones", "Fruits 🍎", "Rocks"], a: "Fruits 🍎" },

    { q: "Which day comes after Monday?", options: ["Sunday", "Tuesday", "Friday"], a: "Tuesday" },
    { q: "Which of these is water in frozen form?", options: ["Steam", "Ice ❄️", "Rain"], a: "Ice ❄️" },
    { q: "Which machine washes clothes?", options: ["Fridge", "Washing Machine", "TV"], a: "Washing Machine" },
    { q: "Riddle: I can be cracked, made, told, and played. What am I?", options: ["Joke", "Egg", "Window"], a: "Joke" },
    { q: "Which animal has a pouch?", options: ["Kangaroo 🦘", "Giraffe", "Sheep"], a: "Kangaroo 🦘" },
    { q: "Which is a tasty red berry?", options: ["Strawberry 🍓", "Banana", "Apple"], a: "Strawberry 🍓" },
    { q: "What tool do painters use to paint walls?", options: ["Brush", "Spoon", "Hammer"], a: "Brush" },
    { q: "Which sport uses a ball and a hoop?", options: ["Soccer", "Basketball 🏀", "Swimming"], a: "Basketball 🏀" },
    { q: "Which helps you hear well?", options: ["Ears 👂", "Eyes 👀", "Nose 👃"], a: "Ears 👂" },
    { q: "Which is a small, flightless bird?", options: ["Ostrich 🐦", "Eagle", "Albatross"], a: "Ostrich 🐦" }
  ];

  // season-specific shuffled questions and pointer
  let seasonShuffled = [];

  // utility functions
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickCharacterForPrompt() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function normalizeText(s) {
    return (s || "").toString().replace(/\uFE0F/g, "").trim();
  }

  function generateConfettiHTML(){
    const colors = ["#ff4d6d","#ffd166","#7bed9f","#00d2ff","#a29bfe"];
    let html = "";
    for(let i=0;i<8;i++){
      const c = colors[i % colors.length];
      html += `<span style="background:${c}; animation-delay:${Math.random()*300}ms"></span>`;
    }
    return html;
  }

  // UI feedback
  function showFeedbackHappy(text) {
    feedbackEl.innerHTML = `
      <div class="happy-bounce" style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:28px">😀</div>
        <div style="text-align:left">${text}</div>
      </div>
      <div class="confetti">${generateConfettiHTML()}</div>
    `;
  }

  function showFeedbackSad(text) {
    feedbackEl.innerHTML = `
      <div class="bad-shake" style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:28px">😢</div>
        <div style="text-align:left">${text}</div>
      </div>
    `;
  }

  // update header / progress
  function updateHeaderUi() {
    seasonNumEl.innerText = season;
    levelNumEl.innerText = Math.min(pointer + 1, SEASON_SIZE);
    scoreNumEl.innerText = score;
    const percent = Math.round(((pointer) / SEASON_SIZE) * 100);
    progressBar.style.width = `${Math.min(100, percent)}%`;
  }

  function renderOptions(options, correct) {
    optionsEl.innerHTML = "";
    const shuffledOpts = shuffleArray(options);
    shuffledOpts.forEach(opt => {
      const btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.className = "opt-btn";
      btn.innerText = opt;
      btn.addEventListener("click", () => handleAnswer(btn.innerText, correct));
      optionsEl.appendChild(btn);
    });
  }

  // typing intro logic
  const introLines = [
    "Hey! My name is Becky 💙",
    "Today I want you to join me on a big adventure!",
    "My brother Manu and my friends Ocean Baby, Makwins, Rusana and Lorenzo will give you puzzles and fun riddles.",
    "Tap Play to start with me — let's have fun!"
  ];

  function typeLine(element, line, delay = 28) {
    return new Promise(resolve => {
      element.innerHTML = "";
      let i = 0;
      const timer = setInterval(() => {
        element.innerHTML += line.charAt(i);
        i++;
        if (i >= line.length) {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  }

  async function playIntroTyping() {
    // visually show avatar bouncing while typing
    if (beckyAvatar) beckyAvatar.classList.add("idle-bounce");
    for (let i = 0; i < introLines.length; i++) {
      await typeLine(introMessageEl, introLines[i], 28);
      // small pause, then a blank line
      await new Promise(r => setTimeout(r, 420));
      introMessageEl.innerHTML += "<br>";
    }
    if (beckyAvatar) beckyAvatar.classList.remove("idle-bounce");
    // enable play button
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.classList.remove("disabled");
      startBtn.classList.add("btn-primary-pulse");
      startBtn.setAttribute("aria-disabled", "false");
    }
  }

  // core flow
  function startSeason() {
    // pick a fresh set of questions for the season
    const pool = shuffleArray(QUESTION_BANK);
    seasonShuffled = pool.slice(0, Math.min(SEASON_SIZE, pool.length));
    pointer = 0;
    score = 0;
    seasonNumEl.innerText = season;
    introSection.hidden = true;
    seasonEndSection.hidden = true;
    gameSection.hidden = false;
    updateHeaderUi();
    loadCurrentQuestion();
  }

  function loadCurrentQuestion() {
    try {
      feedbackEl.innerHTML = "";
      updateHeaderUi();

      if (!seasonShuffled || pointer >= seasonShuffled.length) {
        finishSeason();
        return;
      }

      const qObj = seasonShuffled[pointer];
      const char = pickCharacterForPrompt();
      characterPromptEl.innerText = `${char.emoji} ${char.name} asks:`;
      questionTextEl.innerText = qObj.q;

      renderOptions(qObj.options, qObj.a);
    } catch (err) {
      console.error("loadCurrentQuestion error:", err);
    }
  }

  function disableOptionButtons(state = true) {
    [...optionsEl.querySelectorAll("button")].forEach(b => b.disabled = state);
  }

  function handleAnswer(selected, correct) {
    disableOptionButtons(true);
    const selNorm = normalizeText(selected);
    const corNorm = normalizeText(correct);

    if (selNorm === corNorm) {
      score++;
      showFeedbackHappy(`Becky cheers: "Woohoo! That's right — Becky loves it!"`);
    } else {
      showFeedbackSad(`Manu teases: "Oops — not quite. Keep going!"`);
    }

    setTimeout(() => {
      pointer++;
      // Level-up little note every 10 questions (only while playing)
      if ((pointer) > 0 && (pointer) % 10 === 0 && pointer < seasonShuffled.length) {
        feedbackEl.innerHTML += `<div style="margin-top:8px;color:#05426a;font-weight:700">🎯 Level Up! Becky claps for you!</div>`;
      }
      updateHeaderUi();

      if (pointer >= seasonShuffled.length) {
        finishSeason();
      } else {
        loadCurrentQuestion();
      }
    }, 900);
  }

  function finishSeason() {
    gameSection.hidden = true;
    seasonEndSection.hidden = false;
    seasonResultEl.innerText = `You scored ${score}/${seasonShuffled.length} in Season ${season}.`;
  }

  function nextSeason() {
    season++;
    startSeason();
  }

  function restartSeason() {
    startSeason();
  }

  function skipQuestion() {
    pointer++;
    if (pointer >= seasonShuffled.length) finishSeason();
    else loadCurrentQuestion();
  }

  function endSeasonEarly() {
    finishSeason();
  }

  // --- Wire up buttons ---
  startBtn && startBtn.addEventListener("click", () => {
    // prevent starting while disabled
    if (startBtn.disabled) return;
    // remove pulse so it doesn't distract during game
    startBtn.classList.remove("btn-primary-pulse");
    startSeason();
  });
  helpBtn && helpBtn.addEventListener("click", () => helpText.hidden = !helpText.hidden);
  nextSeasonBtn && nextSeasonBtn.addEventListener("click", nextSeason);
  restartBtn && restartBtn.addEventListener("click", restartSeason);
  skipBtn && skipBtn.addEventListener("click", skipQuestion);
  endSeasonBtn && endSeasonBtn.addEventListener("click", endSeasonEarly);

  // init UI
  (function init(){
    seasonNumEl.innerText = season;
    levelNumEl.innerText = 1;
    scoreNumEl.innerText = 0;
    progressBar.style.width = `0%`;
    // keep intro visible at start
    introSection.hidden = false;
    gameSection.hidden = true;
    seasonEndSection.hidden = true;

    // disable start until intro is typed
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.classList.add("disabled");
      startBtn.setAttribute("aria-disabled", "true");
    }

    // start intro typing animation
    playIntroTyping();
  })();

}); // DOMContentLoaded
