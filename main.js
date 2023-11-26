console.log("#️⃣ Verze 4.8.5 EX-FB(v0.32)")
console.log("⚠️ Varování: Tato verze je experimentální")
console.log("Věci nemusí vždy fungovat, mohou se zde objevovat také věci, se kterými neumím dostatečně dobře pracovat")
console.log("")

// Po načtení
window.onload = function () {
    try { // toto se stará o onload funkce "Dashboard" stránku
        cookies_read();
        checkForGoalComplete();
        checkToShowHealthWarnings();
        document.getElementById("weight").innerHTML = Cookies.get("weight") || "60.2kg"
    } catch (e) { // a toto o onload funkce na "Your Profile" podstránce
        document.getElementById("full_name").innerHTML = Cookies.get("full_name") || "George Washington"; // Zobrazí z cookies jméno uživatele - Vychozí jméno: George Washington
        document.getElementById("weight_indicator").innerHTML = Cookies.get("weight");
    }
    // Občas to hodí chybu, ale to je umýsl. Do budoucnosti bych toto chtěl vyřešit jinak. Toto je hloupé řešení.
};

// Cookies
function cookies_read() {
    document.getElementById("stepsprogress").value = Cookies.get("steps");
    document.getElementById("distanceprogress").value = Cookies.get("distance");
    document.getElementById("azmprogress").value = Cookies.get("azm");
    display_percentages_sliders();
    removeMissingValueWarning();

    // Aplikovat uložené hodnoty na debug slidery
    document.getElementById("steps_debug_slider").value = Cookies.get("steps")
    document.getElementById("distance_debug_slider").value = Cookies.get("distance")
    document.getElementById("azm_debug_slider").value = Cookies.get("azm")
}

function saveValuesToCookies() {
    // Všechny cookies vyprší za 1 den
    Cookies.set("steps", steps, { expires: 1 }); // Cookie jménem steps má hodnotu variablu steps a vyprší za 1 den
    Cookies.set("distance", distance, { expires: 1 });
    Cookies.set("azm", azm, { expires: 1 });
    console.log("uloženo do cookies");
}

// tlačítko změní všechny hodnoty na náhodné číslo
function randomize() {
    steps = Math.random() * 100;
    distance = Math.random() * 100;
    azm = Math.random() * 100;

    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    // Poznámka do konzole - tady mi AI od Googlu pomohlo se zaokrouhlením
    console.log(""); // prázdno pro oddělení od ostatních konzolových sdělení
    console.log("hodnoty změněny na", Math.round(steps), ",", Math.round(distance), ",", Math.round(azm));

    saveValuesToCookies();          // 1 Uloží hodnoty do souborů cookie pro automatické obnovení při načtení stránky
    display_percentages_sliders();  // 2 Zobrazí procentuální hodnotu cvičení (zaokrouhleno)
    checkToShowHealthWarnings();    // 3 Zkontroluje zda má uživatel dost kroků, vzdálenosti a cvičení
    checkForGoalComplete();         // 4 Kontrola zda se má zobrazit fajvka
    removeMissingValueWarning();    // 5 Odebere varování o chybících hodnotách
}

function removeMissingValueWarning() { // odebere varování
    document.getElementById("debugnotice").innerHTML = "";
    document.getElementById("debugnotice").style.backgroundColor = "transparent";
}

function display_percentages_sliders() {
    document.getElementById("azmprogresstext").innerHTML = Math.round(azmprogress.value) + "%";  // zobrazení procentuální hodnoty cvičení
    document.getElementById("stepsprogresstext").innerHTML = Math.round(stepsprogress.value) + "%"; // zobrazení procentuální hodnoty kroků
    document.getElementById("distanceprogresstext").innerHTML = Math.round(distanceprogress.value) + "%"; // zobrazení procentuální hodnoty vzdálenosti
}

function checkToShowHealthWarnings() {
    if (azmprogress.value > 30) { // Varování o málo cvičení
        document.getElementById("more_exercise_tip").innerHTML = "";
    } else {
        document.getElementById("more_exercise_tip").innerHTML = "You haven't met your exercise goal yet";
    }

    if (stepsprogress.value > 30) { // Varování o málo krocích
        document.getElementById("more_steps_tip").innerHTML = "";
    } else {
        document.getElementById("more_steps_tip").innerHTML = "You haven't met your step goal yet";
    }

    if (distanceprogress.value > 30) { // Varování o málo ušlé vzdálenosti
        document.getElementById("more_distance_tip").innerHTML = ""
    } else {
        document.getElementById("more_distance_tip").innerHTML = "You haven't met your distance goal yet";
    }
}

