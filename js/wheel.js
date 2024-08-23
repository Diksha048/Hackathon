const sectors = [
  { color: "#2B7A78", text: "#333333", label: "10 push-ups" },
  { color: "#b3e6e5", text: "#333333", label: "Watch a video”" },
  { color: "#2B7A78", text: "#333333", label: "grab a snack" },
  { color: "#b3e6e5", text: "#333333", label: "Dance Break" },
  { color: "#2B7A78", text: "#333333", label: "Study Rap" },
  { color: "#b3e6e5", text: "#333333", label: "You lose" },
  { color: "#2B7A78", text: "#333333", label: "Prize draw"},
  { color: "#b3e6e5", text: "#333333", label: "Sweets" },
  ];
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  };
  
  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
  
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  
  let spinButtonClicked = false;
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
  
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 20px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
  
    ctx.restore();
  }
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  
    spinEl.textContent = !angVel ? "SPIN" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  };
  
  function frame() {
    // Fire an event after the wheel has stopped spinning
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; // reset the flag
      return;
    }
  
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
  }
  
  init();
  
  events.addListener("spinEnd", (sector) => {
    console.log( win);
  });
  
function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
  
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
  
      // Change the font size and add blow-up effect
      spinEl.style.fontSize = "2em";
      spinEl.classList.add("blow-up");
  
      // Remove the blow-up effect class after animation ends
      spinEl.addEventListener("animationend", () => {
        spinEl.classList.remove("blow-up");
        spinEl.style.fontSize = ""; // Reset font size
      }, { once: true });
  
      spinButtonClicked = true;
    });
  }
