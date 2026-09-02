// constants.js
export const MOODS = {
  CURIOUS: { idleChance: 0.4, lookSpeed: 1.2 },
  HAPPY: { sparkleChance: 0.5, bounce: true },
  SLEEPY: { blinkRate: 0.1, slowFloat: true },
  EXCITED: { spinChance: 0.4, fastFloat: true },
  FOCUSED: { steadyEyes: true },
  SHY: { blushChance: 0.6, tilt: -6 }
};

export const WANDER_DIRECTIONS = [
  { x: -4, y: -2 }, // look up-left
  { x: 4, y: 2 },   // look down-right
  { x: 0, y: 4 },   // look down
  { x: 0, y: 0 }    // center
];

export const MESSAGES = {
  neutral: [
    "Hello there 👋", "Building something?", "Need a teammate?", "I like clean code.",
    "Still debugging? 😅", "Coffee.exe running...", "Systems nominal.", "Waiting for hackers...",
    "Have you pushed to Git?", "Ready when you are.", "Build. Break. Learn.",
    "Hello, future engineer!", "Need a coding buddy?", "Hackathons await 🚀", "Coffee > Bugs ☕"
  ],
  happy: [
    "Nice! 🚀", "That was awesome!", "Let's build!", "You're doing great!", "Mission complete!"
  ],
  think: [
    "...", "Compiling ideas...", "Thinking...", "Calculating...", "Optimizing...", "Hmm..."
  ],
  sleep: [
    "Zzz...", "Wake me up...", "Dreaming in JavaScript...", "Charging batteries...", "Low power mode..."
  ],
  hover: [
    "Hi! 👀", "You found me!", "Don't poke me 😂", "Need something?", "Hey developer!"
  ],
  click: [
    "^_^", "That tickles!", "Woohoo!", "Again! Again!", "Spinning...", "Yay! 🎉"
  ],
  blush: [
    "H-hi! 😊", "You noticed me...", "Hehe...", "You're back!", "Nice to see you!", "👉👈"
  ],
  devJokes: [
    "99 little bugs in the code...", "Works on my machine.", "Deploying courage...",
    "Semicolon located.", "404 Motivation Not Found.", "Infinite loop detected."
  ],
  easterEggs: [
    "The cake is a lie.", "Never gonna give you up.", "sudo make me awesome"
  ]
};