
let view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById('messageArea')
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
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i]
            var index = ship.locations.indexOf(guess)
            if (index >= 0){
            ship.hits[index] = "hit"
            view.displayHit(guess)
            view.displayMessage('HIT!')
            if (this.isSunk(ship)){ //if the function is true, then 1 ship is sunk.
                this.shipsSunk++
                view.displayMessage('You sank my battleship!')
            }
            return true
            }    
        }
        view.displayMiss(guess)
        view.displayMessage('You missed.')
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
var controller = {
    guesses: 0,
    processGuess: function(guess){
        let location = parseGuess(guess)
        if (location){
            this.guesses++
            let hit = model.fire(location)
        }
    }
}

function parseGuess(guess){
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"]

    if (guess === null || guess.length !== 2){ //If the guess has less or more than 2 characteres.
        alert("Oops, please enter a letter and a number on the board")
    }else {
        let firstChar = guess.charAt(0)
        let row = alphabet.indexOf(firstChar)
        let column = guess.charAt(1)

        if (isNaN(row) || isNaN(column)){
            alert("Oops, that isn't on the board.")
        }else if (row < 0 || row >= model.boardSize || column < 0 || column > model.boardSize){
            alert("Oops, that's off the board!")
        }else{
            return row + column //row is a number, and column a string, wich combined result in a string
        }
    }
    return null //if none of the else properties match, will result in null
}
