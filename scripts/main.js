// Static
const ceil = 10;
const testing = false;
const global_font = "Source Code Pro";

// Dynamic
var array_string = "[]";
var selected_button = undefined;
var step = 0;

// Populate array with random numbers
function generate_array() {
  var length = 5;

  var array = [];

  for (var i = 0; i <= length; i++) {
    var random = Math.random();
    var number = Math.ceil(random * ceil);
    array.push(number);
  }
  array_string = array.join(", ");
  return array;
}

// Initialise Buttons
document.querySelectorAll(".algo_button").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (selected_button && !testing) {
      selected_button.classList.toggle("enabled");
    }
    item.classList.toggle("enabled");
    selected_button = item;

    array = generate_array();
  });
});

document.querySelector("#next_step").addEventListener("click", () => step++);

// Render array in columns
var column_array = () => {
  var r = 48;
  var g = 116;
  var b = 184;

  var column_width = 100;

  v = width / 2 - (column_width * array.length) / 2;

  array.forEach((value) => {
    // Rect style
    fill(color(r, g, b));
    stroke(255);
    rect(v, height, column_width, (-value * height) / ceil / 2);
    // Text style
    fill(255);
    stroke(0);
    textFont(global_font);
    textSize(20);
    textAlign(CENTER, CENTER);

    text(
      value,
      v + column_width / 2,
      height - (value * height) / ceil / 2 + 20
    );

    // Increment
    v += column_width;
    r -= r / array.length;
    g -= g / array.length;
    b -= b / array.length;
  });
};

// Sorting Algorithms

function bubble_sort(array) {
  column_array();

  fill(0);
  stroke(255);
  textSize(25);

  text(array_string, width / 2, 50);
}

function selection_sort(array) {}

function insertion_sort(array) {}

function merge_sort(array) {}

function quick_sort(array) {}

// p5.js functionality
function setup() {
  var canvas = createCanvas(windowWidth, windowHeight / 1.4);
  canvas.parent("visualiser");
}

function draw() {
  background(255);
  if (selected_button) {
    switch (selected_button.id) {
      case "bubble":
        bubble_sort(array);

      case "selection":
        selection_sort(array);

      case "insertion":
        insertion_sort(array);

      case "merge":
        merge_sort(array);

      case "quick":
        quick_sort(array);
    }
  }
}
