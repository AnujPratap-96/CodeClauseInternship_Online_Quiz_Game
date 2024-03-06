const inputBtn = document.querySelectorAll(".input");
const ques = document.getElementById("ques");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const score = document.getElementById("score");
const Ques_no = document.getElementById("ques_no");
const container = document.getElementById("contain");
const refreshBtn = document.getElementById('refresh');

let Qn = 1;
let Correct_answer = "";

let currentSelectBtn = null;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  // return array;
}

let url = `https://opentdb.com/api.php?amount=1&category=18&type=multiple`;

console.log("Beforeeeee");

let Score = 0;
async function quiz() {
  let res = await fetch(url).catch(() => {
    quiz()
  
  });
  let data = await res.json().catch(() => {
    quiz()
   
  });
  getData(data.results[0]);
}


let clicked = 0;
function getData(result) {
  Ques_no.innerHTML = `${Qn}/10`;
  ques.innerHTML = `Quse${Qn} : ${result.question}`;
  Correct_answer = `${result.correct_answer}`;
  arr = [];
  arr.push(result.correct_answer);
  for (let i = 0; i < 3; i++) {
    arr.push(`${result.incorrect_answers[i]}`);
  }
  // console.log(arr);
  shuffleArray(arr);
  showOption(arr);
}

function showOption(arr) {
  for (let i = 0; i < 4; i++) {
    inputBtn[i].innerHTML = `${arr[i]}`;
  }
}

function getCorrect(ans) {
  if (ans === Correct_answer) {
    return true;
  } else {
    return false;
  }
}

inputBtn.forEach((e) => {
  e.addEventListener("click", () => {
    if (currentSelectBtn !== null) {
      currentSelectBtn.style.backgroundColor = "";
    }
    
    currentSelectBtn = e;
    let answer = e.innerHTML;
    if (getCorrect(answer)) {
      e.style.backgroundColor = `green`;
      Score++;
    } else {
      e.style.backgroundColor = `red`;
    }
    disableInput();
  });
});
window.onload = quiz();
nextBtn.addEventListener("click", getQuiz);

function getQuiz() {
  Qn++;
  EnableInput();
  quiz()
  checkQn(Qn);
}

const EnableInput = () => {
  for (let inp of inputBtn) {
    inp.disabled = false;
    inp.innerText = "";
    inp.style.backgroundColor = "";
  }
};
const disableInput = () => {
  for (let inp of inputBtn) {
    inp.disabled = true;
  }
};

function checkQn(Qn) {
  if (Qn == 10) {
    nextBtn.removeEventListener("click", getQuiz);
    submitBtn.addEventListener("click", () => {
      score.style.display = "flex";
      container.style.display = "none";
      const scoreheading = document.getElementById('scoreheading');
      scoreheading.innerHTML = `Your Score is : ${Score}`
    });
  }
}


refreshBtn.addEventListener('click', ()=>{
  Qn--;
  getQuiz()
});
