console.log("Verze 3.2")

// tlačítko změní všechny hodnoty
function randomize(){
    steps = Math.random() * 100;
    distance = Math.random() * 100;
    azm = Math.random() * 100;

    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    // odebere varování
    document.getElementById("debugnotice").innerHTML = "";
    document.getElementById("debugnotice").style.backgroundColor = "transparent";

    // Poznámka do konzole - tady mi AI od Googlu pomohlo se zaokrouhlením
    console.log("hodnoty změněny na", Math.round(steps),",", Math.round(distance),",", Math.round(azm));

    // Kontrola zda je cvičení dostatečné
    checkForExercise();

    // Kontrola zda jsou kroky dostatečné
    checkForSteps();

    // Kontrola zda je vzdálenost dostatečná
    checkForDistance();

    // Kontrola fajvek
    checkForGoalComplete();
}

function checkForExercise(){
    // Varování o málo cvičení
    if (azmprogress.value > 30) {
        document.getElementById("more_exercise_tip").innerHTML = ""
      }
    
    if (azmprogress.value < 30) {
        document.getElementById("more_exercise_tip").innerHTML = "You don't have enough exercise today"
    }
    // zobrazení procentuální hodnoty cvičení
    document.getElementById("azmprogresstext").innerHTML = Math.round(azmprogress.value) + "%";

    // Zde mi pomohlo AI od Googlu se zaokrouhlením
}

function checkForSteps(){
    // Varování o málo krocích
    if (stepsprogress.value > 30) {
        document.getElementById("more_steps_tip").innerHTML = ""
      }
    
    if (stepsprogress.value < 30) {
        document.getElementById("more_steps_tip").innerHTML = "You haven't met your step goal yet"
    }
    // zobrazení procentuální hodnoty kroků
    document.getElementById("stepsprogresstext").innerHTML = Math.round(stepsprogress.value) + "%";
}

function checkForDistance(){
    // Varování o málo ušlé vzdálenosti
    if (distanceprogress.value > 30) {
        document.getElementById("more_distance_tip").innerHTML = ""
      }
    
    if (distanceprogress.value < 30) {
        document.getElementById("more_distance_tip").innerHTML = "You haven't met your distance goal yet"
    }
    // zobrazení procentuální hodnoty vzdálenosti
    document.getElementById("distanceprogresstext").innerHTML = Math.round(distanceprogress.value) + "%";
}

// Kontrola zda jsou kroky dostatečné, přidá fajvku
function checkForGoalComplete() {
    if (stepsprogress.value >= 99) {
        document.getElementById("stepscheckmark").style.scale = 1;
    } else {
        document.getElementById("stepscheckmark").style.scale = 0;
    }

    if (distanceprogress.value >= 99) {
        document.getElementById("distancecheckmark").style.scale = 1;
    } else {
        document.getElementById("distancecheckmark").style.scale = 0;
    }

    if (azmprogress.value >= 99) {
        document.getElementById("azmcheckmark").style.scale = 1;
    } else {
        document.getElementById("azmcheckmark").style.scale = 0;
    }
}