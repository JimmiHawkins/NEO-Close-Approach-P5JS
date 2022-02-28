let speed = 0;
let speed1 = 0;
let speed2 = 0;
let speed3 = 0;
let speed4 = 0;
let speed5 = 0;
let speed6 = 0;
let speed7 = 0;
let speed8 = 0;
let speed9 = 0;
let speed10 = 0;
let speed11 = 0;
let speed12 = 0;
let speed13 = 0;

let o = 0; //opacity of mute button

function preload() {
  //preloading all image and sound assets, as well as my data file

  song = loadSound("sound/sound.mp3"); //https://www.soundsnap.com/sfx_atmos_space_rumble

  nasa = loadJSON("nasa.JSON"); //data can be interchanged with the NASA API if it becomes available to me

  earth = loadImage("img/earth.png");
  starsBack = loadImage("img/starsBack.png");
  starsFront = loadImage("img/starsFront.png");
  soundButton = loadImage("img/sound.png"); //"https://icons8.com/icon/p8MWskHFh7qy/sound"
}

function setup() {
  frameRate(60); //setting framerate from 30 to 60 will allow smoother animation

  createCanvas(1920, 1080);

  //setting volume and auto playing the background ambience with a loop
  song.setVolume(0.2);
  song.loop();

  noCursor(); //disabling cursor as i have made my own using shapes

  console.log(nasa); //console logging my data-set so i can view which arrays i need to call for specific data

  x = width / 2;
  y = height / 2;

  //v0 - v13 are set to equal each objects velocity data. The number is divided by 10 to provide a smaller number that can be translated to rotation speed

  v = nasa.data[0][7] / 10;
  v1 = nasa.data[1][7] / 10;
  v2 = nasa.data[2][7] / 10;
  v3 = nasa.data[3][7] / 10;
  v4 = nasa.data[4][7] / 10;
  v5 = nasa.data[5][7] / 10;
  v6 = nasa.data[6][7] / 10;
  v7 = nasa.data[7][7] / 10;
  v8 = nasa.data[8][7] / 10;
  v9 = nasa.data[9][7] / 10;
  v10 = nasa.data[10][7] / 10;
  v11 = nasa.data[11][7] / 10;
  v12 = nasa.data[12][7] / 10;
  v13 = nasa.data[13][7] / 10;

  //m0 - m13 are set to equal the nominal distance of each object. The number is divided by 13000 to greatly reduce the number so the objects can fit on screen while being proportional in distance,

  m = (nasa.data[0][4] * 92955807.3) / 13000;
  m1 = (nasa.data[1][4] * 92955807.3) / 13000;
  m2 = (nasa.data[2][4] * 92955807.3) / 13000;
  m3 = (nasa.data[3][4] * 92955807.3) / 13000;
  m4 = (nasa.data[4][4] * 92955807.3) / 13000;
  m5 = (nasa.data[5][4] * 92955807.3) / 13000;
  m6 = (nasa.data[6][4] * 92955807.3) / 13000;
  m7 = (nasa.data[7][4] * 92955807.3) / 13000;
  m8 = (nasa.data[8][4] * 92955807.3) / 13000;
  m9 = (nasa.data[9][4] * 92955807.3) / 13000;
  m10 = (nasa.data[10][4] * 92955807.3) / 13000;
  m11 = (nasa.data[11][4] * 92955807.3) / 13000;
  m12 = (nasa.data[12][4] * 92955807.3) / 13000;
  m13 = (nasa.data[13][4] * 92955807.3) / 13000;

  //distance/distance1 is set to equal y(height/2) - or + 120. This is to set a no fly zone in the space directly in front of the earth when the obejcts get positoned

  distance = y - 120;
  distance1 = y + 120;

  //each object has an x positon , y postion, and radius that are all controlled here. The Y position is determined using distance then plus or minus y (depending on which side of the earth they are on)

  rock0PosX = 1400;
  rock0PosY = distance - m;
  rock0Radius = 25;

  rock1PosX = 1300;
  rock1PosY = distance1 + m1;
  rock1Radius = 25;

  rock2PosX = 1200;
  rock2PosY = distance - m2;
  rock2Radius = 25;

  rock3PosX = 1100;
  rock3PosY = distance1 + m3;
  rock3Radius = 25;

  rock4PosX = 1000;
  rock4PosY = distance - m4;
  rock4Radius = 25;

  rock5PosX = 900;
  rock5PosY = distance1 + m5;
  rock5Radius = 25;

  rock6PosX = 800;
  rock6PosY = distance - m6;
  rock6Radius = 25;

  rock7PosX = 700;
  rock7PosY = distance1 + m7;
  rock7Radius = 25;

  rock8PosX = 600;
  rock8PosY = distance - m8;
  rock8Radius = 25;

  rock9PosX = 500;
  rock9PosY = distance1 + m9;
  rock9Radius = 25;

  rock10PosX = 400;
  rock10PosY = distance - m10;
  rock10Radius = 25;

  rock11PosX = 300;
  rock11PosY = distance1 + m11;
  rock11Radius = 25;

  rock12PosX = 200;
  rock12PosY = distance - m12;
  rock12Radius = 25;

  rock13PosX = 100;
  rock13PosY = distance1 + m13;
  rock13Radius = 25;
}

