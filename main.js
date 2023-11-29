console.log("#️⃣ Verze 4.9.3 Main")

// Po načtení
window.onload = function () {
    try { // toto se stará o onload funkce "Dashboard" stránky
        show_nodata_warning() // Zkontroluje zda jsou definovaná data, pokud ne, ukáže uživateli varování
        cookies_read(); // zkontroluje hodnoty uložené v cookies a aplikuje je to na fitness statistiky
        checkForGoalComplete(); // Zkontroluje zda jsou splněny cíle, přidá fajvku pokud ano
        checkToShowHealthWarnings(); // Zkontroluje zda zobrazit nějaké doporučení (více kroků atd)
        document.getElementById("weight").innerHTML = Cookies.get("weight") + " kg" // zkontroluje z cookies váhu uživatele
        calculateBMI() // Vypočítá BMI a aplikuje ho
    } catch (e) { // toto se stará o onload funkce na "Your Profile" podstránce
        document.getElementById("full_name").innerHTML = Cookies.get("full_name") || "George Washington"; // Zobrazí z cookies jméno uživatele - Vychozí jméno: George Washington
        document.getElementById("weight_indicator").innerHTML = "Weight: " + Cookies.get("weight") + " kg"; // Zobrazí váhu z cookies
        document.getElementById("height_indicator").innerHTML = "Height: " + Cookies.get("height") + " cm"; // Zobrazí výšku z cookies
    } // Občas to hodí chybu, ale to je umýsl. Do budoucnosti bych toto chtěl vyřešit jinak. Toto je hloupé řešení.
};

// Přečte cookies a aplikuje hodnoty na fitness statistiky
function cookies_read() {
    document.getElementById("stepsprogress").value = Cookies.get("steps");
    document.getElementById("distanceprogress").value = Cookies.get("distance");
    document.getElementById("azmprogress").value = Cookies.get("azm");
    display_percentages_sliders(); // Zobrazí pod progress bary procentuální hodnotu
    removeMissingValueWarning(); // Odebere varování o chybějících hodnotách, pokud se zobrazuje

    // Aplikovat uložené hodnoty do debug menu na posuvníky
    document.getElementById("steps_debug_slider").value = Cookies.get("steps")
    document.getElementById("distance_debug_slider").value = Cookies.get("distance")
    document.getElementById("azm_debug_slider").value = Cookies.get("azm")
}

function saveValuesToCookies() { // Funkce ukládající hodnoty do cookies
    // Všechny cookies vyprší za 1 den (pro experimentální účely)
    Cookies.set("steps", steps, { expires: 1 }); // Cookie jménem steps má hodnotu variablu steps a vyprší za 1 den
    Cookies.set("distance", distance, { expires: 1 });
    Cookies.set("azm", azm, { expires: 1 });
    console.log("uloženo do cookies");
} // Do budoucnosti bych chtěl stránku napojit na databázi a ukládat to tam, už s tím experimentuji :D

// tlačítko změní všechny hodnoty na náhodné číslo
function randomize() {
    // Určí náhodnou hodnotu od 0 do 1 a vynásobí ji 100, aby z toho bylo procento
    steps = Math.random() * 100;
    distance = Math.random() * 100;
    azm = Math.random() * 100;

    // Aplikuje hodnoty do progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    // Poznámka do konzole
    console.log(""); // prázdné sdělení pro oddělení od ostatních konzolových sdělení (kvůli pořádku)
    console.log("hodnoty změněny na", Math.round(steps), ",", Math.round(distance), ",", Math.round(azm)); // Sdělí na jaké hodnoty to bylo změněno

    saveValuesToCookies();          // Uloží hodnoty do souborů cookie pro automatické obnovení při načtení stránky (obnovuje funkce read_cookies)
    display_percentages_sliders();  // Zobrazí procentuální hodnotu cvičení (zaokrouhleno)
    checkToShowHealthWarnings();    // Zkontroluje zda má uživatel dost kroků, vzdálenosti a cvičení - pokud ne, ukáže doporučení
    checkForGoalComplete();         // Kontrola zda má uživatel na jakémkoliv cíli 100%, pokud ano, zobrazí se fajvka
    removeMissingValueWarning();    // Odebere varování o chybících hodnotách, pokud se zobrazuje

    // Změnit hodnoty posuvníků v debug menu
    document.getElementById("steps_debug_slider").value = Cookies.get("steps")
    document.getElementById("distance_debug_slider").value = Cookies.get("distance")
    document.getElementById("azm_debug_slider").value = Cookies.get("azm")
}

