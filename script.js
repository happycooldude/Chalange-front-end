function start(){
    document.getElementById("startContainer").classList.remove("shown");
    document.getElementById("startContainer").classList.add("hidden");
    document.getElementById("vraagContainer").classList.remove("hidden");
    document.getElementById("vraagContainer").classList.add("shown");
}

let currentSubject = 0;
let answerArray = [];
let vraagArray = [];

const eensBTN = document.getElementById("pro");
const geenVbeideBTN = document.getElementById("geenVbeide");
const oneensBTN = document.getElementById("contra");
const overslaanBTN = document.getElementById("overslaan");
const terugBTN = document.getElementById("back");

eensBTN.onclick = checkAnswer;
geenVbeideBTN.onclick = checkAnswer;
oneensBTN.onclick = checkAnswer;
overslaanBTN.onclick = checkAnswer;
terugBTN.onclick = back;

const numberOfQuestions = subjects.length;
const title = document.getElementById("title");
const statement = document.getElementById("statement");

title.innerHTML = subjects[currentSubject].title;
statement.innerHTML = subjects[currentSubject].statement;

function checkAnswer(){
    if (answerArray.length < numberOfQuestions) {
        console.log(currentSubject);
        answerArray.push(this.id);
        vraagArray.push(currentSubject);
        console.log(answerArray);
        console.log(vraagArray);
        currentSubject ++;
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    } else {
        document.getElementById("vraagContainer").classList.remove("shown");
        document.getElementById("vraagContainer").classList.add("hidden");
        document.getElementById("uitslagContainer").classList.remove("hidden");
        document.getElementById("uitslagContainer").classList.add("shown");
    }
}

function colorButton() {
    if (answerArray[currentSubject] == "pro") {
        eensBTN.style.backgroundColor = "#01b4dc";
        geenVbeideBTN.style.backgroundColor = "black";
        oneensBTN.style.backgroundColor = "black";
    }
    if (answerArray[currentSubject] == "geenVbeide") {
        geenVbeideBTN.style.backgroundColor = "#01b4dc";
        eensBTN.style.backgroundColor = "black";
        oneensBTN.style.backgroundColor = "black";
    }
    if (answerArray[currentSubject] == "contra") {
        oneensBTN.style.backgroundColor = "#01b4dc";
        eensBTN.style.backgroundColor = "black";
        geenVbeideBTN.style.backgroundColor = "black";
    }
}

function back(){
    currentSubject --;
    title.innerHTML = subjects[currentSubject].title;
    statement.innerHTML = subjects[currentSubject].statement;
    colorButton()
    answerArray.pop(currentSubject);
    vraagArray.pop(currentSubject);
    console.log(answerArray);
    console.log(vraagArray);
}