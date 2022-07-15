// Static
const ceil = 10;
const testing = false;
const global_font = "Source Code Pro";
const column_width = 100;
const array_whitespace = 3;

// Dynamic
var array_string = "[]";
var selected_button = undefined;
var step = 0;
var steps = [];

// Populate array with random numbers
function generate_array() {
	steps = [];
	var length = 6;

	var array = [];

	for (var i = 0; i <= length; i++) {
		var random = Math.random();
		var number = Math.ceil(random * ceil);
		array.push(number);
	}
	array_string = array.join("   ");
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

var step_number = document.querySelector("#step_number");

document.querySelector("#next_step").addEventListener("click", () => {
	if (step + 2 < array.length) {
		step++;
	} else {
		step = 0;
	}
	step_number.innerHTML = step + 1;
});
document.querySelector("#previous_step").addEventListener("click", () => {
	if (step > -1) {
		step--;
	} else {
		step = 0;
	}
	step_number.innerHTML = step + 1;
});

// Render array in columns
var column_array = () => {
	var r = 48;
	var g = 116;
	var b = 184;

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
// Step representation constants
const highlight_padding = 20;
const array_text_y = 50;
// Sorting Algorithms

function bubble_sort(array) {
	// Bubble sort logic //
  var swap_numbers = (n1,n2) => {
    var temp = array[n1];
    array[n1] = array[n2];
    array[n2] = temp;
  }
  var n1 = step;
  var n2 = step + 1;
  if (n1 > n2){
    swap_numbers(n1,n2);
  }
  else {
    console.log('Pass');
  }
	// Style Functions //

	column_array();
	textSize(25);
	var render_step = (array) => {
		var first_number = step;
		var second_number = step + 1;

		var highlight_array_number = (array_index, array, r, g, b) => {
			var start = width / 2 - textWidth(array_string) / 2;
			var x = array.slice(0, array_index).join("").length + array_index * 3;
			x = start + textWidth(array_string.slice(0, x)) - highlight_padding / 2;
			var y = array_text_y - 10 - highlight_padding / 2;
			var x_width = textWidth(String(array[array_index])) + highlight_padding;
			var y_height = 20 + highlight_padding;
			fill(r, g, b);
			stroke(r, g, b);
			rect(x, y, x_width, y_height);
		};

		var compare_number_text = (num1, num2) => {
			var compare_text = `Is ${num1} greater than ${num2}: `;

			fill(0);
			stroke(255);

			var truth = num1 > num2;
			var truth_x = width / 2 + textWidth(compare_text) / 2;

			text(compare_text, width / 2 - textWidth(truth) / 2, array_text_y + 60); // Draw comparison text "is num1 greater than num2"
			if (truth) {
				fill(0, 255, 0);
			} else {
				fill(255, 0, 0);
			}

			text(truth, truth_x, array_text_y + 60); // Draw truth text concatinated to draw comparison text "true" or "false"
		};

		highlight_array_number(first_number, array, 26, 192, 198);
		highlight_array_number(second_number, array, 69, 230, 69);
		compare_number_text(array[first_number], array[second_number]);
	};

	render_step(array);
	fill(0);
	stroke(255);

	text(array_string, width / 2, array_text_y);
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