function removeMissingValueWarning() { // odebere varování o neurčených hodnotách, pokud se zobrazuje
    document.getElementById("debugnotice").innerHTML = "";
    document.getElementById("debugnotice").style.backgroundColor = "transparent";
}

function display_percentages_sliders() { // zobrazí pod progress bary procentuální hodnoty
    document.getElementById("azmprogresstext").innerHTML = Math.round(azmprogress.value) + "%";  // zobrazení procentuální hodnoty cvičení
    document.getElementById("stepsprogresstext").innerHTML = Math.round(stepsprogress.value) + "%"; // zobrazení procentuální hodnoty kroků
    document.getElementById("distanceprogresstext").innerHTML = Math.round(distanceprogress.value) + "%"; // zobrazení procentuální hodnoty vzdálenosti
}

// Zkontroluje zda má uživatel dost kroků, vzdálenosti a cvičení
// Pokud ne, ukáže doporučení, že by měl zamakat
function checkToShowHealthWarnings() {
    if (azmprogress.value > 30) { // Varování o málo cvičení
        document.getElementById("more_exercise_tip").innerHTML = ""; // Dostatek cviku
    } else {
        document.getElementById("more_exercise_tip").innerHTML = "You haven't met your exercise goal yet"; // Nedostatek cviku
    }

    if (stepsprogress.value > 30) { // Varování o málo krocích
        document.getElementById("more_steps_tip").innerHTML = ""; // Dostatek kroků
    } else {
        document.getElementById("more_steps_tip").innerHTML = "You haven't met your step goal yet"; // Nedostatek kroků
    }

    if (distanceprogress.value > 30) { // Varování o málo ušlé vzdálenosti
        document.getElementById("more_distance_tip").innerHTML = "" // Dostatek vzdálenosti
    } else {
        document.getElementById("more_distance_tip").innerHTML = "You haven't met your distance goal yet"; // Nedostatek vzdálenosti
    }
}

// Kontrola zda je cíl splněn, u každého splněného cíle (100%) přidá fajvku s animací
// Funkce se také stará o odebrání fajvky, pokud není cíl splněn
function checkForGoalComplete() {
    if (stepsprogress.value >= 100) {
        document.getElementById("stepscheckmark").style.animation = "checkmark_appear 0.3s forwards"; // Cíl kroků je splněn
    } else {
        document.getElementById("stepscheckmark").style.animation = "checkmark_disappear 0.3s forwards"; // Cíl kroků není splněn
    }

    if (distanceprogress.value >= 100) {
        document.getElementById("distancecheckmark").style.animation = "checkmark_appear 0.3s forwards"; // Cíl vzdálenosti je splněn
    } else {
        document.getElementById("distancecheckmark").style.animation = "checkmark_disappear 0.3s forwards"; // Cíl vzdálenosti není splněn
    }

    if (azmprogress.value >= 100) {
        document.getElementById("azmcheckmark").style.animation = "checkmark_appear 0.3s forwards"; // Cíl cvičení je splněn
    } else {
        document.getElementById("azmcheckmark").style.animation = "checkmark_disappear 0.3s forwards"; // Cíl cvičení není splněn
    }
}

// Aktuálně nevyužitá funkce, odebere debug menu - pokud použita, header se rozbije
function hide_debug() {
    var remove_element = document.getElementById("open_debug_button");
    if (remove_element) {
        remove_element.parentNode.removeChild(remove_element);
    }
}

