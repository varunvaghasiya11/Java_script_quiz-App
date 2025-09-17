let data = [{
    question: "Who won the ICC Cricket World Cup in 2019?",
    options: ["India", "England", "Australia", "New Zealand"],
    correct: "England"
},
{
    question: "What is the maximum number of players in a cricket team?",
    options: ["9", "10", "11", "12"],
    correct: "11"
},
{
    question: "Who holds the record for the fastest century in ODI cricket?",
    options: ["Virat Kohli", "AB de Villiers", "Chris Gayle", "Shahid Afridi"],
    correct: "AB de Villiers"
},
{
    question: "Which country hosted the first ever Cricket World Cup in 1975?",
    options: ["India", "England", "Australia", "Pakistan"],
    correct: "England"
},
{
    question: "What does LBW stand for in cricket?",
    options: ["Leg Before Wicket", "Long Ball Wide", "Line Behind Wicket", "Legs Beyond Wicket"],
    correct: "Leg Before Wicket"
},
{
    question: "Who is known as the 'God of Cricket'?",
    options: ["Brian Lara", "Muttiah Muralitharan", "Sachin Tendulkar", "Jacques Kallis"],
    correct: "Sachin Tendulkar"
},
{
    question: "How many runs are awarded for hitting the ball over the boundary without touching the ground?",
    options: ["4", "6", "2", "1"],
    correct: "6"
},
{
    question: "In cricket, what is a 'Duck'?",
    options: ["Scoring zero runs", "Hitting a six", "Taking a wicket", "A wide ball"],
    correct: "Scoring zero runs"
},
{
    question: "Which of these is NOT a type of cricket delivery?",
    options: ["Googly", "Doosra", "Off-spin", "Pin-spin"],
    correct: "Pin-spin"
},
{
    question: "What is the name of the trophy awarded in the ICC Test Championship?",
    options: ["Ashes Trophy", "ICC World Test Championship Mace", "Champions Trophy", "World Cup Trophy"],
    correct: "ICC World Test Championship Mace"
}];

let countdown = null;
let timing = 15;
let currentIndex = 0;
let score = 0;
let selectedIndex = null;
let startTime = null;
let endTime = null;

let quiz = document.getElementById('quiz');
quiz.style.display = 'none';

let start = document.getElementById('start');
let end = document.getElementById('close');
start.addEventListener('click',()=>{
    quiz.style.display = 'block';
    end.style.display = 'none';
    traketime();
})

lodequestion(currentIndex);

function lodequestion(index) {
    document.getElementById('question').innerHTML = data[index].question;
    document.getElementById('q1').innerHTML = data[index].options[0];
    document.getElementById('q2').innerHTML = data[index].options[1];
    document.getElementById('q3').innerHTML = data[index].options[2];
    document.getElementById('q4').innerHTML = data[index].options[3];
    document.getElementById('result').innerHTML = "";
    clearOptionHighlights();
    resetTime();
}

function resetTime() {
    clearInterval(countdown);
    timing = 15;
    displayTime();
    startTimer();
}

function displayTime() {
    let min = Math.floor(timing / 60);
    let sec = timing % 60;
    document.getElementById('timer').innerHTML = `${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
    countdown = setInterval(() => {
        if (timing > 0) {
            timing--;
            displayTime();
        } else {
            clearInterval(countdown);
            nextquestion();
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    clearInterval(countdown);

    const selectedAnswer = data[currentIndex].options[selectedIndex];
    const correctAnswer = data[currentIndex].correct;

    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById(`q${selectedIndex + 1}`).style.backgroundColor = 'green';
    } else {
        document.getElementById(`q${selectedIndex + 1}`).style.backgroundColor = 'red';
    }

    setTimeout(nextquestion, 300);
}

function nextquestion() {
    currentIndex++;
    if (currentIndex < data.length) {
        lodequestion(currentIndex);
    } else {
        Quizresult();
    }
}

function clearOptionHighlights() {
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`q${i}`);
        btn.classList.remove('selected');
        btn.style.backgroundColor = '';
    }
}

let totaltime = 0;
function traketime(){
    totaltime = 0;
    let endtime = setInterval(()=>{
        totaltime++;
    },1000);
}
function Quizresult() {
    clearInterval(traketime);
    let timeTakenSec = totaltime;
    
    document.getElementById('total-questions').innerHTML = data.length;
    document.getElementById('correct-answers').innerHTML = score;
    document.getElementById('final-score').innerHTML = `${score} / ${data.length}`;
    document.getElementById('total-time').innerHTML = timeTakenSec;
    document.getElementById('result-summary').style.display = 'block';
}

document.getElementById('retry-btn').addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    document.getElementById('result-summary').style.display = 'none';
    lodequestion(currentIndex);
});