function draw() {
  background(11, 11, 17); //space blue colour

  //drawing the background and sound button

  //determining the stars image position by mouse postion and dividing by a large number, means the image moves ever so slightly when the mouse moves. I have layered this with 2 seperate star images with different levels of tolerence to provide some depth.
  image(starsBack, mouseX / 200, mouseY / 200);
  image(starsFront, mouseX / 75, mouseY / 75);

  image(soundButton, 30, 27, 70, 70); //sound icon positioned in top left corner

  //image of earth and the rings around it
  image(earth, 1431, 342, 400, 400);
  circle(x * 1.7, y, 250);
  circle(x * 1.7, y, 400);

  //this draws the moon orbiting the earth by first determining the displacement of the rotation, then having PI add the amount of radians specified on to itself. The value in radians determins the speed of the rotation. PI is then used ass the rotation value.
  push();

  translate(x * 1.7, y);
  PI += radians(0.1);
  rotate(PI);

  fill(255);
  noStroke();
  circle(0, 200, 20); //moon

  pop();

  noFill();
  stroke(255);
  rectMode(CORNER);
  rect(20, 20, 1880, 1040, 10); //border

  strokeWeight(2);
  noStroke();
  
  fill(255, 80, 80, o); //determing the alpha from the value of 'o' when the mouse is clicked in the area of the sound icon, the value will change

  push();
  rectMode(CENTER);
  translate(65, 65);
  rotate(15);
  rect(0, 0, 50, 15, 5); // mute icon

  pop();

  push();

  rectMode(CENTER);
  translate(65, 65);
  rotate(-15);
  rect(0, 0, 50, 15, 5); //mute icon

  pop();

  noFill();

  var d = dist(mouseX, mouseY, rock0PosX, rock0PosY); //calculating the distance between object position and mouse position

  //if mouse is within the object radius, the repsective object description box will appear
  if (d < rock0Radius) {
    rock0(); //description box function

    console.log("0");

    stroke(250);
    strokeWeight(5);
    fill(160);

    //rotation of the object

    push();

    translate(rock0PosX, rock0PosY); //using the center of the object as point of rotation
    speed += radians(v); //instead of PI i am using speed(0-13) as I could not get multiple objects to spin independently at different speeds. The radians are replaced with the 'v' variable which is eqaul to the simplified velocity

    rotate(speed);

    polygon(0, 0, rock0Radius, 5); //polygon is a shape function. The radius of each object is equal to 25. I was planning to have the radius change depending on the magnitude, however, in real life the higher the mag the lower the diameter and i could not figure out how to reverse the size.

    pop();

    //if mouse is not over object, the object will still spin, but the description box will stay hidden
  } else {
    noStroke();

    push();

    translate(rock0PosX, rock0PosY);
    speed += radians(v);
    rotate(speed);

    fill(165);

    polygon(0, 0, rock0Radius, 5);

    pop();
  }

  //this formula repeats for each object
  var d1 = dist(mouseX, mouseY, rock1PosX, rock1PosY);

  if (d1 < rock1Radius) {
    rock1();

    console.log("1");

    stroke(250);
    strokeWeight(5);
    fill(160);

    push();
    translate(rock1PosX, rock1PosY);
    speed1 += radians(v1);
    rotate(speed1);

    polygon(0, 0, rock1Radius, 5);

    pop();
  } else {
    fill(160);
    noStroke();

    push();
    translate(rock1PosX, rock1PosY);
    speed1 += radians(v1);
    rotate(speed1);

    fill(160);

    polygon(0, 0, rock1Radius, 5);

    pop();
  }

  var d2 = dist(mouseX, mouseY, rock2PosX, rock2PosY);

  if (d2 < rock2Radius) {
    rock2();

    console.log("2");

    stroke(250);
    strokeWeight(5);
    fill(160);

    push();
    translate(rock2PosX, rock2PosY);
    speed2 += radians(v2);
    rotate(speed2);

    polygon(0, 0, rock2Radius, 5);

    pop();
  } else {
    fill(260);
    noStroke();

    push();
    translate(rock2PosX, rock2PosY);
    speed2 += radians(v2);
    rotate(speed2);

    fill(165);

    polygon(0, 0, rock2Radius, 5);

    pop();
  }

  var d3 = dist(mouseX, mouseY, rock3PosX, rock3PosY);

  if (d3 < rock3Radius) {
    rock3();

    console.log("3");

    stroke(350);
    strokeWeight(5);
    fill(160);

    push();
    translate(rock3PosX, rock3PosY);
    speed3 += radians(v3);
    rotate(speed3);
    polygon(0, 0, rock3Radius, 5);

    pop();
  } else {
    fill(360);
    noStroke();

    push();
    translate(rock3PosX, rock3PosY);
    speed3 += radians(v3);
    rotate(speed3);

    fill(165);

    polygon(0, 0, rock3Radius, 5);

    pop();
  }

  var d4 = dist(mouseX, mouseY, rock4PosX, rock4PosY);

  if (d4 < rock4Radius) {
    rock4();

    console.log("4");

    stroke(450);
    strokeWeight(5);
    fill(160);

    push();
    translate(rock4PosX, rock4PosY);
    speed4 += radians(v4);
    rotate(speed4);
    polygon(0, 0, rock4Radius, 5);

    pop();
  } else {
    fill(460);
    noStroke();

    push();
    translate(rock4PosX, rock4PosY);
    speed4 += radians(v4);
    rotate(speed4);

    fill(165);

    polygon(0, 0, rock4Radius, 5);

    pop();
  }
  var d5 = dist(mouseX, mouseY, rock5PosX, rock5PosY);

  if (d5 < rock5Radius) {
    rock5();

    console.log("5");

    stroke(550);
    strokeWeight(5);
    fill(160);

    push();
    translate(rock5PosX, rock5PosY);
    speed5 += radians(v5);
    rotate(speed5);
    polygon(0, 0, rock5Radius, 5);

    pop();
  } else {
    fill(560);
    noStroke();

    push();
    translate(rock5PosX, rock5PosY);
    speed5 += radians(v5);
    rotate(speed5);

    fill(165);

    polygon(0, 0, rock5Radius, 5);

    pop();
  }

  var d6 = dist(mouseX, mouseY, rock6PosX, rock6PosY);

  if (d6 < rock6Radius) {
    rock6();

    console.log("6");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock6PosX, rock6PosY);
    speed6 += radians(v6);
    rotate(speed6);
    polygon(0, 0, rock6Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock6PosX, rock6PosY);
    speed6 += radians(v6);
    rotate(speed6);

    fill(166);

    polygon(0, 0, rock6Radius, 5);

    pop();
  }

  var d7 = dist(mouseX, mouseY, rock7PosX, rock7PosY);

  if (d7 < rock7Radius) {
    rock7();

    console.log("7");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock7PosX, rock7PosY);
    speed7 += radians(v7);
    rotate(speed7);
    polygon(0, 0, rock7Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock7PosX, rock7PosY);
    speed7 += radians(v7);
    rotate(speed7);

    fill(166);

    polygon(0, 0, rock7Radius, 5);

    pop();
  }

  var d8 = dist(mouseX, mouseY, rock8PosX, rock8PosY);

  if (d8 < rock8Radius) {
    rock8();

    console.log("8");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock8PosX, rock8PosY);
    speed8 += radians(v8);
    rotate(speed8);
    polygon(0, 0, rock8Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock8PosX, rock8PosY);
    speed8 += radians(v8);
    rotate(speed8);

    fill(166);

    polygon(0, 0, rock8Radius, 5);

    pop();
  }

  var d9 = dist(mouseX, mouseY, rock9PosX, rock9PosY);

  if (d9 < rock9Radius) {
    rock9();

    console.log("9");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock9PosX, rock9PosY);
    speed9 += radians(v9);
    rotate(speed9);
    polygon(0, 0, rock9Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock9PosX, rock9PosY);
    speed9 += radians(v9);
    rotate(speed9);

    fill(166);

    polygon(0, 0, rock9Radius, 5);

    pop();
  }

  var d10 = dist(mouseX, mouseY, rock10PosX, rock10PosY);

  if (d10 < rock10Radius) {
    rock10();

    console.log("10");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock10PosX, rock10PosY);
    speed10 += radians(v10);
    rotate(speed10);
    polygon(0, 0, rock10Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock10PosX, rock10PosY);
    speed10 += radians(v10);
    rotate(speed10);

    fill(166);

    polygon(0, 0, rock10Radius, 5);

    pop();
  }

  var d11 = dist(mouseX, mouseY, rock11PosX, rock11PosY);

  if (d11 < rock11Radius) {
    rock11();

    console.log("11");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock11PosX, rock11PosY);
    speed11 += radians(v11);
    rotate(speed11);
    polygon(0, 0, rock11Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock11PosX, rock11PosY);
    speed11 += radians(v11);
    rotate(speed11);

    fill(166);

    polygon(0, 0, rock11Radius, 5);

    pop();
  }

  var d12 = dist(mouseX, mouseY, rock12PosX, rock12PosY);

  if (d12 < rock12Radius) {
    rock12();

    console.log("12");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock12PosX, rock12PosY);
    speed12 += radians(v12);
    rotate(speed12);
    polygon(0, 0, rock12Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock12PosX, rock12PosY);
    speed12 += radians(v12);
    rotate(speed12);

    fill(166);

    polygon(0, 0, rock12Radius, 5);

    pop();
  }

  var d13 = dist(mouseX, mouseY, rock13PosX, rock13PosY);

  if (d13 < rock13Radius) {
    rock13();

    console.log("13");

    stroke(660);
    strokeWeight(6);
    fill(160);

    push();
    translate(rock13PosX, rock13PosY);
    speed13 += radians(v13);
    rotate(speed13);
    polygon(0, 0, rock13Radius, 5);

    pop();
  } else {
    fill(660);
    noStroke();

    push();
    translate(rock13PosX, rock13PosY);
    speed13 += radians(v13);
    rotate(speed13);

    fill(166);

    polygon(0, 0, rock13Radius, 5);

    pop();
  }

  //the title and dates in the top right corner
  fill(255);
  noStroke();
  stroke(255);
  strokeWeight(1);
  textSize(50);
  textAlign(RIGHT);
  textFont("georgia");

  text("Near Earth Objects", 1850, 100);

  noStroke();
  textSize(30);

  text("Between:", 1850, 150);

  // the date range is mirrored by the 1st object and last object on the canvas.
  text(nasa.data[0][3], 1850, 180); //first possible date
  text(nasa.data[13][3], 1850, 210); //last possible date

  textSize(25);

  text("Data Visualisation Of NASA'S", 1850, 960);
  text("NEO Earth Close Approaches", 1850, 990);
  text("https://cneos.jpl.nasa.gov/ca/", 1850, 1020); //link to data set

  //custom mouse shape function drawn
  mouse();
}

