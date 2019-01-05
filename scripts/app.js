/*
** This script contains functions and objects which can be used in all those
** files that can link to this script (e.g. index.html).
** Exposed Objects are:
**  - matches: an array of match objects that contain the following properties:
**      * challenger: the name of the one who dares to challende Ale Totti
**      * date: the simple date in the format "yyyy-mm-dd"
**      * time: the hour of the match
**      * place: where it will be(or has been) disputed
**      * result: it equals null if the match is to be disputed or a constant
**          value (see below the constants) to indicate match result
**      To use this data (for example in index.html) iterate over the matches
**      array from an element with id match_container (IMPORTANT), for example:
**      <div id="match_container">
**          <div v-for="match in matches">
**            <h2>The challenger is: {{ match.challenger }}</h2>
**          </div>
**      </div>
**      Use this syntax to put a placeholder for values: {{ variable }}.
*/
const ALEWIN = 1;
const DRAW = 0;
const CHALLENGERWIN = 2;
const REQUESTURL = "/php/request-handler.php";
const MAX_CHALLENGER_NAME_LEN = 20;

var postRequestSettings = {
    mode: 'no-cors',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const matches = new Vue({
    el: "#match_container",
    data: {
        matches: [],
        ALEWIN: 1,
        DRAW: 0,
        CHALLENGERWIN: 2
    }
});

const countdown = new Vue({
    el: "#next_match_countdown",
    data: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    computed: {
        daysUntilNext: function() {
            if (this.days == 0)
                return 'O';
            return numToRoman(this.days);
        },
        hoursUntilNext: function() {
            if (this.hours == 0)
                return 'O';
            return numToRoman(this.hours);
        },
        minutesUntilNext: function() {
            if (this.minutes == 0)
                return 'O';
            return numToRoman(this.minutes);
        }
    }
});

var decr = function() {
    if (countdown.seconds > 0) {
        countdown.seconds--;
    } else if (countdown.seconds == 0) {
        if (countdown.minutes > 0) {
            countdown.seconds = 59;
            countdown.minutes--;
        } else if (countdown.minutes == 0) {
            if (countdown.hours > 0) {
                countdown.hours--;
                countdown.minutes = 59;
                countdown.seconds = 59;
            } else if (countdown.hours == 0) {
                if (countdown.days > 0) {
                    countdown.seconds = 59;
                    countdown.minutes = 59;
                    countdown.hours = 23;
                    countdown.days--;
                } else if (countdown.days == 0) {} // if all 0 nothing to do
            }
        }
    }
};

function daysOfMonth(month, year) {
    var days = 0;
    switch (month) { // months 0 based - january = 0
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            days = 31;
        break;
        case 4: case 6: case 9: case 11:
            days = 30;
        break;
        case 2:
            if ((year%4 == 0) &&
                ((year%100 != 0) ||
                 (year%400 == 0))
               )
                days = 29;
            else
                days = 28;
        break;
    }
    return days;
}

function setInitialCountdown(nextMatch) {
    var nextMatchDate = new Date(nextMatch.date + " " + nextMatch.time);
    var result = new Date();
    result.setTime(nextMatchDate - Date.now());
    console.log(result);
    var cumDays = 0;
    for(var i=0; i<result.getMonth(); ++i) {
        cumDays += daysOfMonth(i+1, result.getFullYear());
    }
    console.log((result.getDate() + result.getMonth()*cumDays  -
                 (result.getMonth() == 0 ? 0 : 1)) + " days " +
            result.getHours() + " hours " + result.getMinutes() + " minutes");

    countdown.days = result.getDate() + result.getMonth()*cumDays -
               (result.getMonth() == 0 ? 0 : 1);
    countdown.hours = result.getHours();
    countdown.minutes = result.getMinutes();
    countdown.seconds = 59 - (new Date()).getSeconds();
}

(function() { // On start
    postRequestSettings.body = 'action=get&target=challenge&upcoming=true';
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        response.json().then(function(obj) {
            setInitialCountdown(obj.data[obj.data.length - 1]);
            setInterval(decr, 1000);
            obj.data.forEach(function(match) {
                match.date = dateToRoman(match.date);
                match.time = timeToRoman(match.time);
            });
            matches.matches = obj.data;
        });
    });
})();

