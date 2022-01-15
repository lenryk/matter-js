// create main engine
let engine = Matter.Engine.create();

// define walls and borders
let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 800,
    background: "#ffffff",
    wireframes: false,
  },
});

// run engine
Matter.Render.run(render);

const CUSTOM_PATH =
  "15.67 122.00,36.50 234.74,133.33 315.47,266.67 315.47,349.33 238.00,363.33 120.26,313.33 121.40,279.83 180.18,100.33 178.96,69.33 120.53";

const right_side =
  "297.67 246.00,298.33 333.47,385.67 332.47,383.33 250.00,351.00 155.26,305.83 111.90,267.67 73.53,144.33 72.53,209.17 121.15,264.00 175.76";

// wall creation function
function wall(x, y, width, height) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    render: {
      fillStyle: "#000000",
    },
  });
}

function customShape(x, y, shape) {
  let vertices = Matter.Vertices.fromPath(shape);
  return Matter.Bodies.fromVertices(x, y, vertices, {
    isStatic: true,
  });
}

// add boundary walls
Matter.World.add(engine.world, [
  wall(400, 0, 800, 20),
  wall(400, 800, 800, 20),
  wall(0, 400, 20, 800),
  wall(800, 400, 20, 800),
  customShape(400, 200, CUSTOM_PATH),
  customShape(600, 400, right_side),
]);

// run it
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
