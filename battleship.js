
let view = {
    displayMessage: function(msg){
        let messageArea = document.getElementById('messageArea')
        messageArea.innerHTML = msg //this will be setted after the player choose a area.
    },
    displayHit: function(location){
        let cell = document.getElementById(location)
        cell.setAttribute("class", "hit")
    },
    displayMiss: function(location){
        let cell = document.getElementById(location)
        cell.setAttribute("class", "miss")
    }
}
