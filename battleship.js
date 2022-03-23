
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

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] }],
    fire: function(guess){
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i]
            let locations = ship.locations
            var index = locations.indexOf(guess)
            if (index >= 0){
                console.log('You hit')
            }else{
                console.log('Youn dont have a hit')
            }
        }
    }
}
model.fire("16")
