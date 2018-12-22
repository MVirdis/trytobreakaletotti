/*
** This script contains functions and objects which can be used in all those
** files that can link to this script (e.g. index.html).
** Exposed Objects are:
**  - matches: an array of match objects that contain the following properties:
**      * challenger: the name of the one who dares to challende Ale Totti
**      * date: the simple date in the format "yyyy-mm-dd"
**      * time: the hour of the match
**      * place: where it will be(or has been) disputed
**      To use this data (for example in index.html) iterate over the matches
**      array from an element with id match_container (IMPORTANT), for example:
**      <div id="match_container">
**          <div v-for="match in matches">
**            <h2>The challenger is: {{ match.challenger }}</h2>
**          </div>
**      </div>
**      Use this syntax to put a placeholder for values: {{ variable }}.
*/
const matches = new Vue({
    el: "#match_container",
    data: {
        matches: [
            {
                challenger: "il Guggio",
                date: "2019-03-01",
                time: "11:00",
                place: "Polo F aula F9"
            },
            {
                challenger: "il Barbiere",
                date: "2019-03-15",
                time: "16:00",
                place: "Polo B aula B31"
            }
        ]
    }
});

document.getElementById("invia_richiesta").addEventListener("click", function(){
    fetch("/php/request-handler.php", {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "action=set&target=request&name="+nome+"&challenger="+
            nomeCombattente+"&surname="+cognome+"&mail="+mail
    }).then(function(response) {
        console.log(response.json());
        hide();
        pulsantePrenota.innerHTML = "Richiesta inviata";
        pulsantePrenota.setAttribute('class', 'disabled');
        pulsantePrenota.disabled = true;
    });
});
