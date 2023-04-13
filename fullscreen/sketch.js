// https://openprocessing.org/sketch/1816559
// I modified the speed and the particle effect from the original code
// Rorate the different part and then put the kinds of rectangle in the same case

let rs;
let g;
let palette;

function setup() {
   createCanvas(windowWidth, windowHeight);
  fullscreen();
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  rs = int(random(10000));
  g = createGraphics(width, height);
  palette = shuffle(random(colorScheme).colors.concat());

  for (let i = 0; i < g.width * g.height * 0.1; i++) {
    obj = formula(1, (sqrt(2) * width) / 2);
    let r = obj.value;
    let angle = g.random(TWO_PI);
    let point_x = g.width / 2 + g.cos(angle) * r;
    let point_y = g.height / 2 + g.sin(angle) * r;
    g.stroke(255, (30 / 100) * 255);
    g.point(point_x, point_y);
  }
}
// function mousePressed() {
//   if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//     let fs = fullscreen();
//     fullscreen(!fs);
//   }
// }
function draw() {
  blendMode(BLEND);
  background(0, 0, 0);

  randomSeed(frameCount / 500);

  push();
  let cells = 50;
  let i_step, j_step;
  let offset = (width * (sqrt(2) - 1)) / 2;
  let d = (width + offset * 2) / cells;
  for (let j = 0; j < cells; j += j_step) {
    j_step = int(random(1, cells / 10));
    if (j + j_step > cells || abs(cells - (j + j_step)) < 3) j_step = cells - j;
    for (let i = 0; i < cells; i += i_step) {
      i_step = j_step;
      if (i + i_step > cells || abs(cells - (i + i_step)) <= cells / 15)
        i_step = cells - i;
      let x = -offset + i * d + (d / 2) * i_step;
      let y = -offset + j * d + (d / 2) * j_step;
      let distance =
        dist(x, y, width / 2, height / 2) / (sqrt(2) * (width / 2 - offset));
      let t = 1 - ((frameCount / 100 + distance) % 1);
      t = easeInOutCirc(t);
      rectMode(CENTER);
      drawLinePattern(x, y, d * i_step, d * j_step, t);
    }
  }
  pop();
  blendMode(ADD);

  image(g, 0, 0);

  // let center_x = width / 2;
  // let center_y = height / 2;
  // let pattern_size = width * 0.8;
  // noLoop();
}

function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInOutElastic(x) {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

function drawLinePattern(center_x, center_y, pattern_w, pattern_h, t) {
  let angle = (int(random(4)) * 360) / 4;
  let tmp;
  if (angle % 180 == 90) {
    tmp = pattern_w;
    pattern_w = pattern_h;
    pattern_h = tmp;
  }
  push();
  translate(center_x, center_y);
  noStroke();
  fill(0, 0, 100, 0);
  rect(0, 0, pattern_w, pattern_h);
  drawingContext.clip();
  let n = int(random(1, 4));
  for (let j = 0; j < n; j++) {
    push();
    rotate(angle + j * 90);
    shearX(t * 90 * (random() > 0.5 ? -1 : 1));
    shearY(90 - (1 - t) * 90 + random() > 0.5 ? -1 : 1);
    translate(-pattern_w / 2, -pattern_h / 2);

    let line_direction = random() > 0.5;
    let line_step = int(random(1, 6));
    let d = pattern_w / line_step;
    let a = line_direction ? pattern_h : d;
    let b = line_direction ? d : pattern_h;

    for (let i = 0; i < line_step; i++) {
      drawingContext.setLineDash([a / 2]);
      drawingContext.lineDashOffset = (frameCount + t * a * 2) % (a * 2);
      let x = (i / line_step) * pattern_w;
      strokeCap(SQUARE);
      stroke(random(palette));
      if (line_direction) {
        strokeWeight(d / 2);
        let t = (x + d / 2 + frameCount / 3) % pattern_w;
        line(t, 0, t, pattern_h);
      } else {
        strokeWeight(pattern_h);
        let t = line(
          x + d / 2 - d / 4,
          pattern_h / 2,
          x + d / 2 + d / 4,
          pattern_h / 2
        );
      }
    }
    pop();
  }
  pop();
}

function formula(num, r) {
  let value, str;
  switch (num) {
    case 0:
      value = random() * r;
      str = "random() * r;";
      break;
    case 1:
      value = (1 - random(random())) * r;
      str = "(1-random(random())) * r;";
      break;
    case 2:
      value = (1 - random(random(random()))) * r;
      str = " (1-random(random(random()))) * r;";
      break;
    case 3:
      value = (1 - random(random(random(random())))) * r;
      str = "(1-random(random(random(random())))) * r;";
      break;
    case 4:
      value = (1 - sqrt(random())) * r;
      str = "(1-sqrt(random())) * r;";
      break;
    case 5:
      value = sqrt(random()) * r;
      str = "(sqrt(random())) * r;";
      break;
    case 6:
      value = pow(1 - pow(random(), 10), 10) * r;
      str = "pow(1-pow(random(),10),10) * r;";
      break;
    case 7:
      value = tan(random(TWO_PI)) * r;
      str = "tan(random(TWO_PI)) * r;";
      break;
    case 8:
      value = (atan(random(TWO_PI)) * r) / sqrt(2);
      str = "atan(random(TWO_PI)) * r / sqrt(2);";
      break;
  }
  return {
    value: value,
    string: str,
  };
}

let colorScheme = [
  {
    name: "Benedictus",
    colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
  },
  {
    name: "Cross",
    colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
  },
  {
    name: "Demuth",
    colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
  },
  {
    name: "Hiroshige",
    colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
  },
  {
    name: "Hokusai",
    colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
  },
  {
    name: "Hokusai Blue",
    colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
  },
  {
    name: "Java",
    colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
  },
  {
    name: "Kandinsky",
    colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
  },
  {
    name: "Monet",
    colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
  },
  {
    name: "Nizami",
    colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
  },
  {
    name: "Renoir",
    colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
  },
  {
    name: "VanGogh",
    colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
  },
  {
    name: "Mono",
    colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
  },
  {
    name: "RiverSide",
    colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
  },
];
