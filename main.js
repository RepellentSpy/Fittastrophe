console.log("Verze 4.62")

// Po načtení
window.onload = function() {
    cookies_read();
    checkForGoalComplete();
    checkToShowHealthWarnings();
};

// Cookies
function cookies_read() {
    document.getElementById("stepsprogress").value = Cookies.get("steps");
    document.getElementById("distanceprogress").value = Cookies.get("distance");
    document.getElementById("azmprogress").value = Cookies.get("azm");
    display_percentages_sliders();
    removeMissingValueWarning();
}

function saveValuesToCookies() {
    // Všechny cookies vyprší za 1 den
    Cookies.set("steps", steps, { expires: 1 }); // Cookie jménem steps má hodnotu variablu steps a vyprší za 1 den
    Cookies.set("distance", distance, { expires: 1 });
    Cookies.set("azm", azm, { expires: 1 });
    console.log("uloženo do cookies")
}

// tlačítko změní všechny hodnoty na náhodné číslo
function randomize(){
    steps = Math.random() * 100;
    distance = Math.random() * 100;
    azm = Math.random() * 100;

    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    // Poznámka do konzole - tady mi AI od Googlu pomohlo se zaokrouhlením
    console.log(""); // prázdno pro oddělení od ostatních konzolových sdělení
    console.log("hodnoty změněny na", Math.round(steps),",", Math.round(distance),",", Math.round(azm));

    saveValuesToCookies();          // 1 Uloží hodnoty do souborů cookie pro automatické obnovení při načtení stránky
    display_percentages_sliders();  // 2 Zobrazí procentuální hodnotu cvičení (zaokrouhleno)
    checkToShowHealthWarnings();    // 3 Zkontroluje zda má uživatel dost kroků, vzdálenosti a cvičení
    checkForGoalComplete();         // 4 Kontrola zda se má zobrazit fajvka
    removeMissingValueWarning();    // 5 Odebere varování o chybících hodnotách
}

function removeMissingValueWarning() {
    // odebere varování
    document.getElementById("debugnotice").innerHTML = "";
    document.getElementById("debugnotice").style.backgroundColor = "transparent";
}

function display_percentages_sliders() {
    // zobrazení procentuální hodnoty cvičení
    document.getElementById("azmprogresstext").innerHTML = Math.round(azmprogress.value) + "%";

    // zobrazení procentuální hodnoty kroků
    document.getElementById("stepsprogresstext").innerHTML = Math.round(stepsprogress.value) + "%";

    // zobrazení procentuální hodnoty vzdálenosti
    document.getElementById("distanceprogresstext").innerHTML = Math.round(distanceprogress.value) + "%";
}

function checkToShowHealthWarnings(){
    // Varování o málo cvičení
    if (azmprogress.value > 30) {
        document.getElementById("more_exercise_tip").innerHTML = ""
      }
    
    if (azmprogress.value < 30) {
        document.getElementById("more_exercise_tip").innerHTML = "You don't have enough exercise today"
    }

    // Varování o málo krocích
    if (stepsprogress.value > 30) {
        document.getElementById("more_steps_tip").innerHTML = ""
      }
    
    if (stepsprogress.value < 30) {
        document.getElementById("more_steps_tip").innerHTML = "You haven't met your step goal yet"
    }

    // Varování o málo ušlé vzdálenosti
    if (distanceprogress.value > 30) {
        document.getElementById("more_distance_tip").innerHTML = ""
      }
    
    if (distanceprogress.value < 30) {
        document.getElementById("more_distance_tip").innerHTML = "You haven't met your distance goal yet"
    }
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

function removetestingbutton() { // Aktuálně nevyužito
    var element = document.getElementById("randomizebutton");
    element.parentNode.removeChild(element);
}

function setAllToMax() {
    steps = 100;
    distance = 100;
    azm = 100;

    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    display_percentages_sliders();
    checkForGoalComplete();
    removeMissingValueWarning();
    saveValuesToCookies();
    checkToShowHealthWarnings();
}