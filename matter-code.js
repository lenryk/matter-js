// create main engine
let engine = Matter.Engine.create();

// define walls and borders
let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 800,
    background: "#f8f99a",
    wireframes: false,
  },
});

// run engine
Matter.Render.run(render);

// wall creation function
function wall(x, y, width, height) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    redner: {
      fillStyle: "#ffffff",
    },
  });
}

// add boundary walls
Matter.World.add(engine.world, [
  wall(400, 0, 800, 20),
  wall(400, 800, 800, 20),
  wall(0, 400, 20, 800),
  wall(800, 400, 20, 800),
]);

// divider walls
for (let x = 0; x <= 750; x += 80) {
  let divider = wall(x, 610, 20, 360);
  Matter.World.add(engine.world, divider);
}

// peg creation
function peg(x, y) {
  return Matter.Bodies.circle(x, y, 14, {
    isStatic: true,
    render: {
      fillStyle: "#ffffff",
    },
  });
}

// field of pegs creations
let isStaggerRow = false;
for (let y = 200; y <= 400; y += 40) {
  let startX = isStaggerRow ? 80 : 40;
  for (let x = startX; x <= 760; x += 80) {
    Matter.World.add(engine.world, peg(x, y));
  }
  isStaggerRow = !isStaggerRow;
}

// bead creation
function bead() {
  return Matter.Bodies.circle(380, 40, 11, {
    render: {
      fillStyle: "#000000",
    },
  });
}

// dropping beads
function dropBead() {
  Matter.World.add(engine.world, bead());
}

for (let i = 0; i < 20; i++) {
  setInterval(dropBead, 2000);
}
// let dropBeadInterval = setInterval(dropBead, 1000);

// run it
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
