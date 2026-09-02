// MascotEngine.js
import gsap from 'gsap';
import { MOODS, WANDER_DIRECTIONS, MESSAGES } from './constants';

export class MascotEngine {
  constructor(refs) {
    this.refs = refs;
    
    // Core state
    this.emotion = "neutral";
    this.isSleeping = false;
    this.isHovered = false;
    this.mouseMoving = false;
    this.isSpeaking = false;

    // Call / Delay Tracking
    this.calls = {
      resetFace: null,
      mood: null,
      blink: null,
      eyeTimeout: null,
      wander: null,
      inactivity: null
    };

    // Speech & Memory Tracking
    this.speechQueue = [];
    this.lastMessageTime = 0;
    this.recentMessages = [];

    // QuickTo instances
    this.quickX = null;
    this.quickY = null;

    this.init();
  }

  init() {
    if (!this.refs.robot.current || !this.refs.cube.current) return;

    // 1. Setup quickTo for zero-allocation eye tracking
    if (this.refs.leftPupil.current && this.refs.rightPupil.current) {
      const leftX = gsap.quickTo(this.refs.leftPupil.current, "x", { duration: 0.15, ease: "power2.out" });
      const leftY = gsap.quickTo(this.refs.leftPupil.current, "y", { duration: 0.15, ease: "power2.out" });
      const rightX = gsap.quickTo(this.refs.rightPupil.current, "x", { duration: 0.15, ease: "power2.out" });
      const rightY = gsap.quickTo(this.refs.rightPupil.current, "y", { duration: 0.15, ease: "power2.out" });

      this.quickX = (val) => { leftX(val); rightX(val); };
      this.quickY = (val) => { leftY(val); rightY(val); };
    }

    // 2. Boot Sequence (Aligned to 0deg front-facing)
    this.bootTl = gsap.timeline({
      onComplete: () => {
        this.startAmbient();
        this.scheduleMood();
        this.scheduleBlink();
        this.scheduleWander();
        this.resetInactivityTimer();
      }
    });

    this.bootTl
      .fromTo(this.refs.robot.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" })
      .to(this.refs.cube.current, { rotationY: 10, rotationX: -5, duration: 0.3 })
      .to(this.refs.cube.current, { rotationY: -10, rotationX: -5, duration: 0.3 })
      .to(this.refs.cube.current, { rotationY: 0, rotationX: -5, duration: 0.3 });
  }

  startAmbient() {
    this.masterTL = gsap.timeline({ repeat: -1, yoyo: true });
    this.masterTL
      .add("float", 0)
      .to(this.refs.robot.current, { y: -8, rotationZ: 0.6, scaleY: 1.01, scaleX: 0.995, duration: 2.8, ease: "sine.inOut" }, "float")
      .to(this.refs.shadow.current, { scaleX: 0.85, opacity: 0.25, duration: 2.8, ease: "sine.inOut" }, "float");
  }

  setEmotion(newEmotion) {
    if (this.emotion === newEmotion) return;

    const map = {
      neutral: [this.refs.normalEyes.current, this.refs.mouthNeutral.current],
      happy: [this.refs.happyEyes.current, this.refs.mouthHappy.current],
      blush: [this.refs.shyEyes.current, this.refs.blushLeft.current, this.refs.blushRight.current, this.refs.mouthHappy.current],
      sleepy: [this.refs.normalEyes.current, this.refs.mouthNeutral.current]
    };

    const currentElements = map[this.emotion] || [];
    const nextElements = map[newEmotion] || [];

    gsap.to(currentElements, { opacity: 0, duration: 0.2, overwrite: "auto" });
    gsap.to(nextElements, { opacity: newEmotion === 'sleepy' ? 0.3 : 1, duration: 0.2, overwrite: "auto" });

    this.emotion = newEmotion;
  }

  clearCall(key) {
    if (this.calls[key]) {
      this.calls[key].kill();
      this.calls[key] = null;
    }
  }

  scheduleMood() {
    this.clearCall("mood");
    const runMood = () => {
      if (!this.isSleeping && !this.isHovered) {
        const rand = Math.random();
        if (rand < MOODS.CURIOUS.idleChance) {
          if (Math.random() < 0.3) this.say('neutral');
        } else if (rand < 0.5) {
          this.setEmotion("happy");
          if (this.refs.sparkle.current && Math.random() < MOODS.HAPPY.sparkleChance) {
            gsap.fromTo(this.refs.sparkle.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 0.6 });
          }
          this.clearCall("resetFace");
          this.calls.resetFace = gsap.delayedCall(2.5, () => this.setEmotion("neutral"));
        } else if (rand < 0.7) {
          this.setEmotion("blush");
          gsap.to(this.refs.cube.current, { rotationZ: MOODS.SHY.tilt, duration: 0.4, ease: "power2.out" });
          if (Math.random() < 0.5) this.say('blush');
          this.clearCall("resetFace");
          this.calls.resetFace = gsap.delayedCall(3, () => {
            this.setEmotion("neutral");
            gsap.to(this.refs.cube.current, { rotationZ: 0, duration: 0.4, ease: "power2.out" });
          });
        }
      }
      this.scheduleMood();
    };

    this.calls.mood = gsap.delayedCall(25 + Math.random() * 15, runMood);
  }

