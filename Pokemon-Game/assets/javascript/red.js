var red = [
    {
        name: "Pikachu",
        types: ["Electric"],
        doubleWeaknesses: [""],
        weaknesses: ["Ground"],
        resistances: ["Electric", "Flying", "Steel"],
        doubleResistances: [""],
        immunities: [""],
        stats: [180, 180, 252, 93, 230, 115, 203],
        status: "",
        imageFront: "assets/images/pikachu-front.gif",
        imageBack: "assets/images/pikachu-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Volt Tackle",
                type: ["Electric", "Physical"],
                power: 120,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Quick Attack",
                type: ["Normal", "Physical"],
                power: 40,
                accuracy: 100,
                priority: 1,
                effect: function () {

                }
            },
            {
                name: "Light Screen",
                type: ["Psychic", "-"],
                power: 0,
                accuracy: "-",
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Nuzzle",
                type: ["Electric", "Physical"],
                power: 20,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Lapras",
        types: ["Water", "Ice"],
        doubleWeaknesses: [""],
        weaknesses: ["Fighting", "Electric", "Grass", "Rock"],
        resistances: ["Water"],
        doubleResistances: ["Ice"],
        immunities: [""],
        stats: [370, 370, 192, 181, 192, 214, 137],
        status: "",
        imageFront: "assets/images/lapras-front.gif",
        imageBack: "assets/images/lapras-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Surf",
                type: ["Water", "Special"],
                power: 90,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Blizzard",
                type: ["Ice", "Special"],
                power: 110,
                accuracy: 70,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Ice Shard",
                type: ["Ice", "Physical"],
                power: 40,
                accuracy: 100,
                priority: 1,
                effect: function () {

                }
            },
            {
                name: "Psychic",
                type: ["Psychic", "Special"],
                power: 90,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Snorlax",
        types: ["Normal"],
        doubleWeaknesses: [""],
        weaknesses: ["Fighting"],
        resistances: [""],
        doubleResistances: [""],
        immunities: ["Ghost"],
        stats: [430, 430, 247, 148, 148, 247, 71],
        status: "",
        imageFront: "assets/images/snorlax-front.gif",
        imageBack: "assets/images/snorlax-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Toxic",
                type: ["Poison", "-"],
                power: 0,
                accuracy: 90,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Body Slam",
                type: ["Normal", "Physical"],
                power: 85,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Crunch",
                type: ["Dark", "Physical"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "High Horsepower",
                type: ["Ground", "Physical"],
                power: 95,
                accuracy: 95,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Venusaur",
        types: ["Grass", "Poison"],
        doubleWeaknesses: [""],
        weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
        resistances: ["Electric", "Water", "Fighting", "Fairy"],
        doubleResistances: ["Grass"],
        immunities: [""],
        stats: [270, 270, 185, 188, 225, 225, 181],
        status: "",
        imageFront: "assets/images/venusaur-front.gif",
        imageBack: "assets/images/venusaur-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Leaf Storm",
                type: ["Grass", "Special"],
                power: 130,
                accuracy: 90,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Leech Seed",
                type: ["Grass", "-"],
                power: 0,
                accuracy: 90,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Sludge Bomb",
                type: ["Poison", "Special"],
                power: 90,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Bulldoze",
                type: ["Ground", "Physical"],
                power: 60,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Charizard",
        types: ["Fire", "Flying"],
        doubleWeaknesses: ["Rock"],
        weaknesses: ["Water", "Electric",],
        resistances: ["Fire", "Fighting", "Steel", "Fairy"],
        doubleResistances: ["Grass", "Bug"],
        immunities: ["Ground"],
        stats: [266, 266, 190, 177, 245, 192, 225],
        status: "",
        imageFront: "assets/images/charizard-front.gif",
        imageBack: "assets/images/charizard-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Fire Blast",
                type: ["Fire", "Special"],
                power: 110,
                accuracy: 85,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Air Slash",
                type: ["Flying", "Special"],
                power: 75,
                accuracy: 95,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Focus Blast",
                type: ["Fighting", "Special"],
                power: 120,
                accuracy: 70,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Will-O-Wisp",
                type: ["Fire", "-"],
                power: 0,
                accuracy: 85,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Blastoise",
        types: ["Water"],
        doubleWeaknesses: [""],
        weaknesses: ["Electric", "Grass"],
        resistances: ["Fire", "Water", "Steel", "Ice"],
        doubleResistances: [""],
        immunities: [""],
        stats: [268, 268, 188, 225, 192, 236, 177],
        status: "",
        imageFront: "assets/images/blastoise-front.gif",
        imageBack: "assets/images/blastoise-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Hydro Pump",
                type: ["Water", "Special"],
                power: 110,
                accuracy: 80,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Flash Cannon",
                type: ["Steel", "Special"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Dark Pulse",
                type: ["Dark", "Special"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Ice Beam",
                type: ["Ice", "Special"],
                power: 90,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
]

export default red