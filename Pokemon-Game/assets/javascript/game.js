/*
1. selectPokemon: appends selectbox with pokemon-slot and cancel buttons
    -clicking pokemon slot: set playerActive to that pokemon, remove selectBox, call populateImg
2. populateImg: sets player img, call getOppActive if oppActive undefined, call populateMenu
    3. getOppActive: gets oppActive, calls dsiplayOpp, user wins if no oppActive is found
    4. displayOpp: sets oppImage, calls updateHPdisplay
5. populateMenu: displays attack menu
    -attack buttons: call battle() or swap pokemon
6. battle: calls doesItHit() and attack()
    calls selectPokemon() if user pokemon faints, user losses if then can't select a pokemon
    if selectPokemon() not called, populateMenu() called
    calls getOppActive() if opponents pokemon faints
        7. doesItHit: returns booloean if attack hits
        8. attack: calls findModifier(), substracts damage from HP, calls updateHPdisplay()
        9. findModifier: returns attack modifier for damage calculation
10. updateHPdisplay: updates hp display box
*/
import red from "./red.js";
import blue from "./blue.js";
var playerTeam;
var playerActive;
var oppTeam;
var oppName;
var oppActive;
var swap = false;
var music = document.createElement("audio"); //added audio
music.setAttribute("src", "assets/music/battleTheme3.mp3");
music.loop = true;