// Nastaví kroky, vzdálenost a cvičení na 100%
function setAllToMax() {
    steps = 100;
    distance = 100;
    azm = 100;

    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = steps;
    document.getElementById("distanceprogress").value = distance;
    document.getElementById("azmprogress").value = azm;

    display_percentages_sliders();  // Aktualizuje procentuální hodnoty pod progress bary
    checkForGoalComplete();         // Zkontroluje zda je nějaký cíl hotov a přidá případně fajvku
    removeMissingValueWarning();    // Odebere varování o neurčených hodnotách, pokud se zobrazuje
    saveValuesToCookies();          // Uloží nové hodnoty do cookies
    checkToShowHealthWarnings();    // Zkontroluje zda by se mělo ukázat doporučení (více kroků atd) a připadně ho zobrazí

    // Změnit hodnoty sliderů v debug menu na nové
    document.getElementById("steps_debug_slider").value = Cookies.get("steps")
    document.getElementById("distance_debug_slider").value = Cookies.get("distance")
    document.getElementById("azm_debug_slider").value = Cookies.get("azm")
}

function name_button() { // Zobrazí po stisknutí tlačítka na změnu jména pole na psaní
    document.getElementById("name_input").style.animation = "name_box_appear 0.2s forwards"; // animace
    document.getElementById("name_input").style.scale = 1; // zobrazí pole na změnu jména
    var element = document.getElementById("name_button"); // vybere prvek name_button (tlačítko na změnu jména)
    element.parentNode.removeChild(element); // odebere tlačítko na změnu jména
}

function change_name() { // Změní jméno uživatele a uloží do cookies, potom nahoře ve window.onload se jméno obnovuje
    var new_name = document.getElementById("name_input").value;     // new_name = hodnota pole "name_input"
    document.getElementById("full_name").innerHTML = new_name;      // Nastaví text s id "full_name" na hodnotu new_name
    Cookies.set("full_name", new_name, { expires: 7 });             // Uloží nové jméno do cookies na 7 dní
}

function change_height() { // Změní jméno uživatele a uloží do cookies, potom nahoře ve window.onload se jméno obnovuje
    var new_height = document.getElementById("height_input").value;                             // new_height = hodnota pole "height_input"
    document.getElementById("height_indicator").innerHTML = "Height: " + new_height + " cm";    // Změní text s id "height_indicator" na výsku, za výšku napíše "cm" a před ni "Height:"
    Cookies.set("height", new_height, { expires: 7 });                                          // Výška je uložena do cookies na 7 dní
}

// Změní váhu v cookies a na podstránce Your Profile
function change_weight() {
    var new_weight = document.getElementById("weight_input").value;                                 // Získá novou váhu z input pole a uloží ji pod "new_weight"
    if (new_weight >= 20) {                                                                         // Pokud je nová váha větší nebo rovna 20,
        Cookies.set("weight", new_weight, { expires: 7 });                                          // Uloží novou váhu do cookies.
        document.getElementById("weight_indicator").innerHTML = "Weight: " + new_weight + " kg";    // Zobrazí novou váhu na podstránce.
    } else {                                                                                        // Pokud je nová váha menší než 20,
        alert("Error: Weight not set, weight is too low");                                          // Zobrazí chybovou hlášku, protože váha menší než 20 je blbost
    // Upřímně, i váha "20" je blbost, ale rozhodl jsem se zde stanovit minimální hranici
    }
}

// Přepíná stav debug_menu mezi otevřeným a zavřeným
function open_debug() {
    const debugMenu = document.getElementById('debug_menu'); // získá prvek debug_menu z index.html
    const currentVisibility = debugMenu.style.visibility; // Získá aktuální viditelnost debug_menu
    if (currentVisibility === 'visible') { // Pokud je debug_menu viditelné
        close_debug(); // Zavře debug_menu
    } else { // Pokud je debug_menu neviditelné
        debugMenu.style.visibility = 'visible'; // Nastaví viditelnost debug_menu na viditelné
        document.getElementById("debug_menu").style.animation = "debug_appear 0.3s forwards"; // Animace otevírání debug_menu
    }
}

// Pouze zavře debug_menu. Tato funkce je využita křížkem v debug_menu.
function close_debug() {
    document.getElementById("debug_menu").style.animation = "debug_disappear 0.3s forwards"; // Animace zavírání debug_menu
    setTimeout(function () {
        document.getElementById("debug_menu").style.visibility = "hidden"; // Skryje debug_menu za 0.5s (čas animace + 0.2s pro jistotu)
    }, 500);
}

