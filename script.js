// ==========================================
// NOTE CALC – Schweizer Notenrechner
// ==========================================


// HTML Elemente
const pointsInput = document.getElementById("points");
const maxPointsInput = document.getElementById("maxPoints");

const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");

const errorElement = document.getElementById("error");
const resultElement = document.getElementById("result");

const gradeElement = document.getElementById("grade");
const percentageElement = document.getElementById("percentage");
const statusElement = document.getElementById("status");


// ==========================================
// NOTE BERECHNEN
// ==========================================

function calculateGrade() {

    const points = parseFloat(pointsInput.value);
    const maxPoints = parseFloat(maxPointsInput.value);

    // Fehlermeldung löschen
    errorElement.textContent = "";


    // ==========================================
    // Eingaben überprüfen
    // ==========================================

    if (isNaN(points) || isNaN(maxPoints)) {

        errorElement.textContent =
            "Bitte gib beide Punktzahlen ein.";

        return;
    }


    if (maxPoints <= 0) {

        errorElement.textContent =
            "Die maximale Punktzahl muss grösser als 0 sein.";

        return;
    }


    if (points < 0) {

        errorElement.textContent =
            "Die erreichten Punkte dürfen nicht negativ sein.";

        return;
    }


    if (points > maxPoints) {

        errorElement.textContent =
            "Die erreichten Punkte dürfen nicht höher als die maximale Punktzahl sein.";

        return;
    }


    // ==========================================
    // PROZENT BERECHNEN
    // ==========================================

    const percentage = (points / maxPoints) * 100;


    // ==========================================
    // SCHWEIZER NOTE
    // ==========================================

    const grade = 1 + (5 * points / maxPoints);


    // ==========================================
    // ERGEBNIS ANZEIGEN
    // ==========================================

    gradeElement.textContent = grade.toFixed(2);

    percentageElement.textContent =
        percentage.toFixed(2) + " %";

    resultElement.classList.add("active");


    // ==========================================
    // BESTANDEN / NICHT BESTANDEN
    // ==========================================

    if (grade >= 4) {

        statusElement.textContent = "✓ Bestanden";

        statusElement.classList.remove("failed");
        statusElement.classList.add("passed");

    } else {

        statusElement.textContent = "✕ Nicht bestanden";

        statusElement.classList.remove("passed");
        statusElement.classList.add("failed");
    }
}


// ==========================================
// NUR BEIM KLICK AUF "NOTE BERECHNEN"
// ==========================================

calculateButton.addEventListener("click", calculateGrade);


// ==========================================
// ENTER-TASTE
// ==========================================

pointsInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        calculateGrade();
    }

});


maxPointsInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        calculateGrade();
    }

});


// ==========================================
// ZURÜCKSETZEN
// ==========================================

resetButton.addEventListener("click", function() {

    pointsInput.value = "";
    maxPointsInput.value = "";

    gradeElement.textContent = "—";

    percentageElement.textContent = "—";

    statusElement.textContent = "Punkte eingeben";

    errorElement.textContent = "";

    resultElement.classList.remove("active");

    statusElement.classList.remove("passed");
    statusElement.classList.remove("failed");

    pointsInput.focus();

});