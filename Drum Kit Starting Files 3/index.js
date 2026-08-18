var drums = document.querySelectorAll(".drum");

// mouse
drums.forEach((drum) =>
  drum.addEventListener("click", (e) => {
    var key = e.target.textContent;
    console.log(key);
    playSound(key);
    animate(key);
  })
);

document.addEventListener("keydown", (e) => {
  var key = e.key;
  playSound(key);
  animate(key);
});

function playSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("./sounds/crash.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("./sounds/kick-bass.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("./sounds/snare.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("./sounds/tom-2.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("./sounds/tom-3.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("./sounds/tom-4.mp3");
      audio.play();
      break;
  }
}

function animate(key) {
  var element = document.querySelector(`.${key}`);
  element.classList.add("pressed");

  setTimeout(() => {
    element.classList.remove("pressed");
  }, 100);
}