// Změna hodnoty kroků v debug menu pomocí slideru
function debug_stepsChange() {
    var debug_stepsOverride_value = document.getElementById("steps_debug_slider").value; // Získá hodnotu kroků z debug slideru
    document.getElementById("stepsprogress").value = debug_stepsOverride_value; // Nastaví hodnotu kroků v progress baru (v sidebaru)
    document.getElementById("stepsprogresstext").innerHTML = debug_stepsOverride_value + "%"; // Nastaví text hodnoty kroků pod progress barem
    Cookies.set("steps", debug_stepsOverride_value, { expires: 7 }); // Uloží novou hodnotu kroku do cookies
    removeMissingValueWarning(); // Odebere varování o chybějících hodnotách (pokud se zobrazuje)
    checkToShowHealthWarnings(); // Zkontroluje, zda se má zobrazit varování o zdraví (málo kroků atd)
    checkForGoalComplete(); // Zkontroluje, zda se má zobrazit fajfka u jakékoliv statistiky (pokud je dosaženo cíle)
}

// Změna hodnoty vzdálenosti v debug menu pomocí slideru
function debug_distanceChange() {
    var debug_distanceOverride_value = document.getElementById("distance_debug_slider").value; // Získá hodnotu vzdálenosti z debug slideru
    document.getElementById("distanceprogress").value = debug_distanceOverride_value; // Nastaví hodnotu vzdálenosti v progress baru (v sidebaru)
    document.getElementById("distanceprogresstext").innerHTML = debug_distanceOverride_value + "%"; // Nastaví text hodnoty vzdálenosti pod progress barem
    Cookies.set("distance", debug_distanceOverride_value, { expires: 7 }); // Uloží novou hodnotu vzdálenosti do cookies
    removeMissingValueWarning(); // Odebere varování o chybějících hodnotách (pokud se zobrazuje)
    checkToShowHealthWarnings(); // Zkontroluje, zda se má zobrazit varování o zdraví (málo kroků atd)
    checkForGoalComplete(); // Zkontroluje, zda se má zobrazit fajfka u jakékoliv statistiky (pokud je dosaženo cíle)
}

// Změna hodnoty cvičení v debug menu pomocí slideru
function debug_azmChange() {
    var debug_azmOverride_value = document.getElementById("azm_debug_slider").value; // Získá hodnotu cvičení z debug slideru
    document.getElementById("azmprogress").value = debug_azmOverride_value; // Nastaví hodnotu cvičení v progress baru (v sidebaru)
    document.getElementById("azmprogresstext").innerHTML = debug_azmOverride_value + "%"; // Nastaví text hodnoty cvičení pod progress barem
    Cookies.set("azm", debug_azmOverride_value, { expires: 7 }); // Uloží novou hodnotu cvičení do cookies
    removeMissingValueWarning(); // Odebere varování o chybějících hodnotách (pokud se zobrazuje)
    checkToShowHealthWarnings(); // Zkontroluje, zda se má zobrazit varování o zdraví (málo kroků atd)
    checkForGoalComplete(); // Zkontroluje, zda se má zobrazit fajfka u jakékoliv statistiky (pokud je dosaženo cíle)
}

function clearAllValues() { // Smaže veškeré hodnoty pro progress bary a obnoví stránku
    // změnit hodnoty progress barů
    document.getElementById("stepsprogress").value = 0;
    document.getElementById("distanceprogress").value = 0;
    document.getElementById("azmprogress").value = 0;

    // Změnit hodnoty debug sliderů
    document.getElementById("steps_debug_slider").value = 0;
    document.getElementById("distance_debug_slider").value = 0;
    document.getElementById("azm_debug_slider").value = 0;

    // Odebírání hondot z cookies, refresh stránky
    Cookies.remove("steps");
    Cookies.remove("distance");
    Cookies.remove("azm");
    window.location.reload();
}

// Animuje šipku u článku, přejde na čtečku článků
function arrow_forward_animate() {
    document.getElementById("arrow_forward").style.animation = "arrow_cycle 1.1s forwards"; // Animace šipky
    document.body.style.animation = "scale_out 0.5s forwards"; // Zbytek obrazovky se oddálí
    setTimeout(function () { // po 100 ms se zvětší kliknutý článek
        document.getElementById("sleep_article").style.animation = "special_article1_expand 0.8s forwards";
    }, 130);
    document.getElementById("sleep_article_title").style.visibility = "hidden" // Nadpis článku se schová, aby animace vypadala lépe
    setTimeout(function () {
        window.location.href = "../articles/article_viewer.html"; // po 280 ms přejde na čtečku článků, kde si práci přebere article_viewer.js
    }, 280);
}