var correctFormFlag = false;
function formCheck() {
    correctFormFlag = true;
    if (!(/^\s*[A-Za-z\s]+\s*$/.test(nome.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il nome dev'essere composto di sole "+
            "lettere";
    }
    if (!(/^\s*[A-Za-z\s]+\s*$/.test(cognome.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il cognome dev'essere composto di sole "+
            "lettere";
    }
    if (!(/^\s*[A-Za-z\s]+[A-Za-z0-9_-\s]*\s*$/.test(nomeCombattente.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il nome da combattente deve iniziare "+
            "con una lettera e può contenere lettere, numeri, _ -";
    }
    if (!(/^\s*[A-Za-z\.0-9_-]+@[a-z\.]+\s*$/.test(mail.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: l'email non è in un formato valido";
    }
    if (nomeCombattente.value.length > MAX_CHALLENGER_NAME_LEN) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: nome combattente di max " +
            MAX_CHALLENGER_NAME_LEN + " caratteri";
    }
    requestFields.forEach(function(element){
        if (/^\s*$/.test(element.value)) {
            correctFormFlag = false;
            errorText.innerHTML = "Errore: il campo "+element.getAttribute('id')+
                " è vuoto";
        }
    });
}

function sendForm() {
    postRequestSettings.body = "action=set&target=request&name="+nome.value+
        "&challenger="+nomeCombattente.value+"&surname="+cognome.value+
        "&mail="+mail.value;
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        console.log(response.json());
        hide();
        pulsantePrenota.innerHTML = "Richiesta inviata";
        pulsantePrenota.disabled = true;
        correctFormFlag = false;
    }).finally(function() {
        errorText.style.visibility = "hidden";
    });
}

document.getElementById("invia_richiesta").addEventListener("click", function(){
    formCheck();
    if (correctFormFlag)
        sendForm();
    else
        errorText.style.visibility = "visible";
});

var showingPastMatches = false;
document.getElementById("past_matches_button").addEventListener("click",function(){
    postRequestSettings.body = 'action=get&target=challenge&upcoming=' +
        (showingPastMatches ? 'true' : 'false');
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        response.json().then(function(obj) {
            console.log(obj);
            obj.data.forEach(function(match) {
                match.date = dateToRoman(match.date);
                match.time = timeToRoman(match.time);
            });
            matches.matches = obj.data;
        });
    });
    document.getElementById("past_matches_label").innerHTML =
        (showingPastMatches ? "Mostra " : "Nascondi ") + "incontri passati";
    showingPastMatches = !showingPastMatches;
});

function timeToRoman(time) {
    var regex = /^\s*([0-9]+):([0-9]+):([0-9]+)\s*$/g;
    var timeParts = regex.exec(time);
    var romanTime = "";
    romanTime += numToRoman(Number(timeParts[1]));
    if (Number(timeParts[2]) != 0) {
        romanTime += " : ";
        romanTime += numToRoman(Number(timeParts[2]));
    }
    if (Number(timeParts[2]) != 0 && Number(timeParts[3]) != 0) {
        romanTime += " : ";
        romanTime += numToRoman(Number(timeParts[3]));
    }
    return romanTime;
}

function dateToRoman(date) {
    var regex = /^\s*([0-9]+)-([0-9]+)-([0-9]+)\s*$/g;
    var dateParts = regex.exec(date);
    var romanDate = "";
    romanDate += numToRoman(Number(dateParts[3]));
    romanDate += " / ";
    romanDate += numToRoman(Number(dateParts[2]));
    romanDate += " / ";
    romanDate += numToRoman(Number(dateParts[1]));
    return romanDate;
}

function numToRoman(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