  scheduleBlink() {
    this.clearCall("blink");
    const runBlink = () => {
      if (!this.isSleeping && this.emotion !== "blush") {
        const isWink = Math.random() < 0.15;
        if (isWink && this.refs.rightPupil.current) {
          gsap.to(this.refs.rightPupil.current.parentNode, { scaleY: 0, duration: 0.1, yoyo: true, repeat: 1 });
        } else if (this.refs.leftPupil.current && this.refs.rightPupil.current) {
          gsap.to([this.refs.leftPupil.current.parentNode, this.refs.rightPupil.current.parentNode], { scaleY: 0, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "center" });
        }
      }
      this.scheduleBlink();
    };

    this.calls.blink = gsap.delayedCall(3.5 + Math.random() * 4, runBlink);
  }

  scheduleWander() {
    this.clearCall("wander");
    const runWander = () => {
      if (!this.isSleeping && !this.mouseMoving) {
        const dir = WANDER_DIRECTIONS[Math.floor(Math.random() * WANDER_DIRECTIONS.length)];
        if (this.quickX && this.quickY) {
          this.quickX(dir.x);
          this.quickY(dir.y);
        }
      }
      this.scheduleWander();
    };

    this.calls.wander = gsap.delayedCall(4 + Math.random() * 4, runWander);
  }

  updateLookAt(clientX, clientY) {
    if (this.isSleeping || !this.refs.robot.current || !this.refs.cube.current) return;

    this.mouseMoving = true;
    this.clearCall("eyeTimeout");
    this.calls.eyeTimeout = gsap.delayedCall(0.8, () => { this.mouseMoving = false; });

    const rect = this.refs.robot.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (clientX - cx) / window.innerWidth;
    const dy = (clientY - cy) / window.innerHeight;

    const x = Math.max(-5, Math.min(5, dx * 18));
    const y = Math.max(-5, Math.min(5, dy * 18));

    if (this.quickX && this.quickY) {
      this.quickX(x);
      this.quickY(y);
    }

    // Subtle natural head tilt (restricted within -12deg to +12deg)
    const headX = Math.max(-12, Math.min(12, dx * 16));
    const headY = Math.max(-10, Math.min(6, -5 + dy * 10));
    gsap.to(this.refs.cube.current, {
      rotationY: headX,
      rotationX: headY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto"
    });

    this.resetInactivityTimer();
  }

