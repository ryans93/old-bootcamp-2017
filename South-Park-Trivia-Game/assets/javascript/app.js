var questions = [
    { question: "How many times has Kenny died?", answer1: "404", answer2: "26", answer3: "128", answer4: "97", answerValue: 4, pic1: "assets/images/q1-1.jpg", pic2: "assets/images/q1-2.gif" },
    { question: "What is Kenny's secret identity?", answer1: "The Coon", answer2: "Mysterion", answer3: "Batman", answer4: "Professor Chaos", answerValue: 2, pic1: "assets/images/q2-1.jpeg", pic2: "assets/images/q2-2.png" },
    { question: "What did Cartmen do to get revenge on this character?", answer1: "Burned his house down", answer2: "Murdered his parents and ground them into chili", answer3: "Killed him", answer4: "Trained a pony to bite off his weiner", answerValue: 2, pic1: "assets/images/q3-1.jpeg", pic2: "https://media.giphy.com/media/eKns7TZrhF1bG/giphy.gif" },
    { question: "Which character molested Mr. Mackey as a child?", answer1: "Woodsy the Owl", answer2: "Cartman's mom", answer3: "Chef", answer4: "Mr. Garrison", answerValue: 1, pic1: "assets/images/q4-1.jpeg", pic2: "assets/images/q4-2.jpeg" },
    { question: "What state is South Park in?", answer1: "Montana", answer2: "Nebraska", answer3: "California", answer4: "Colorado", answerValue: 4, pic1: "assets/images/q5-1.png", pic2: "assets/images/q5-2.jpeg" },
    { question: "Where is Kyle's family from?", answer1: "Canada", answer2: "New Jersey", answer3: "South Park", answer4: "Israel", answerValue: 2, pic1: "assets/images/q6-1.png", pic2: "assets/images/q6-2.jpeg" },
    { question: "Kanye West likes...?", answer1: "rap music", answer2: "girls", answer3: "tacos", answer4: "fish sticks", answerValue: 4, pic1: "assets/images/q7-1.png", pic2: "assets/images/q7-2.jpeg" },
    { question: "Who was hidden within many of the early episodes of South Park?", answer1: "The Visitors", answer2: "Cartman's father", answer3: "Randy Marsh", answer4: "Barbara Streisand", answerValue: 1, pic1: "assets/images/q2-1.jpeg", pic2: "assets/images/q8-2.jpeg" },
    { question: "How many times did Mr. Garrison change genders/sexual orientation?", answer1: "1", answer2: "2", answer3: "3", answer4: "4", answerValue: 3, pic1: "assets/images/q9-1.jpeg", pic2: "assets/images/q9-2.jpeg" },
    { question: "Which character replaced Kenny after he died 'permanently'?", answer1: "Craig", answer2: "Tweek", answer3: "Wendy", answer4: "Butters", answerValue: 2, pic1: "assets/images/q2-1.jpeg", pic2: "assets/images/q10-2.jpeg" }
];

var count = 0;
var correct = 0;
var counter = 30;
display();

var interval = setInterval(function () { //counter function
    if (counter > 0) {
        counter -= 1;
        if (counter < 11) {
            $("#timer").css({
                "color": "red"
            });
        }
        else {
            $("#timer").css({
                "color": "blue"
            });
        }
        $("#timer").html(counter);
    }
}, 1000);

var timeout = setTimeout(function () { //timeout function
    showAnswer(timeout, interval);
}, 1000 * 30);

$("#submit").on("click", function () { //submit button handler
    showAnswer(timeout, interval);
})

function display() {
    if (count < 10) {
        $("#submit").show();
        $("h2").html(questions[count].question);
        $("#picContainer").css({
            "background-image": "url(" + questions[count].pic1 + ")",
            "background-size": "100% 100%",
            "background-repeat": "no-repeat",
            "height": "100%"
        });
        $("#text1").html(questions[count].answer1);
        $("#text2").html(questions[count].answer2);
        $("#text3").html(questions[count].answer3);
        $("#text4").html(questions[count].answer4);
    }
    else {
        clearTimeout(timeout);
        clearInterval(interval);
        console.log(correct);
        $("h2").html("Congratulations, you finished the quiz! You got " + correct + "/10 correct!");
        $("#timer").remove();
        $("#submit").remove();
        if (correct < 5) {
            $("#answerDisplay").html("You suck!");
            $("#answerDisplay").css({
                "color": "red",
                "margin-left": "20.833%"
            });
            $("#mainWindow").html("");
            var div = $("<div class=col-xs-2></div>");
            $("#mainWindow").append(div);
            var div2 = $("<div class=col-xs-8 id=picBox></div>");
            $("#mainWindow").append(div2);
            $("#picBox").css({
                "background-image": "url(assets/images/bad.png)",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "height": "50vh",
            });

        }
        else if (correct < 8 && correct > 4) {
            $("#answerDisplay").html("You did ok.");
            $("#answerDisplay").css({
                "color": "blue",
                "margin-left": "20.833%"
            });
            $("#mainWindow").html("");
            var div = $("<div class=col-xs-2></div>");
            $("#mainWindow").append(div);
            var div2 = $("<div class=col-xs-8 id=picBox></div>");
            $("#mainWindow").append(div2);
            $("#picBox").css({
                "background-image": "url(assets/images/ok.png)",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "height": "50vh"
            });
        }
        else {
            $("#answerDisplay").html("You did great!");
            $("#answerDisplay").css({
                "color": "green",
                "margin-left": "20.833%"
            });
            $("#mainWindow").html("");
            var div = $("<div class=col-xs-2></div>");
            $("#mainWindow").append(div);
            var div2 = $("<div class=col-xs-8 id=picBox></div>");
            $("#mainWindow").append(div2);
            $("#picBox").css({
                "background-image": "url(assets/images/good.png)",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "height": "50vh"
            });
        }
    }
    //append pic1


} //end display function

function showAnswer(timeout, interval) {
    //append pic 2
    clearTimeout(timeout);
    clearInterval(interval);
    $("#submit").hide();
    $("#picContainer").css({
        "background-image": "url(" + questions[count].pic2 + ")",
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "height": "100%"
    });
    var userGuess = $('input[name="response"]:checked').val();
    $("#text" + questions[count].answerValue).css({
        "color": "green"
    });
    if (userGuess == questions[count].answerValue) {
        correct++;
        $("#answerDisplay").html("Correct!");
        $("#answerDisplay").css({
            "color": "green"
        });
    }
    else {
        $("#text" + userGuess).css({
            "color": "red"
        });
        $("#answerDisplay").html("Incorrect");
        $("#answerDisplay").css({
            "color": "red"
        });
    }
    count++;
    setTimeout(function () { //timeout function
        reset();
        display();
    }, 1000 * 3);
}

function reset() {
    counter = 30;
    $("#text1").css({
        "color": "black"
    });
    $("#text2").css({
        "color": "black"
    });
    $("#text3").css({
        "color": "black"
    });
    $("#text4").css({
        "color": "black"
    });
    $("#answerDisplay").html("");
    $("#answerDisplay").css({
        "color": "black"
    });

    interval = setInterval(function () { //counter function
        if (counter > 0) {
            counter -= 1;
            if (counter < 11) {
                $("#timer").css({
                    "color": "red"
                });
            }
            else {
                $("#timer").css({
                    "color": "blue"
                });
            }
            $("#timer").html(counter);
        }
    }, 1000);

    timeout = setTimeout(function () { //timeout function
        showAnswer(timeout, interval);
    }, 1000 * 30);
}