//mouse function that draws a rounded sqaure wherever the mouse is
function mouse() {
  noFill();
  strokeWeight(3);
  stroke(255);
  rectMode(CENTER);
  square(mouseX, mouseY, 10, 5);
}

// The function rock0 - rock13 includes all the changeable data for each data feild in the description boxes
function rock0() {
  fill(255);
  noStroke();
  textSize(20);

  desBox(); //a function that includes the shapes, text, and styles that make up the description boxes and do not need to be chnaged for each object. Depending on which side of the earth the object is on, desbox2 can also be called

  //these rounded variables are set to equal their respective data, but rounded or converted to a different measurement of distance to give a value more familier to the everyday user

  //the distance data is given in astronomical units. Multiplying by 92955807.3 converts AU into miles.
  let nominalRounded = round(nasa.data[0][4] * 92955807.3);
  let minRounded = round(nasa.data[0][5] * 92955807.3);
  let maxRounded = round(nasa.data[0][6] * 92955807.3);

  //Simply rounding these numbers removes the many decimal points that could be overwhelming for the user
  let velRounded = round(nasa.data[0][7]);
  let magRounded = round(nasa.data[0][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[0][3], mouseX + 445, mouseY + 70); //date

  fill(255);
  strokeWeight(4);

  text(nasa.data[0][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[0][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

//This formula is repeated for each object
function rock1() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[1][4] * 92955807.3);
  let minRounded = round(nasa.data[1][5] * 92955807.3);
  let velRounded = round(nasa.data[1][7]);
  let maxRounded = round(nasa.data[1][6] * 92955807.3);
  let magRounded = round(nasa.data[1][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[1][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[1][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[1][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock2() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[2][4] * 92955807.3);
  let minRounded = round(nasa.data[2][5] * 92955807.3);
  let velRounded = round(nasa.data[2][7]);
  let maxRounded = round(nasa.data[2][6] * 92955807.3);
  let magRounded = round(nasa.data[2][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[2][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[2][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[2][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock3() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[3][4] * 92955807.3);
  let minRounded = round(nasa.data[3][5] * 92955807.3);
  let velRounded = round(nasa.data[3][7]);
  let maxRounded = round(nasa.data[3][6] * 92955807.3);
  let magRounded = round(nasa.data[3][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[3][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[3][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[3][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock4() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[4][4] * 92955807.3);
  let minRounded = round(nasa.data[4][5] * 92955807.3);
  let velRounded = round(nasa.data[4][7]);
  let maxRounded = round(nasa.data[4][6] * 92955807.3);
  let magRounded = round(nasa.data[4][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[4][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[4][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[4][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock5() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[5][4] * 92955807.3);
  let minRounded = round(nasa.data[5][5] * 92955807.3);
  let velRounded = round(nasa.data[5][7]);
  let maxRounded = round(nasa.data[5][6] * 92955807.3);
  let magRounded = round(nasa.data[5][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[5][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[5][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[5][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock6() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[6][4] * 92955807.3);
  let minRounded = round(nasa.data[6][5] * 92955807.3);
  let velRounded = round(nasa.data[6][7]);
  let maxRounded = round(nasa.data[6][6] * 92955807.3);
  let magRounded = round(nasa.data[6][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[6][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[6][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[6][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock7() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[7][4] * 92955807.3);
  let minRounded = round(nasa.data[7][5] * 92955807.3);
  let velRounded = round(nasa.data[7][7]);
  let maxRounded = round(nasa.data[7][6] * 92955807.3);
  let magRounded = round(nasa.data[7][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[7][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[7][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[7][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock8() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[8][4] * 92955807.3);
  let minRounded = round(nasa.data[8][5] * 92955807.3);
  let velRounded = round(nasa.data[8][7]);
  let maxRounded = round(nasa.data[8][6] * 92955807.3);
  let magRounded = round(nasa.data[8][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[8][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[8][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[8][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock9() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[9][4] * 92955807.3);
  let minRounded = round(nasa.data[9][5] * 92955807.3);
  let velRounded = round(nasa.data[9][7]);
  let maxRounded = round(nasa.data[9][6] * 92955807.3);
  let magRounded = round(nasa.data[9][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[9][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[9][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[9][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock10() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[10][4] * 92955807.3);
  let minRounded = round(nasa.data[10][5] * 92955807.3);
  let velRounded = round(nasa.data[10][7]);
  let maxRounded = round(nasa.data[10][6] * 92955807.3);
  let magRounded = round(nasa.data[10][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[10][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[10][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[10][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock11() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[11][4] * 92955807.3);
  let minRounded = round(nasa.data[11][5] * 92955807.3);
  let velRounded = round(nasa.data[11][7]);
  let maxRounded = round(nasa.data[11][6] * 92955807.3);
  let magRounded = round(nasa.data[11][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[11][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[11][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[11][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

function rock12() {
  fill(255);
  noStroke();
  textSize(20);

  desBox();

  let nominalRounded = round(nasa.data[12][4] * 92955807.3);
  let minRounded = round(nasa.data[12][5] * 92955807.3);
  let velRounded = round(nasa.data[12][7]);
  let maxRounded = round(nasa.data[12][6] * 92955807.3);
  let magRounded = round(nasa.data[12][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[12][3], mouseX + 445, mouseY + 70); //date
  fill(255);
  strokeWeight(4);

  text(nasa.data[12][0], mouseX + 445, mouseY + 100); //name
  text(nasa.data[12][1], mouseX + 445, mouseY + 130); //ID
  text(nominalRounded, mouseX + 445, mouseY + 160); //nomin
  text(minRounded, mouseX + 445, mouseY + 190); //min
  text(maxRounded, mouseX + 445, mouseY + 220); //max
  text(velRounded, mouseX + 445, mouseY + 250); //vel
  text(magRounded, mouseX + 445, mouseY + 280); //mag
}

function rock13() {
  fill(255);
  noStroke();
  textSize(20);

  desBox2();

  let nominalRounded = round(nasa.data[13][4] * 92955807.3);
  let minRounded = round(nasa.data[13][5] * 92955807.3);
  let velRounded = round(nasa.data[13][7]);
  let maxRounded = round(nasa.data[13][6] * 92955807.3);
  let magRounded = round(nasa.data[13][10]);

  textAlign(RIGHT);
  fill(0);
  stroke(17, 17, 21);
  strokeWeight(1.5);

  text(nasa.data[13][3], mouseX + 445, mouseY - 53); //date
  fill(255);
  strokeWeight(4);
  text(nasa.data[13][0], mouseX + 445, mouseY - 83); //name
  text(nasa.data[13][1], mouseX + 445, mouseY - 113); //ID
  text(nominalRounded, mouseX + 445, mouseY - 143); //nomin
  text(minRounded, mouseX + 445, mouseY - 173); //min
  text(maxRounded, mouseX + 445, mouseY - 203); //max
  text(velRounded, mouseX + 445, mouseY - 233); //vel
  text(magRounded, mouseX + 445, mouseY - 263); //mag
}

//This function uses the shape creation tool to make a polygon with a changeable number of points value
function polygon(x, y, rockRadius, npoints) {
  let angle = TWO_PI / npoints;

  beginShape();

  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * rockRadius;
    let sy = y + sin(a) * rockRadius;

    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//a function that includes the shapes, text, and styles that make up the description boxes and do not need to be chnaged for each object. Each x and y position is set to mouse position, which allows the moving with the mouse effect when hovering over.

//This version of the box is for the top row of objects, as the box is set to be  projected downwards to be in view, and use the empty space in the middle
function desBox(x, y) {
  rectMode(CORNER);
  rect(mouseX, mouseY + 63, 130, 5, 10);
  rect(mouseX - 2, mouseY, 5, 67, 10);
  rect(mouseX + 50, mouseY + 50, 400, 27, 10);

  textAlign(LEFT);
  strokeWeight(1.5);
  stroke(17, 17, 21);
  fill(0);

  text("Close Approach Date:", mouseX + 55, mouseY + 70);
  strokeWeight(4);
  fill(255);

  text("Object Name:", mouseX + 55, mouseY + 100);
  text("Orbit ID:", mouseX + 55, mouseY + 130);
  text("Nominal Distance (miles):", mouseX + 55, mouseY + 160);
  text("Minimum Distance (miles):", mouseX + 55, mouseY + 190);
  text("Maximum Distance (miles):", mouseX + 55, mouseY + 220);
  text("Velocity (km/s):", mouseX + 55, mouseY + 250);
  text("Magnitude (h):", mouseX + 55, mouseY + 280);
}

//This version of the box is for the bottom row of objects, as the box is set to be  projected downwards to be in view, and use the empty space in the middle
function desBox2(x, y) {
  rectMode(CORNER);
  rect(mouseX, mouseY - 63, 130, 5, 10);
  rect(mouseX - 2.5, mouseY - 63, 5, 67, 10);
  rect(mouseX + 50, mouseY - 73, 400, 27, 10);

  textAlign(LEFT);
  strokeWeight(1.5);
  stroke(17, 17, 21);
  fill(0);
  text("Close Approach Date:", mouseX + 55, mouseY - 53);
  strokeWeight(4);
  fill(255);
  text("Object Name:", mouseX + 55, mouseY - 83);
  text("Orbit ID:", mouseX + 55, mouseY - 113);
  text("Nominal Distance (miles):", mouseX + 55, mouseY - 143);
  text("Minimum Distance (miles):", mouseX + 55, mouseY - 173);
  text("Maximum Distance (miles):", mouseX + 55, mouseY - 203);
  text("Velocity (km/s):", mouseX + 55, mouseY - 233);
  text("Magnitude (h):", mouseX + 55, mouseY - 263);
}

//Simple mouse pressed function that listens for a click on the sound button or link
function mousePressed() {
  //if mouse is over sound icon and song is playing: stop song and change opacity of the x symbol to max
  if ((mouseX > 100, mouseY < 100 && song.isPlaying())) {
    song.stop();
    o = 255;

    //if clicked again, play song and set opacity to 0
  } else if ((mouseX > 100, mouseY < 100)) {
    song.play();
    o = 0;
  }

  //if mouse is in link area: open website
  if (mouseY > 1005 && mouseY < 1030 && mouseX > 1515 && mouseX < 1835) {
    window.open("https://cneos.jpl.nasa.gov/ca/");
  }
}