  say(type) {
    if (Date.now() - this.lastMessageTime < 4000) return;
    this.lastMessageTime = Date.now();

    let pool = MESSAGES[type] || MESSAGES.neutral;
    if (Math.random() < 0.01) pool = MESSAGES.easterEggs;
    else if (Math.random() < 0.05) pool = MESSAGES.devJokes;

    let availablePool = pool.filter(msg => !this.recentMessages.includes(msg));
    if (availablePool.length === 0) availablePool = pool;

    const msg = availablePool[Math.floor(Math.random() * availablePool.length)];
    this.recentMessages.push(msg);
    if (this.recentMessages.length > 10) this.recentMessages.shift();

    if (this.speechQueue.length >= 3) return;
    this.speechQueue.push(msg);
    this.processSpeechQueue();
  }

  processSpeechQueue() {
    if (this.isSpeaking || this.speechQueue.length === 0 || !this.refs.speechBubble.current) return;

    this.isSpeaking = true;
    const msg = this.speechQueue.shift();

    this.refs.speechBubble.current.textContent = msg;

    gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(2.5, () => {
          gsap.to(this.refs.speechBubble.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            onComplete: () => {
              if (this.refs.speechBubble.current) this.refs.speechBubble.current.textContent = "";
              this.isSpeaking = false;
              this.processSpeechQueue();
            }
          });
        });
      }
    })
    .fromTo(this.refs.speechBubble.current, 
      { opacity: 0, scale: 0.8, y: 5 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  }

  resetInactivityTimer() {
    this.clearCall("inactivity");
    if (this.isSleeping) {
      this.isSleeping = false;
      this.setEmotion("neutral");
      this.say('neutral');
      gsap.to(this.refs.robot.current, { scale: 1, duration: 0.3 });
    }

    this.calls.inactivity = gsap.delayedCall(15, () => {
      this.isSleeping = true;
      this.setEmotion("sleepy");
      this.say('sleep');
    });
  }

  handleMouseEnter() {
    this.isHovered = true;
    gsap.to(this.refs.robot.current, { scale: 1.05, duration: 0.3 });

    if (Math.random() < 0.15) {
      this.setEmotion("blush");
      this.say('blush');
      this.clearCall("resetFace");
      this.calls.resetFace = gsap.delayedCall(3, () => this.setEmotion("neutral"));
    } else {
      this.say('hover');
    }
  }

  handleMouseLeave() {
    this.isHovered = false;
    gsap.to(this.refs.robot.current, { scale: 1, duration: 0.3 });
    gsap.to(this.refs.cube.current, { rotationY: 0, rotationX: -5, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  }

  handleClick() {
    if (!this.refs.cube.current) return;

    // Wake up if sleeping and set happy face
    this.isSleeping = false;
    this.setEmotion("happy");
    if (this.refs.robot.current) {
      gsap.to(this.refs.robot.current, { scale: 1, duration: 0.2 });
    }

    this.clearCall("resetFace");
    this.calls.resetFace = gsap.delayedCall(2.5, () => this.setEmotion("neutral"));
    this.resetInactivityTimer();

    // Kill any active rotation animation on the cube to prevent mid-spin interruption
    gsap.killTweensOf(this.refs.cube.current);

    // Guaranteed 360-degree spin that always lands cleanly facing forward at rotationY: 0
    gsap.fromTo(this.refs.cube.current, 
      { rotationY: 0, rotationX: -5 },
      { 
        rotationY: 360, 
        rotationX: -5, 
        duration: 0.85, 
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(this.refs.cube.current, { rotationY: 0, rotationX: -5 });
        }
      }
    );

    this.say('click');
  }

  pause() {
    if (this.masterTL) this.masterTL.pause();
  }

  resume() {
    if (this.masterTL) this.masterTL.resume();
  }

  destroy() {
    Object.keys(this.calls).forEach(k => this.clearCall(k));
    if (this.bootTl) this.bootTl.kill();
    if (this.masterTL) this.masterTL.kill();
  }
}