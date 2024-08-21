 var blue = [
    {
        name: "Alakazam",
        types: ["Psychic"],
        doubleWeaknesses: [""],
        weaknesses: ["Bug", "Ghost", "Dark"],
        resistances: ["Fighting", "Psychic"],
        doubleResistances: [""],
        immunities: [""],
        stats: [220, 220, 115, 104, 302, 214, 269],
        status: "",
        imageFront: "assets/images/alakazam-front.gif",
        imageBack: "assets/images/alakazam-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Psychic",
                type: ["Psychic", "Special"],
                power: 90,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Shadow Ball",
                type: ["Ghost", "Special"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Future Sight",
                type: ["Psychic", "Special"],
                power: 120,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Reflect",
                type: ["Psychic", "-"],
                power: 0,
                accuracy: "-",
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Machamp",
        types: ["Fighting"],
        doubleWeaknesses: [""],
        weaknesses: ["Flying", "Psychic", "Fairy"],
        resistances: ["Bug", "Rock", "Dark"],
        doubleResistances: [""],
        immunities: [""],
        stats: [290, 290, 291, 181, 148, 192, 126],
        status: "",
        imageFront: "assets/images/machamp-front.gif",
        imageBack: "assets/images/machamp-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Cross Chop",
                type: ["Fighting", "Physical"],
                power: 100,
                accuracy: 80,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Bulk Up",
                type: ["Fighting", "-"],
                power: 0,
                accuracy: "-",
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Knock Off",
                type: ["Dark", "Physical"],
                power: 65,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Poison Jab",
                type: ["Poison", "Physical"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Aerodactyl",
        types: ["Rock", "Flying"],
        doubleWeaknesses: [""],
        weaknesses: ["Water", "Electric", "Ice", "Rock", "Steel"],
        resistances: ["Normal", "Fire", "Poison", "Flying", "Bug"],
        doubleResistances: [""],
        immunities: ["Ground"],
        stats: [270, 270, 236, 148, 137, 170, 291],
        status: "",
        imageFront: "assets/images/aerodactyl-front.gif",
        imageBack: "assets/images/aerodactyl-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Rock Slide",
                type: ["Rock", "Physical"],
                power: 75,
                accuracy: 90,
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
                name: "Iron Head",
                type: ["Steel", "Physical"],
                power: 80,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Sky Drop",
                type: ["Flying", "Physical"],
                power: 60,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Exeggutor",
        types: ["Grass", "Psychic"],
        doubleWeaknesses: ["Bug"],
        weaknesses: ["Fire", "Ice", "Poison", "Flying", "Ghost", "Dark"],
        resistances: ["Electric", "Water", "Grass", "Fighting", "Ground", "Psychic"],
        doubleResistances: [""],
        immunities: [""],
        stats: [300, 300, 214, 192, 280, 170, 126],
        status: "",
        imageFront: "assets/images/exeggutor-front.gif",
        imageBack: "assets/images/exeggutor-back.gif",
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
                name: "Psychic",
                type: ["Psychic", "Special"],
                power: 90,
                accuracy: 100,
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
                name: "Hypnosis",
                type: ["Psychic", "-"],
                power: 0,
                accuracy: 60,
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
    {
        name: "Arcanine",
        types: ["Fire"],
        doubleWeaknesses: [""],
        weaknesses: ["Ground", "Water", "Rock"],
        resistances: ["Fire", "Grass", "Ice", "Bug", "Fairy", "Steel"],
        doubleResistances: [""],
        immunities: [""],
        stats: [290, 290, 247, 181, 225, 181, 214],
        status: "",
        imageFront: "assets/images/arcanine-front.gif",
        imageBack: "assets/images/arcanine-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Extreme Speed",
                type: ["Normal", "Physical"],
                power: 80,
                accuracy: 100,
                priority: 1,
                effect: function () {

                }
            },
            {
                name: "Flare Blitz",
                type: ["Fire", "Physical"],
                power: 120,
                accuracy: 100,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Thunder Fang",
                type: ["Electric", "Physical"],
                power: 65,
                accuracy: 95,
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
        name: "Gyarados",
        types: ["Water", "Flying"],
        doubleWeaknesses: ["Electric"],
        weaknesses: ["Rock"],
        resistances: ["Fire", "Water", "Steel", "Fighting", "Bug"],
        doubleResistances: [""],
        immunities: ["Ground"],
        stats: [300, 300, 280, 179, 137, 225, 183],
        status: "",
        imageFront: "assets/images/gyarados-front.gif",
        imageBack: "assets/images/gyarados-back.gif",
        ability: function () {

        },
        AI: function () {
            var random = Math.floor(Math.random() * 3.99);
            return random;
        },
        moves: [
            {
                name: "Aqua Tail",
                type: ["Water", "Physical"],
                power: 90,
                accuracy: 90,
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
                name: "Ice Fang",
                type: ["Ice", "Physical"],
                power: 65,
                accuracy: 95,
                priority: 0,
                effect: function () {

                }
            },
            {
                name: "Dragon Dance",
                type: ["Dragon", "-"],
                power: 0,
                accuracy: "-",
                priority: 0,
                effect: function () {

                }
            },
        ]
    },
]

export default blue