function checkForGoalComplete() { // Kontrola zda jsou splněny cíle, přidá fajvku pokud ano
    if (stepsprogress.value >= 100) {
        document.getElementById("stepscheckmark").style.animation = "checkmark_appear 0.3s forwards";
    } else {
        document.getElementById("stepscheckmark").style.animation = "checkmark_disappear 0.3s forwards";
    }

    if (distanceprogress.value >= 100) {
        document.getElementById("distancecheckmark").style.animation = "checkmark_appear 0.3s forwards";
    } else {
        document.getElementById("distancecheckmark").style.animation = "checkmark_disappear 0.3s forwards";
    }

    if (azmprogress.value >= 100) {
        document.getElementById("azmcheckmark").style.animation = "checkmark_appear 0.3s forwards";
    } else {
        document.getElementById("azmcheckmark").style.animation = "checkmark_disappear 0.3s forwards";
    }
}

function removetestingbutton() { // Skrytá funkce, aktivuje se kliknutím na logo
    var element = document.getElementById("randomizebutton");
    element.parentNode.removeChild(element);
    var element_two = document.getElementById("Maxpercentbutton");
    element_two.parentNode.removeChild(element_two);
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

function name_button() { // Zobrazí po stisknutí tlačítka pole na psaní
    document.getElementById("name_input").style.animation = "name_box_appear 0.2s forwards";
    document.getElementById("name_input").style.scale = 1;
    var element = document.getElementById("name_button");
    element.parentNode.removeChild(element);
}

function change_name() { // Změní jméno uživatele a uloží do cookies, potom nahoře ve window.onload se jméno obnovuje
    var new_name = document.getElementById("name_input").value;
    document.getElementById("full_name").innerHTML = new_name;
    Cookies.set("full_name", new_name, { expires: 7 });
}

function change_weight() {
    var new_weight = document.getElementById("weight_input").value;
    if (new_weight > 20) {
        Cookies.set("weight", new_weight + " kg", { expires: 7 });
        document.getElementById("weight_indicator").innerHTML = new_weight + " kg";
    } else {
        alert("Error: Weight not set, weight is too low");
    }
}

function open_debug() {
    const debugMenu = document.getElementById('debug_menu');
    const currentVisibility = debugMenu.style.visibility;
    if (currentVisibility === 'visible') {
        close_debug();
    } else {
        debugMenu.style.visibility = 'visible';
        document.getElementById("debug_menu").style.animation = "debug_appear 0.3s forwards";
    }
}

function close_debug() {
    document.getElementById("debug_menu").style.animation = "debug_disappear 0.3s forwards";
    setTimeout(function () {
        document.getElementById("debug_menu").style.visibility = "hidden";
    }, 500);
}

function debug_stepsChange() {
    var debug_stepsOverride_value = document.getElementById("steps_debug_slider").value;
    document.getElementById("stepsprogress").value = debug_stepsOverride_value;
    document.getElementById("stepsprogresstext").innerHTML = debug_stepsOverride_value + "%";
    Cookies.set("steps", debug_stepsOverride_value);
    removeMissingValueWarning();
    checkToShowHealthWarnings();
    checkForGoalComplete();
}

function debug_distanceChange() {
    var debug_distanceOverride_value = document.getElementById("distance_debug_slider").value;
    document.getElementById("distanceprogress").value = debug_distanceOverride_value;
    document.getElementById("distanceprogresstext").innerHTML = debug_distanceOverride_value + "%";
    Cookies.set("distance", debug_distanceOverride_value);
    removeMissingValueWarning();
    checkToShowHealthWarnings();
    checkForGoalComplete();
}

function debug_azmChange() {
    var debug_azmOverride_value = document.getElementById("azm_debug_slider").value;
    document.getElementById("azmprogress").value = debug_azmOverride_value;
    document.getElementById("azmprogresstext").innerHTML = debug_azmOverride_value + "%";
    Cookies.set("azm", debug_azmOverride_value);
    removeMissingValueWarning();
    checkToShowHealthWarnings();
    checkForGoalComplete();
}

function clearAllValues() {
    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = 0;
    document.getElementById("distanceprogress").value = 0;
    document.getElementById("azmprogress").value = 0;
    Cookies.remove("steps");
    Cookies.remove("distance");
    Cookies.remove("azm");
    window.location.reload();
}