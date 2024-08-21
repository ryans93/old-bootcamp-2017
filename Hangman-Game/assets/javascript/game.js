var animals = [
    { name: "GIANT-SQUID", imgSrc: "assets/images/squid.jpg", fact1: "The largest specimen found was 59 ft. long and weighed almost 2000 pounds", fact2: "Their natural enemy is the Sperm Whale", fact3: "The giant squid is thought to be the inspiration for many mythical sea creatures like the hydra" },
    { name: "BLUE-RINGED-OCTOPUS", imgSrc: "assets/images/blue-ringed-octopus.jpg", fact1: "The blue-ringed octopus is the only venomous species of octopus", fact2: "This octopus has 2 types of venom, one for defense and another for hunting", fact3: "Despite only being a couple inches long, this octopus packs enough tetrodotoxin to kill 26 humans at the same time" },
    { name: "NAUTILUS", imgSrc: "assets/images/nautilus.jpg", fact1: "The nautilus is in the cephalopod family with octopuses and squid", fact2: "The nautilus is a living fossil, remaining virtually unchanged for the past 500 million years", fact3: "It has chambers in its shell that it fills with water and gas to adjust buoyancy" },
    { name: "CUTTLEFISH", imgSrc: "assets/images/Cuttlefish.jpg", fact1: "Cuttlefish have W-shaped pupils which allow them to perceive light polarization and completely reshape their eyes to focus", fact2: "Known as the chameleon of the sea their camoflage is superior even to the octopus, despite being color-blind", fact3: "Cuttlefish have green blood due to the protein hemocyanin" },
    { name: "MORAY-EEL", imgSrc: "assets/images/eel.jpg", fact1: "This species has 2 sets of jaws", fact2: "The Giant Moray can grow up to 8 ft. and weigh 66 pounds.", fact3: "Most species are nocturnal" },
    { name: "DOLPHIN", imgSrc: "assets/images/dolphin.jpg", fact1: "There are 43 different species", fact2: "Dolphins are the only mammals that give birth to its offspring delivering the tail first instead of the head", fact3: "Dolphins sleep resting one side of the brain at a time" },
    { name: "HAMMERHEAD-SHARK", imgSrc: "assets/images/shark.jpg", fact1: "This shark's unique structure gives them near vertical 360 degree vision", fact2: "The Great Hammerhead can grow to 20 ft and weigh 600 pounds", fact3: "Sharks are viviparous, which means pups grow inside the female shark, similar to humans" },
    { name: "STARFISH", imgSrc: "assets/images/starfish.jpg", fact1: "Starfish can regenerate lost limbs", fact2: "Not all starfish have 5 arms, the Sun Star has 40", fact3: "Starfish eat by turning their stomach inside out and ejecting it through their mouth" },
    { name: "LIONFISH", imgSrc: "assets/images/lionfish.jpg", fact1: "The lionfish has toxic spines on its back for defense", fact2: "Known for their beauty, they are coveted aquarium pets.", fact3: "They can eat up to half their own body weight at once" },
    { name: "PUFFERFISH", imgSrc: "assets/images/pufferfish.jpg", fact1: "Pufferfish inflate by filling their elastic stomachs with water", fact2: "Pufferfish contain tetrodotoxin which is 1,200 times more lethal than cyanide", fact3: "Despite their toxicity, they are a delicacy in Japan and require a licensed chef to prepare" },
    { name: "MAN-OF-WAR", imgSrc: "assets/images/manofwar.jpg", fact1: "The Man-of-War is not a jellyfish but a colony of organisms working together", fact2: "The top polyp called the pneumatophore is a gas-filled bladder that allows them to float", fact3: "Their venom-filled tentacles can grow to 165 ft long" },
    { name: "SEA-URCHIN", imgSrc: "assets/images/urchin.jpg", fact1: "Sea urchins are in the same family as starfish", fact2: "Sea urchins have a water-vascular system instead of blood", fact3: "Sea urchins are omnivorous" },
    { name: "MANTIS-SHRIMP", imgSrc: "assets/images/shrimp.jpg", fact1: "One of the strongest animals in the animal kingdom, the force of its punch is on par with a bullet from a 22 caliber gun", fact2: "Mantis Shrimp have a unique molecular structure that acts as a shock absorber", fact3: "Mantis Shrimp also boast superior eyesight, having the broadest visual spectrum of any animal known" },
    { name: "COWNOSE-STINGRAY", imgSrc: "assets/images/stingray.jpg", fact1: "They have poisonous barbs at the base of their tails", fact2: "Baby stingrays are called pups", fact3: "They can have a wing span up to 3 feet" },
    { name: "KILLER-WHALE", imgSrc: "assets/images/orca.jpg", fact1: "Orcas are actually members of the dolphin family", fact2: "They can live between 50-80 years", fact3: "Orcas hunt in pods of up to 40 individuals" }
];

