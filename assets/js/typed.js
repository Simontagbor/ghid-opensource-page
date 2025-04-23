document.addEventListener("DOMContentLoaded", function() {
    var options = {
        strings: [
            "Just Curious :) ?",
            "a Developer ?",
            "an AI Specialist ?",
            "a Systems Architect ?",
            "an Industry Expert ?",
            "a UI/UX Designer ?",
            "an Illustrator ?",
            "a Web Developer ?",
            "an Educator ?",
            "a Writer ?",
            "a Storyteller ?",
            "a Social Media Specialist ?",
            "a Data Scientist ?",
            "a Legal Practioner ?",
            "a Photographer ?",
            "a Doctor ?",
            "a Historian ?",
            "a Scientist ?",
            "a Researcher ?",
            "a Journalist ?",
            "a Patron ?",
            "a Civil Servant ?",
            "an Artist ?",
            "a Designer ?",
            "a Writer ?",
            "a Musician ?",
            "a Media Specialist ?",
            "a Software Engineer ?",
            "a Student ?",
            "an Ally from the Diaspora ?",
            "a VOLUNTEER ?",
            "an ACTIVIST ?",
            "a True PATRIOT ?",
            "a GHANAIAN ?",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    };

    var typed = new Typed("#typed-text", options);
});

// hover effect text
document.querySelectorAll('.highlight-target').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const rect = el.getBoundingClientRect();
      const fromLeft = e.clientX - rect.left < rect.width / 2;
      el.classList.add('hovered');
      el.classList.remove('hover-direction-left', 'hover-direction-right');
      el.classList.add(fromLeft ? 'hover-direction-left' : 'hover-direction-right');
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('hovered', 'hover-direction-left', 'hover-direction-right');
    });
  });

// //   hover micro interaction on image hover
// const img = document.querySelector('.balancing-img');
// let lastScrollY = window.scrollY;
// let velocity = 0;
// let rotation = 0;
// let targetRotation = 0;
// let scrollTimeout = null;
// let wobbleTime = 0;

// function easeOutSine(t) {
//   return Math.sin((t * Math.PI) / 2);
// }

// function updatePhysics() {
//   const scrollY = window.scrollY;
//   const delta = scrollY - lastScrollY;

//   if (delta !== 0) {
//     velocity += delta * 0.002;       // Feed scroll into velocity
//     targetRotation = rotation + velocity;
//     wobbleTime = 0; // cancel any wobble if new scroll happens

//     clearTimeout(scrollTimeout);
//     scrollTimeout = setTimeout(() => {
//       wobbleTime = 0.01; // start wobble when scroll stops
//     }, 100);
//   }

//   velocity *= 0.85;
//   rotation += (targetRotation - rotation) * 0.2;

//   // Clamp rotation to ±10deg
//   rotation = Math.max(Math.min(rotation, 10), -10);
//   img.style.transform = `rotate(${rotation}deg)`;
//   const shadow = document.querySelector('.balancing-shadow');
//   const stretch = 1 + Math.abs(rotation) / 40; // wider with more tilt
//   const squash = 1 - Math.abs(rotation) / 60;  // flatter with more tilt
//   shadow.style.transform = `translateX(-50%) scaleX(${stretch}) scaleY(${squash})`;

//   // Wobble effect
//   if (wobbleTime > 0) {
//     const wobbleMax = 1;
//     const wobbleDecay = 0.05;
//     const wobble = Math.sin(wobbleTime * 12) * easeOutSine(1 - wobbleTime) * wobbleMax;
//     img.style.transform = `rotate(${wobble}deg)`;
//     wobbleTime += wobbleDecay;

//     if (wobbleTime >= 1) {
//       wobbleTime = 0;
//       rotation = 0;
//       targetRotation = 0;
//       velocity = 0;
//     }
//   }

//   lastScrollY = scrollY;
//   requestAnimationFrame(updatePhysics);
// }

// updatePhysics();
// img.style.transform = `rotate(${rotation}deg)`;

// version 2
// hover micro interaction on image hover
const img = document.querySelector('.balancing-img');
let lastScrollY = window.scrollY;
let velocity = 0;
let rotation = 0;
let targetRotation = 0;
let targetY = 0; // Target vertical position
let currentY = 0; // Current vertical position
let scrollTimeout = null;
let wobbleTime = 0;

function easeOutSine(t) {
  return Math.sin((t * Math.PI) / 2);
}

function updatePhysics() {
  const scrollY = window.scrollY;
  const delta = scrollY - lastScrollY;

  if (delta !== 0) {
    velocity += delta * 0.002; // Feed scroll into velocity
    targetRotation = rotation + velocity;
    targetY -= delta * 0.1; // Move up slightly on scroll up
    wobbleTime = 0; // Cancel any wobble if new scroll happens

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      wobbleTime = 0.01; // Start wobble when scroll stops
    }, 100);
  }

  velocity *= 0.85;
  rotation += (targetRotation - rotation) * 0.2;

  // Clamp rotation to ±10deg
  rotation = Math.max(Math.min(rotation, 10), -10);

  // Smoothly settle the vertical position
  currentY += (targetY - currentY) * 0.2;

  // Apply transformations
  img.style.transform = `rotate(${rotation}deg) translateY(${currentY}px)`;

  const shadow = document.querySelector('.balancing-shadow');
  const stretch = 1 + Math.abs(rotation) / 40; // Wider with more tilt
  const squash = 1 - Math.abs(rotation) / 60; // Flatter with more tilt
  shadow.style.transform = `translateX(-50%) scaleX(${stretch}) scaleY(${squash})`;

  // Wobble effect
  if (wobbleTime > 0) {
    const wobbleMax = 1;
    const wobbleDecay = 0.05;
    const wobble = Math.sin(wobbleTime * 12) * easeOutSine(1 - wobbleTime) * wobbleMax;
    img.style.transform = `rotate(${rotation + wobble}deg) translateY(${currentY}px)`;
    wobbleTime += wobbleDecay;

    if (wobbleTime >= 1) {
      wobbleTime = 0;
      rotation = 0;
      targetRotation = 0;
      velocity = 0;
    }
  }

  lastScrollY = scrollY;
  requestAnimationFrame(updatePhysics);
}

updatePhysics();
