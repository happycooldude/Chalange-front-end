function start() {
    document.getElementById("startContainer").classList.remove("shown");
    document.getElementById("startContainer").classList.add("hidden");
    document.getElementById("vraagContainer").classList.remove("hidden");
    document.getElementById("vraagContainer").classList.add("shown");
}

const groot = 10;
let currentSubject = 0;
let answerArray = [];

const eensBTN = document.getElementById("pro");
const geenVbeideBTN = document.getElementById("geenVbeide");
const oneensBTN = document.getElementById("contra");
const overslaanBTN = document.getElementById("overslaan");
const terugBTN = document.getElementById("back");
const gotoResult = document.getElementById("gotoResult");
const seculair = document.getElementById("seculair");
const grotePartij = document.getElementById("groot");
const alles = document.getElementById("alles");

const numberOfQuestions = subjects.length;
const title = document.getElementById("title");
const statement = document.getElementById("statement");

eensBTN.onclick = checkAnswer;
geenVbeideBTN.onclick = checkAnswer;
oneensBTN.onclick = checkAnswer;
overslaanBTN.onclick = checkAnswer;
terugBTN.onclick = back;
gotoResult.onclick = gotoResults;

title.innerHTML = subjects[currentSubject].title;
statement.innerHTML = subjects[currentSubject].statement;

function checkAnswer() {
    eensBTN.style.backgroundColor = "black";
    geenVbeideBTN.style.backgroundColor = "black";
    oneensBTN.style.backgroundColor = "black";

    if (answerArray.length < numberOfQuestions) {
        answerArray.push(this.id);
        currentSubject++;
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    } else {
        gotobelangrijk();
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
    if (currentSubject >= 1) {
        currentSubject--;
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
        colorButton();
        answerArray.pop(currentSubject);
    }
}

function gotobelangrijk() {
    document.getElementById("vraagContainer").classList.remove("shown");
    document.getElementById("vraagContainer").classList.add("hidden");
    document.getElementById("belangrijk").classList.remove("hidden");
    document.getElementById("belangrijk").classList.add("shown");
    createImportant();
}

function createImportant() { //maak een grid van 3 breed aan met alle vragen
    for (let index = 0; index < subjects.length; index++) {
        var container = document.getElementById("grid");
        var cell = document.createElement("div");
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", 1);
        checkbox.setAttribute("id", index);
        cell.innerHTML += subjects[index].title + " ";

        container.appendChild(cell);
        cell.appendChild(checkbox);
    }
}

var checkboxArray = [];

function testcheckboxes() { //Loop door de checkboxes heen en laat de waardes in een array zien.
    for (let checkboxID = 0; checkboxID < subjects.length; checkboxID++) {
        var checkbox = document.getElementById(checkboxID);
        if (checkbox.checked) {
            subjects[checkboxID].weight = 2;
        } else {
            subjects[checkboxID].weight = 1;
        }
    }
    console.table(subjects);
}

function gotoResults() {
    document.getElementById("belangrijk").classList.remove("shown");
    document.getElementById("belangrijk").classList.add("hidden");
    document.getElementById("uitslagContainer").classList.remove("hidden");
    document.getElementById("uitslagContainer").classList.add("shown");

    testcheckboxes();
    partyAssignPoints();
}

function partyAssignPoints() {
    for (let tellerParties in parties) { // Loop door parties heen.
        let points = 0 //Maakt de var points aan met de waarde 0. tellerttellerPartiese.
        let party = parties[tellerParties]; //Maakt een var aan met de waarde van de current positie in de parties array.
        let currentPartyName = party.name; //Maakt een var met de naam van de partij waar we nu mee bezig zijn.

        for (let tellerSubjects in subjects) { // Loopt door de array subjects heen.
            let currentSubject = subjects[tellerSubjects]; //Maakt een var aan met de waarde van het subject waar we nu mee bezig zijn.
            // kijk welk antwoord de huidige partij heeft gegevens
            let currentPartyPosition = null; //Maakt variable aan voor de position van de partij waar we nu mee bezig zijn.
            for (let tellerSubjectParties in currentSubject.parties) { //loop door de parties van de subject waar we nu mee bezig zijn.
                if (currentSubject.parties[tellerSubjectParties].name === currentPartyName) { //Kijk of de naam van de partij overeenkomt met de partijen uit deze vraag.
                    currentPartyPosition = currentSubject.parties[tellerSubjectParties].position; //Als de namen overeenkomen stop de positie van de partij in de var currentPartyPosition.
                }
            }
            //Je bent uit de loop.
            // kijk of de mening van de partij overeenkomt met het gegeven antwoord
            if (answerArray[tellerSubjects] === currentPartyPosition) { //Als de mening van de partij overeenkomt met het gegeven antwoord
                points++; //Dan +1 punt bij de variable optellen.
                if (subjects[tellerSubjects].weight === 2) { //als de vraag geselecteerd is als belangrijk tel er nog 1 punt bij op.
                    points++;
                }
            }
        }
        parties[tellerParties].pointsVariable = points; //Geeft de puntervar aan de parties array, en geeft het de waarde van de punten mee.
    }

    //it just works
    sortPoints();

    function sortPoints() {
        parties.sort(function (x, y) {
            return y.pointsVariable - x.pointsVariable;
        });
        console.table(parties);
    }

    //laat de lijst met partijen en de punten zien op het scherm en sorteerd afhankelijk welke radio button geselecteerd is.

    if (seculair.checked == true) {
        let secular = parties.filter(function (parties) {
            return parties.secular == true;
        });

        for (let g in secular) {
            document.getElementById("uitslag").innerHTML += secular[g].name + ", ";
            document.getElementById("uitslag").innerHTML += secular[g].pointsVariable + " punten " + "<br>";
        }
    } else if (grotePartij.checked == true) {
        let big = parties.filter(function (parties) {
            return parties.size >= groot;
        });
        for (let g in parties) {
            document.getElementById("uitslag").innerHTML += big[g].name + ", ";
            document.getElementById("uitslag").innerHTML += big[g].pointsVariable + " punten " + "<br>";
        }
    } else if (alles.checked == true) {
        for (let g in parties) {
            document.getElementById("uitslag").innerHTML += parties[g].name + ", ";
            document.getElementById("uitslag").innerHTML += parties[g].pointsVariable + " punten " + "<br>";
        }
    } else {
        for (let g in parties) {
            document.getElementById("uitslag").innerHTML += parties[g].name + ", ";
            document.getElementById("uitslag").innerHTML += parties[g].pointsVariable + " punten " + "<br>";
        }
    }
}