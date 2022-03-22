
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

let ships = [{ locations: ["31", "41", "51"], hits: ["", "", ""] },
{ locations: ["14", "24", "34"], hits: ["", "hit", ""] },
{ locations: ["00", "01", "02"], hits: ["hit", "", ""] }]


var ship2 = ships[1]
let locations = ship2.locations
console.log("Locations is " + locations[1])

let ship3 = ships[2]
let hits = ship3.hits
if (hits[0] === "hit"){
    console.log('Ouch, hit on third ship on location one')
}

let ship1 = ships[0]
let hits2 = ship1.hits
hits2[2] = "hit"
