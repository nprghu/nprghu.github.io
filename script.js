let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;
const numericInput = document.getElementById("numericInput");

let modnum = document.getElementById("mod");
let modneg = document.getElementById("neg?");
let mod = 0;

modnum.oninput = function () {
  if (modneg == "-") {
    mod = -Number(this.value);
  } else {
    mod = Number(this.value);
  }
};
modneg.oninput = function () {
  if (modneg == "-") {
    mod = -Number(this.value);
  } else {
    mod = Number(this.value);
  }
};
slider.oninput = function () {
  output.innerHTML = this.value;
};

function rollcover() {
  roll(slider.value, numericInput.value, mod);
}

function roll(importance, dice, modif) {
  let normal = Math.random() * (dice - 1) + 1;
  console.log(normal);
  let advantage = Math.min(Math.log(normal) * (dice + 1), 20);
  console.log(advantage);

  let final = 0;

  if (importance == 1) {
    final = normal;
  }
  if (importance == 2) {
    final = (normal + advantage) / 2;
  }
  if (importance == 3) {
    final = (normal + 2 * advantage) / 3;
    final = final / 2 + 10;
  }
  final = final + modif;
  console.log(final);
  const roll = document.getElementById("roll");
  roll.textContent = Math.round(final);
  const list = document.getElementById("myList");
  const firstLi = list.firstElementChild; // Get the first list item

  // Create the new list item
  const newLi = document.createElement("li");
  newLi.textContent =
    Math.round(final) +
    " (nat " +
    Math.round(final - mod) +
    ", d" +
    dice +
    ", /" +
    importance +
    ")";

  // Insert the new item at the beginning
  list.insertBefore(newLi, firstLi);
}

numericInput.addEventListener("input", (event) => {
  const value = event.target.value;
  // Replace any non-digit characters while keeping valid input intact
  event.target.value = value.replace(/[^0-9]/g, "");
});