// Uloží vybraný článek do cookies, čtečka pak přečte (v article_viewer.js) tuto hodnotu cookie a podle ni zobrazí článek
function article_viewer_relay_sleep() {
    Cookies.set("selected_article", "sleep", { expires: 7 }) // Cookie pro jistotu zmizí za 7 dní
}

// Funkce s argumentem využita v podstránce Coach na přesměrování na jinou stránku s hezkou animací
// Do argumentu patří url stránky
function redirect(redirect_page) {
    document.body.style.animation = "redirect_animation 0.5s forwards"; // Pustí animaci
    setTimeout(function () {
        window.location.href = redirect_page; // Po 180 ms přesměruje
    }, 180);
}

function calculateBMI() {
    var weight = Cookies.get("weight");         // Získá hodnotu váhy
    var height = Cookies.get("height") / 100;   // Získa hodnotu výšky v cm a převede na metry
    console.log("Height:", height, "m");        // Napíše do konzole výšku
    console.log("Weight:", weight, "kg");       // Napíše do konzole váhu
    var bmi = weight / (height * height);       // Vypočítá BMI
    console.log("BMI:", bmi);                   // Napíše do konzole BMI
    document.getElementById("bmi").innerHTML = Math.round(bmi * 10) / 10 + " BMI"; // Zaokrouhleno na jedno desetinné místo

    if (bmi < 18.5) {
        document.getElementById("bmititle").innerHTML = "Under"; // Změna textu na status BMI
        document.getElementById("BMI_circle").style.backgroundColor = "#bfe6ff"; // Změna barvy pozadí podle statusu BMI
    }

    if (bmi > 18.5) {
        document.getElementById("bmititle").innerHTML = "Normal"; // Změna textu na status BMI
        document.getElementById("BMI_circle").style.backgroundColor = "#bef9bf"; // Změna barvy pozadí podle statusu BMI
    }

    if (bmi > 25) {
        document.getElementById("bmititle").innerHTML = "Over"; // Změna textu na status BMI
        document.getElementById("BMI_circle").style.backgroundColor = "rgb(249 227 190)"; // Změna barvy pozadí podle statusu BMI
    }

    if (bmi > 30) {
        document.getElementById("bmititle").innerHTML = "Obese"; // Změna textu na status BMI
        document.getElementById("BMI_circle").style.backgroundColor = "rgb(249 190 190)"; // Změna barvy pozadí podle statusu BMI
    }
}

function toggleDarkMode() { // Aktuálně rozpracováno a nevyužito
    if (document.getElementById("darkmode_toggle").value == "off") { // Dark mode
        document.getElementById("darkmode_toggle").value = "on";
        document.body.style.backgroundColor = "black";
        document.getElementById("contentbackground").style.backgroundColor = "#1e1e1e";
    } else {
        document.getElementById("darkmode_toggle").value = "off"; // Light mode
        document.body.style.backgroundColor = "#eff1ee";
        document.getElementById("contentbackground").style.backgroundColor = "white";
    }
}

// Zobrazí vítající zprávu
function show_nodata_warning() {
    if (Cookies.get("steps") === undefined && Cookies.get("distance") === undefined && Cookies.get("azm") === undefined) { // Pokud steps, distance a azm nejsou v cookies definovány
        document.getElementById("no_data_big_warning").style.visibility = "visible"; // no_data_big_warning je zviditelněno
        document.getElementById("no_data_background").style.visibility = "visible"; // černé pozadí za varováním je také zviditelněno
    } else { // jinak
        close_warning(); // neukáže zprávu
    }
}

// Funkce zavření zprávy
function close_warning() {
    var remove_element_one = document.getElementById("no_data_big_warning"); // Vybere "no_data_big_warning"
    if (remove_element_one) { // odebere "no_data_big_warning"
        remove_element_one.parentNode.removeChild(remove_element_one);
    }

    var remove_element_two = document.getElementById("no_data_background"); // vybere "no_data_background"
    if (remove_element_two) { // odebere "no_data_background"
        remove_element_two.parentNode.removeChild(remove_element_two);
    }
}