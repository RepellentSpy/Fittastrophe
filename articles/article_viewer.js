// JavaScript pro tuto podstránku je v jiném souboru, aby to nedělalo v hlavním moc velký bordel
console.log("#️⃣ Article Viewer v0.5")

window.onload = function() { // Jakmile se zapne
    checkWhichArticleToShow(); // zkontroluje jaký zobrazit článek
}

// Kontrola jaký článek zobrazit
function checkWhichArticleToShow() {
    let selected_article = Cookies.get("selected_article") // hodnota "selected_article" z cookies je definována jako "selected_article"
    console.log("Selected article is: " + selected_article) // Napíše vybraný článek do konzole
    if (selected_article == "sleep") { // pokud vybraný článek je "sleep"
        showSleep(); // ukáže článek sleep
    } else { // jinak
        articleError(); // zobrazí chybové hlášení a vrátí uživatele na "coach" záložku
    }
}

function articleError() { // chybové hlášení
    document.getElementById("reader_article_title").innerHTML = "404 Not Found"
    document.getElementById("reader_article_content").innerHTML = "Error: Article not found. Please select an article properly";
    setTimeout(function () { // po 500 ms uživatele vrátí na "coach" záložku
        window.location.href = "../subpages/coach.html";
    }, 500);
}

function showSleep() { // ukáže článek "sleep"
    document.getElementById("reader_article_title").innerHTML = "Tips to get better sleep" // nadpis

    // Tohle je vtipné řešení, ale proč ne? Původně jsem to chtěl brát z textového souboru, ale toto také funguje
    // Text:
    document.getElementById("reader_article_content").innerHTML = "<p>Quality sleep is essential for overall well-being and good health. Unfortunately, many people struggle to get the recommended amount of sleep each night. If you find yourself tossing and turning or waking up groggy, it may be time to reevaluate your sleep habits. Here are 10 tips to help you achieve a better night's sleep.</p> <p><b>1. Establish a Consistent Sleep Schedule:</b></p> <p>Set a regular sleep schedule by going to bed and waking up at the same time every day, even on weekends. This helps regulate your body's internal clock, making it easier to fall asleep and wake up naturally.</p> <p><b>2. Create a Relaxing Bedtime Routine:</b></p><p>Develop a pre-sleep routine to signal to your body that it's time to wind down. This might include activities such as reading a book, taking a warm bath, or practicing relaxation exercises like deep breathing.</p><p><b>4. Optimize Your Sleep Environment:</b></p><p>Make your bedroom conducive to sleep by keeping it dark, quiet, and cool. Invest in comfortable bedding and a supportive mattress to enhance your overall sleep experience.</p><p><b>5. Limit Screen Time Before Bed:</b></p><p>The blue light emitted by phones, tablets, and computers can interfere with the production of the sleep hormone melatonin. Aim to reduce screen time at least an hour before bedtime to improve your sleep quality.</p><p><b>5. Watch Your Diet:</b></p><p>Be mindful of your food and drink intake, especially in the hours leading up to bedtime. Avoid large meals, caffeine, and nicotine close to bedtime, as these can disrupt your sleep.</p><p><b>6. Stay Active During the Day:</b></p><p>Engage in regular physical activity to promote better sleep. Aim for at least 30 minutes of moderate exercise most days of the week, but try to finish your workout a few hours before bedtime.</p><p><b>7. Manage Stress:</b></p><p>Practice stress-reducing techniques such as meditation, deep breathing, or yoga to calm your mind before bedtime. High stress levels can contribute to insomnia and other sleep disorders.</p><p><b>8. Limit Naps:</b></p><p>While short naps can be beneficial, especially for those who didn't get enough sleep the night before, avoid napping for extended periods during the day, as it can interfere with nighttime sleep.</p><p>Implementing these tips into your daily routine can significantly improve your chances of getting better sleep. Remember that sleep is a crucial component of a healthy lifestyle, impacting your physical health, mental well-being, and overall quality of life. Prioritize your sleep, and you'll likely experience enhanced productivity, mood, and overall vitality.</p><p>This article was written by AI</p>"

    document.getElementById("reader_article_content").style.animation = "fade_in 0.8s forwards"; // Animace po načtení
    document.getElementById("reader_article_title").style.animation = "fade_in 0.8s forwards"; // Animace po načtení
    // Tento článek napsalo ChatGPT
}

// Animace šipky zpět při kliknutí
function arrow_forward_animate() {
    document.getElementById("arrow_forward").style.animation = "arrow_cycle 1.1s forwards";
    document.getElementById("reader_article_content").style.animation = "fade_out 0.8s forwards"; // animace textu po kliknutí na šipku
    document.getElementById("reader_article_title").style.animation = "fade_out 0.8s forwards"; // animace nadpisu po kliknutí na šipku
    setTimeout(function () { // po 290 ms
        window.location.href = "../subpages/coach.html"; // vrátí uživatele na záložku "coach"
    }, 290);
}