$("document").ready(() => {
    $(".player-select").on("click", function () { //player select button handler, set teams and appends html
        if ($(this).attr("data") === "red") {
            playerTeam = red;
            oppTeam = blue;
            oppName = "Blue";
        }
        else {
            playerTeam = blue;
            oppTeam = red;
            oppName = "Red";
        }
        $(".player-select").remove(); // remove player buttons and append html
        $("#mainDisplay").append("<div id=playerPokemonDisplay>");
        $("#mainDisplay").append("<div id=oppPokemonDisplay>");
        $("#mainDisplay").append("<div class=col-xs-2 id=oppTrainerSpriteBox>");
        $('#oppTrainerSpriteBox').css({
            "background-image": "url(assets/images/" + oppName + ".png)",
            "background-size": "33% 100%",
            "background-repeat": "no-repeat"
        });
        $('.btn-group').attr('id', 'menu');
        $("#log").html("");
        $("#log").append("Pokemon Trainer " + oppName + " challenges you to a battle!");
        music.play(); //start music
        setTimeout(() => {
            $("#log").append("</br>Select a pokemon to send out.");
            selectPokemon(); // call selectPokemon
        }, 3000);
    });

    function selectPokemon() { //appends select box and pokemon buttons
        $("#mainDisplay").append("<div class=col-xs-3 id=selectBox>");
        for (let i = 0; i < 6; i++) { // append each pokemon
            $("#selectBox").append("<button class='pokemon-button pokemon-slot' data=" + i + " id=Pokemon-" + (i + 1) + ">");
            if (playerTeam[i].stats[1] / playerTeam[i].stats[0] == 0) {
                $("#Pokemon-" + (i + 1)).css({
                    "background-color": "red"
                });
                playerTeam[i].status = "Fainted";
            }
            $("#Pokemon-" + (i + 1)).html(playerTeam[i].name + "</br>HP: " + playerTeam[i].stats[1] + "/" + playerTeam[i].stats[0] + " " + playerTeam[i].status);
        }
        $("#selectBox").append("<button class=pokemon-button id=cancel>");
        $("#cancel").html("Cancel");
    }

    function populateImg() { //populates player sprite image
        setTimeout(() => {
            $("#playerPokemonDisplay").html("<img id='backImg' src=" + playerActive.imageBack + ">");
            var image = new Image();
            image.src = playerActive.imageBack
            image.onload = function () {
                var height = this.naturalHeight;
                $('#backImg').css({
                    "height": height * 2.75,
                });
            }
            if (oppActive == undefined) { //initializes opponents active pokemon
                getOppActive();
                setTimeout(populateMenu, 2000); // shows attack menu
            }
            else if (!swap) { // if player hasn't switched pokemon
                populateMenu(); // shows attack menu
            }
            else { // player switched pokemon
                updateHPdisplay("player"); // shows new pokemon's hp box
                setTimeout(() => {
                    battle("switched"); // call battle to let opponent attack
                }, 1500);
            }
        }, 1500);
    }

    function getOppActive() { // sets oppActive, user wins if all opponents team are fainted
        if (oppActive == undefined) { // initialize oppActive randomly
            oppActive = oppTeam[Math.floor(Math.random() * 6)];
            displayOpp();
        }
        else { // look for pokemon with super-effective move against player, if not found send out random
            var notFainted = [] // hold indexes of non-fainted pokemon
            for (let i = 0; i < 6; i++) {
                if (oppTeam[i].stats[1] != 0) { // pokemon is not fainted
                    notFainted.push(i);
                    var weakArray = playerActive.weaknesses.concat(playerActive.doubleWeaknesses);
                    for (let attackNum = 0; attackNum < 4; attackNum++) { // loop through attacks
                        if (weakArray.indexOf(oppTeam[i].moves[attackNum].type[0]) != -1) {
                            oppActive = oppTeam[i];
                            return displayOpp();
                        }
                    }
                }
            }
            if (notFainted.length == 0) { // user wins if all opponents pokemon are fainted
                setTimeout(() => {
                    $("#log").html("");
                    $("#log").append("Congratulations, you won!");
                    music.pause();
                    $(".menu-button").remove();
                }, 3000);
            }
            else { // send out random non-fainted pokemon
                oppActive = oppTeam[notFainted[Math.floor(Math.random() * notFainted.length)]];
                displayOpp();
            }
        }
    }

    function displayOpp() { // sets opponents sprite image
        $("#log").append("</br>Pokemon Trainer " + oppName + " sent out " + oppActive.name + "!");
        $("#log").scrollTop($("#log").prop("scrollHeight"));
        setTimeout(() => {
            $("#oppPokemonDisplay").append("<img id='frontImg' src=" + oppActive.imageFront + ">");
            var image = new Image();
            image.src = oppActive.imageFront;
            image.onload = function () {
                var height = this.naturalHeight;
                $('#frontImg').css({
                    "height": height * 2,
                });
            }
            $("#menu").show();
            updateHPdisplay("opponent"); // display hp box of new pokemon
        }, 1500)
    }

    function battle(playerMove) { // takes index of move as parameter, conducts battle logic, user loses if all 6 pokemon faint
        var oppMove = oppActive.AI(); // opponent selects move
        var time = 1;
        if (playerMove === "switched") { // opp moves after user switches pokemon
            $("#log").append("</br>" + oppActive.name + " used " + oppActive.moves[oppMove].name + ".");
            if (doesItHit(oppActive, oppMove)) { // check if attack hits
                attack(oppActive, playerActive, oppMove); // calc damage
            }
            else {
                $("#log").append("</br>" + oppActive.name + "'s attack missed!");
            }
            swap = false; // reset swap
            $("#log").scrollTop($("#log").prop("scrollHeight"));
        }
        // player moves first
        else if (playerActive.moves[playerMove].priority > oppActive.moves[oppMove].priority || (playerActive.stats[6] > oppActive.stats[6] && playerActive.moves[playerMove].priority == oppActive.moves[oppMove].priority)) {
            $("#log").append("</br>" + playerActive.name + " used " + playerActive.moves[playerMove].name + ".");
            if (doesItHit(playerActive, playerMove)) { // check if attack hits
                attack(playerActive, oppActive, playerMove); // calc damage
            }
            else {
                $("#log").append("</br>" + playerActive.name + "'s attack missed!");
            }
            if (oppActive.stats[1] !== 0) { // opponent attacks if player doesn't ko pokemon on same turn
                time++;
                setTimeout(() => {
                    $("#log").append("</br>" + oppActive.name + " used " + oppActive.moves[oppMove].name + ".");
                    if (doesItHit(oppActive, oppMove)) { // check if attack hits
                        attack(oppActive, playerActive, oppMove); // calc damage
                    }
                    else {
                        $("#log").append("</br>" + oppActive.name + "'s attack missed!");
                    }
                }, 1500);
            }
        }
        else { // opp moves first
            $("#log").append("</br>" + oppActive.name + " used " + oppActive.moves[oppMove].name + ".");
            if (doesItHit(oppActive, oppMove)) { // check if attack hits
                attack(oppActive, playerActive, oppMove); // calc damage
            }
            else {
                $("#log").append("</br>" + oppActive.name + "'s attack missed!");
            }
            if (playerActive.stats[1] !== 0) { // player sttacks if not KO'd by opponent on same turn
                time++;
                setTimeout(() => {
                    $("#log").append("</br>" + playerActive.name + " used " + playerActive.moves[playerMove].name + ".");
                    if (doesItHit(playerActive, playerMove)) { // check if attack hits
                        attack(playerActive, oppActive, playerMove); // calc damage
                    }
                    else {
                        $("#log").append("</br>" + playerActive.name + "'s attack missed!");
                    }
                }, 1500);
            }
        }
        setTimeout(() => {
            if (playerActive.stats[1] == 0) { // if player's pokemon faints
                $("#log").append("</br>" + playerActive.name + " fainted!");
                $("#log").scrollTop($("#log").prop("scrollHeight"));
                $(".menu-button").remove();
                $("#playerPokemonDisplay").html("");
                if (playerTeam[0].stats[1] !== 0 || playerTeam[1].stats[1] !== 0 || playerTeam[2].stats[1] !== 0 || playerTeam[3].stats[1] !== 0 || playerTeam[4].stats[1] !== 0 || playerTeam[5].stats[1] !== 0) {
                    selectPokemon(); // select new pokemon
                }
                else { // player loses if no non-fainted pokemon to select
                    setTimeout(() => {
                        $("#log").html("");
                        $("#log").append("You lost the battle!");
                        music.pause();
                        $(".menu-button").remove();
                    }, 3000);
                }
            }
            else {
                populateMenu(); // show attack buttons
            }
            if (oppActive.stats[1] == 0) { // if opponent's pokemon faints
                $("#log").append("</br>" + oppActive.name + " fainted!");
                $("#log").scrollTop($("#log").prop("scrollHeight"));
                $("#oppPokemonDisplay").html("");
                $("#menu").hide();
                getOppActive(); // get new oppActive
            }
        }, 1500 * time);
    }

    function doesItHit(attacker, move) { // determines if attack hits based on move's accuracy stat
        var random = Math.random() * 100;
        if (random <= attacker.moves[move].accuracy) {
            return true;
        }
        return false;
    }

    function attack(attacker, defender, move) { // calculates damage
        var damage;
        var modifier = findModifier(attacker, defender, move); // calculates modifier
        if (attacker.moves[move].type[1].indexOf("Physical") !== -1) { // physical attack type
            damage = Math.floor((((42 * attacker.moves[move].power * (attacker.stats[2] / defender.stats[3])) / 50) + 2) * modifier);
        }
        else if (attacker.moves[move].type[1].indexOf("Special") !== -1) { // special attack type
            damage = Math.floor((((42 * attacker.moves[move].power * (attacker.stats[4] / defender.stats[5])) / 50) + 2) * modifier);
        }
        else { // status move
            damage = 0;
        }
        defender.stats[1] -= damage; // reduces HP by damage
        if (defender.stats[1] < 0) {
            defender.stats[1] = 0; // prevents negative HP
        }
        updateHPdisplay(defender); // updates hp display after damage
    }

    //calculates increased/reduced damage based on critical hits, same type attack bonus (STAB), type matchups, status conditions, and random multiplier
    function findModifier(attacker, defender, move) {
        var critical = 1;
        if (Math.random() * 100 <= 6.25) { // test critical hit
            critical = 1.5;
            $("#log").append("</br>It's a critical hit!");
        }
        var random = Math.random() * .15 + .85; // random multiplier
        var stab = 1;
        for (let i = 0; i < attacker.types.length; i++) { // search if move type matches attack type for STAB
            if (attacker.moves[move].type.indexOf(attacker.types[i]) !== -1) {
                stab = 1.5;
            }
        }
        var type = 1;
        // search type match ups for type multiplier
        if (defender.doubleWeaknesses.indexOf(attacker.moves[move].type[0]) !== -1) {
            type += 3;
            $("#log").append("</br>It's super-effective!");
        }
        if (defender.weaknesses.indexOf(attacker.moves[move].type[0]) !== -1) {
            type += 1;
            $("#log").append("</br>It's super-effective!");
        }
        if (defender.resistances.indexOf(attacker.moves[move].type[0]) !== -1) {
            type *= .5;
            $("#log").append("</br>It's not very effective.");
        }
        if (defender.doubleResistances.indexOf(attacker.moves[move].type[0]) !== -1) {
            type *= .25;
            $("#log").append("</br>It's not very effective.");
        }
        if (defender.immunities.indexOf(attacker.moves[move].type[0]) !== -1) {
            type = 0;
            $("#log").append("</br>It's didn't have any effect.");
        }
        var burn = 1;
        if (attacker.status === "Burned") {
            burn = .5;
        }
        var other = 1; //used for abilities
        var modifier = critical * random * stab * type * burn * other;
        return modifier;
    }

    function updateHPdisplay(target) { // updates hp display after damage
        if (target === "player" || playerTeam.indexOf(target) !== -1) { // update player hp box
            $("#playerName").html(playerActive.name);
            $("#playerStatus").html(playerActive.status);
            $("#playerHPbox").show();
            $("#playerHPdisplay").html("HP: " + playerActive.stats[1] + "/" + playerActive.stats[0]);
            $('#playerHPbar').css({
                "width": playerActive.stats[1] / playerActive.stats[0] * 285,
                "background-color": "green"
            });
            if (playerActive.stats[1] / playerActive.stats[0] <= .5) {
                $('#playerHPbar').css({
                    "background-color": "yellow"
                });
            }
            if (playerActive.stats[1] / playerActive.stats[0] <= .1) {
                $('#playerHPbar').css({
                    "background-color": "red"
                });
            }
        }
        else { // update opponent box
            $("#oppName").html(oppActive.name);
            $("#oppStatus").html(oppActive.status);
            $("#oppHPbox").show();
            $("#oppHPdisplay").html("HP: " + oppActive.stats[1] + "/" + oppActive.stats[0]);
            $('#oppHPbar').css({
                "width": oppActive.stats[1] / oppActive.stats[0] * 285,
                "background-color": "green"
            });
            if (oppActive.stats[1] / oppActive.stats[0] <= .5) {
                $('#oppHPbar').css({
                    "background-color": "yellow"
                });
            }
            if (oppActive.stats[1] / oppActive.stats[0] <= .1) {
                $('#oppHPbar').css({
                    "background-color": "red"
                });
            }
        }
    }

    function populateMenu() { //populate attack buttons
        updateHPdisplay("player");
        for (let i = 0; i < 4; i++) {
            $("#menu").append("<button class='btn-default menu-button' data=" + i + " id=menuButton" + (i + 1) + ">");
            $("#menuButton" + (i + 1)).html(playerActive.moves[i].name);
        }
        $("#menu").append("<button class='btn-default menu-button' data=switch id=menuButtonSwitch>");
        $("#menuButtonSwitch").html("Switch Pokemon");
    }

    $(document).on("click", ".menu-button", function () { // button handlers for select box buttons
        var data = $(this).attr("data");
        if (data === "switch") { // call select pokemon if user clicks switch
            $(".menu-button").remove();
            selectPokemon();
            swap = true;
        }
        else { // call battle function with selected attack's value
            $("#log").html("");
            $(".menu-button").remove();
            battle(parseInt(data));
        }
    });

    $(document).on("click", ".pokemon-slot", function () { // change player active when pokemon selected
        if (playerActive != undefined && playerTeam[$(this).attr("data")].name === playerActive.name){ // prevent user from selecting same pokemon
            return $("#log").append("</br>" + playerTeam[$(this).attr("data")].name + " is already in battle.");
        }
        if (playerTeam[$(this).attr("data")].stats[1] > 0) { // if not fainted
            playerActive = playerTeam[$(this).attr("data")];
            $("#selectBox").remove();
            $("#log").append("</br>Go " + playerTeam[$(this).attr("data")].name + "!");
            $("#log").scrollTop($("#log").prop("scrollHeight"));
            populateImg(); // populate new sprite image for selected pokemon
        }
        else {
            $("#log").append("</br>" + playerTeam[$(this).attr("data")].name + " doesn't have any energy left to battle.");
        }
    });

    $(document).on("click", "#cancel", () => { // cancel player switch
        if (playerActive !== undefined) { // prevent user from canceling if they have no active pokemon
            if (playerActive.stats[1] !== 0) {
                $("#selectBox").remove();
                populateMenu();
            }
            else {
                $("#log").append("</br>You must select a Pokemon to send out.");
            }
        }
        else {
            $("#log").append("</br>You must select a Pokemon to send out.");
        }
    });
});