
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
            var index = ships.locations.indexOf(guess)
            if (index >= 0){
            ship.hits[index] = "hit"
            if (this.isSunk(ship)){ //if the function is true, then 1 ship is sunk.
                this.shipsSunk++
            }
            return true
            }    
        }
        return false
    },
    isSunk: function(ship){
        for (var i = 0; i < this.shipLength; i++){
        if (ship.hits[i] !== "hit"){ //This function will verify if all the "hits" in the ship var has the "hit" in it, in any of them don't have, will return false. Using the ship.hits[i], the code will see all the positions in the ships array.
            return false
        }
    }
        return true
    }
}
