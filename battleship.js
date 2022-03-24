
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
    ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] }],
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
    },
    generateShipLocations: function(){
        let locations
        for (var i = 0; i < this.numShips; i++){
            do{
                locations = this.generateShip() //generate locations for the shups.
            }while (this.collision(locations)) //If the locations collide with other location the generateShip are execute again, while the numShip is lower than the determined.
            this.ships[i].locations = locations
        }
    },
    generateShip: function(){
        let direction = Math.floor(Math.random()) * 2
        let row
        let col
        if (direction === 1){
            row = Math.floor(Math.random() * this.boardSize)
            col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1))) //Minus shiplenght to not extend beyound the board, and + 1 because the math.floor round to the smallest number, so, with +1 the last space can be used.
        }else{
            row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1))) //Same thing used in col
            col = Math.floor(Math.random() * this.boardSize)
        }
    var newShipLocations = []
    for ( var i = 0; i < this.shipLength; i++){
        if ( direction === 1){
            newShipLocations.push(row + "" + (col + i)) //+ i to sum to the next column. Parentheses used to guarantee that the col + i is executed before the concatenation.
        }else{
            newShipLocations.push((row + i) + "" + col) //Now increasing the value of row, because the ship will be located in the vertical position.

        }
    }
    return newShipLocations
},
    collision: function(locations){
        for (var i = 0; i < this.numShips; i++){
            let ship = this.ships[i]
            for (var j = 0; j < locations.length; j++){ //Checking if the locations of the new ship already exist in the array.
                if (ship.locations.indexOf(locations[j]) >= 0){
                    return true //If return greater or equal to 0, that means the location already exist, returning true.
                }
            }
        }
        return false //there are no collision.
    }
}

var controller = {
    guesses: 0,
    processGuess: function(guess){
        let location = parseGuess(guess)
        if (location){
            this.guesses++
            let hit = model.fire(location)
            if (hit && model.shipsSunk === model.numShips){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses") //hit && model.shipSun. hit to see if the guess hit a ship, and shipSunk to see if all the ships are sunk.
            }
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
    function init(){
     let fireButton = document.getElementById("fireButton")
     fireButton.onclick = shot   
     let guessInput = document.getElementById("guessInput")
     guessInput.onkeypress = handleKeyPress

     model.generateShipLocations() //When the page is loaded, this will generate random locations for the ships.
    }
    function handleKeyPress(e){
        let fireButton = document.getElementById("fireButton")
        if (e.keyCode === 13){ // Enter is the keyCode 13
            fireButton.click()
            return false
        }
    }
    function shot(){
        let shot = document.getElementById("guessInput")
        let guess = shot.value
        controller.processGuess(guess)
        guessInput.value = "" //Reset the input space.
    }
    window.onload = init
    model.ships