var random = Math.floor(Math.random() * 15);
var selectedAnimal = animals[random];
var guessString = "";
var guesses = 0;
var lettersRevealed = 0;
var lettersGuessed = [];
var found = false;

// append guess string to screen as series of underscores
for (var i = 0; i < selectedAnimal.name.length; i++) {
    if (selectedAnimal.name.charAt(i) != "-") {
        guessString = guessString.concat("_")
    }
    // if the word contains a "-", append to screen and increase lettersRevealed since this not a letter
    else {
        guessString = guessString.concat("-")
        lettersRevealed++;
    }
}
document.getElementById("word").append(guessString);

// handle user input
document.onkeyup = function (event) {
    // user can only enter upper/lowercase letter
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
        // allow input if letter not yet guessed, and user has not yet won or lost
        if (lettersRevealed < selectedAnimal.name.length && guesses < 5 && searchLettersGuessed(lettersGuessed, event.key.toUpperCase())) {
            var letter = event.key.toUpperCase();
            lettersGuessed.push(letter);
            // search through animal name for letter guessed by user
            for (var i = 0; i < selectedAnimal.name.length; i++) {
                // replace "_" with correctly guessed letter and increment lettersRevealed
                if (selectedAnimal.name.charAt(i) === letter) {
                    guessString = setCharAt(guessString, i, letter);
                    lettersRevealed++;
                }
            }
            if (!found) {
                guesses++;
            }
            // reset found to false
            found = false;
            document.getElementById("word").innerHTML = "";
            document.getElementById("word").append(guessString);
            document.getElementById("lettersGuessed").append(letter);
            // reveal part of skull picture for each wrong guess
            if (guesses == 1) {
                document.getElementById("block1").style.opacity = 0;
            }
            if (guesses == 2) {
                document.getElementById("block2").style.opacity = 0;
            }
            if (guesses == 3) {
                document.getElementById("block3").style.opacity = 0;
            }
            if (guesses == 4) {
                document.getElementById("block4").style.opacity = 0;
            }
            if (guesses == 5) {
                document.getElementById("block5").style.opacity = 0;
            }
        }
    }
    document.getElementById("Guesses-Remaining").innerHTML = "Guesses Remaining: " + (5 - guesses);
    // user has lost
    if (guesses == 5) {
        document.getElementById("Guesses-Remaining").innerHTML = "YOU LOSE!";
        document.getElementById('Guesses-Remaining').style.color = "red";
        showAnimal();
    }
    // user has won
    if (lettersRevealed == selectedAnimal.name.length) {
        document.getElementById("Guesses-Remaining").innerHTML = "YOU WON!";
        showAnimal();
    }

    // return string with character inserted into specified index, sets found to true
    function setCharAt(str, index, chr) {
        found = true;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    // return true if key not found in lettersGuessed array
    function searchLettersGuessed(lettersGuessed, key) {
        for (var i = 0; i < lettersGuessed.length; i++) {
            if (key === lettersGuessed[i]) {
                return false;
            }
        }
        return true;
    }

    // function to show animal picture and facts box at end of game
    function showAnimal() {
        document.getElementById("animalImageBox").style.opacity = 1;
        document.getElementById("image-box-title").innerHTML = "It was a " + selectedAnimal.name + "!";
        var picture = document.createElement("img");
        picture.src = selectedAnimal.imgSrc;
        picture.setAttribute("width", "100%");
        document.getElementById("animalImage").appendChild(picture);
        document.getElementById('animalFactBox').style.opacity = 1;
        document.getElementById("fact-box-title").innerHTML = selectedAnimal.name + " FUN FACTS";
        document.getElementById("fact1").innerHTML = selectedAnimal.fact1;
        document.getElementById("fact2").innerHTML = selectedAnimal.fact2;
        document.getElementById("fact3").innerHTML = selectedAnimal.fact3;
    }
}