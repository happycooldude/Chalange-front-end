function start() {
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

function checkAnswer() {
    if (answerArray.length < numberOfQuestions) {
        answerArray.push(this.id);
        vraagArray.push(currentSubject);
        currentSubject++;
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    } else {
        gotoResults();
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

function back() {
    currentSubject--;
    title.innerHTML = subjects[currentSubject].title;
    statement.innerHTML = subjects[currentSubject].statement;
    colorButton();
    answerArray.pop(currentSubject);
    vraagArray.pop(currentSubject);
}

function gotoResults() {
    document.getElementById("vraagContainer").classList.remove("shown");
    document.getElementById("vraagContainer").classList.add("hidden");
    document.getElementById("uitslagContainer").classList.remove("hidden");
    document.getElementById("uitslagContainer").classList.add("shown");

    partyAssignPoints();
}

function partyAssignPoints() {
    for (let j in parties) {        // parties[0].name = "PVV"
        let points = 0
        let party = parties[j];
        let currentPartyName = party.name;  // "PVV"

        for (let x in subjects) {       // subjects[0].title = "Bindend referendum"     x = 0 ... 3
            let currentSubject = subjects[x];
            // kijk welk antwoord de huidige partij heeft gegevens
            let currentPartyPosition = null;
            for (let pos in currentSubject.parties) {
                if (currentSubject.parties[pos].name === currentPartyName) {
                    currentPartyPosition = currentSubject.parties[pos].position;
                }
            }
            // kijk of het antwoord van de PVV overeenkomt met mijn gegeven antwoord
            if (answerArray[x] === currentPartyPosition) {
                points++;
            }
        }
        parties[j].points = points;
        
    }

    //dont question it it works
    sortPoints();
    function sortPoints(){
            parties.sort(function (x, y){
            return y.points - x.points;
        });
        console.table(parties);
    }

    //laat de lijst met partijen en de punten zien op het scherm
    for(let g in parties){
    document.getElementById("uitslag").innerHTML += parties[g].name + ", ";
    document.getElementById("uitslag").innerHTML += parties[g].points + " punten ";
    document.getElementById("uitslag").innerHTML += parties[g].size + " zetels " + "<br>";
    }
}