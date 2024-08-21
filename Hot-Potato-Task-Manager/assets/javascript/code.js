var manager;
var qa;
var ba;
var dev;
var count = 0;
var assignTo = "";
var task;
var i = 1;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSCdkQH0zqSN5DksGq-fcesTHrzVYcjCM",
    authDomain: "project-1-6255c.firebaseapp.com",
    databaseURL: "https://project-1-6255c.firebaseio.com",
    projectId: "project-1-6255c",
    storageBucket: "project-1-6255c.appspot.com",
    messagingSenderId: "899461180848"
};
firebase.initializeApp(config);
var database = firebase.database();

// hide buttons
$("#dropBtn").hide();
$("#pass").hide();
$("#completed").hide();

database.ref("/Person").on("value", function (snapshot) { //initializing firebase
    if (snapshot.val() === null) { 
        var roles = ["Manager", "QA", "BA", "Dev"];
        var count = 0;
        for (var i = 0; i < 4; i++) { //ajax loop
            $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json',
                method: "GET"
            }).done(function (data) { //pushing ajax json's to firebase
                var teamMember = { data: data, role: roles[count] };
                database.ref("/Person").push(teamMember);
                count++;
            });
        }
    }
}, function (errorObject) { //error handler function
    console.log("The read failed: " + errorObject.code);
});

database.ref("/task").on("value", function (snapshot) {
    if (snapshot.val() !== null) { //show buttons if task exists
        $("#dropBtn").show();
        $("#completed").show();
        task = snapshot.val();
        count = snapshot.val().timesPassed;
        $("#task-display").html(snapshot.val().taskText);
        if (snapshot.val().assignedTo === "Manager") { //appending image 1
            $("#member1Img").attr("src", manager.data.results[0].picture.large);
        }
        if (snapshot.val().assignedTo === "QA") {
            $("#member1Img").attr("src", qa.data.results[0].picture.large);
        }
        if (snapshot.val().assignedTo === "BA") {
            $("#member1Img").attr("src", ba.data.results[0].picture.large);
        }
        if (snapshot.val().assignedTo === "Dev") {
            $("#member1Img").attr("src", dev.data.results[0].picture.large);
        }
        if (snapshot.val().timesPassed > 3) { //animation if passed over 3 times
            $("#potatoImg").attr("src", "https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F3oEduUNILoKY1sciqI%2Fgiphy.gif");
            $("#task-display").css({
                "font-weight": "bold",
                "color": "red",
                "font-size": "3.28rem"
            });
        }
    }
    else { //default images/html
        $("#member1Img").attr("src", "assets/images/mng.png");
        $("#task-display").html("");
    }
}, function (errorObject) { //error handler function
    console.log("The read failed: " + errorObject.code);
});

database.ref("/Person").on("child_added", function (snapshot) { //initializing page
    //assigning firebase nodes to local variables
    if (i == 1) {
        manager = snapshot.val();
    }
    if (i == 2) {
        qa = snapshot.val();
    }
    if (i == 3) {
        ba = snapshot.val();
    }
    if (i == 4) {
        dev = snapshot.val();
    }
    //displaying page with properties from json
    $("#role" + i).html(snapshot.val().role);
    $("#name" + i).html(snapshot.val().data.results[0].name.first + " " + snapshot.val().data.results[0].name.last);
    $("#pic" + i).attr("src", snapshot.val().data.results[0].picture.large);
    i++;
});

$("#task-button").on("click", function () { //add task event handler
    var taskText = $("#task-item").val().trim()
    task = { taskText: taskText, assignedTo: "Manager", timesPassed: 0};
    database.ref("/task").set(task);
    $("#member1Img").attr("src", manager.data.results[0].picture.large);
    $("#task-display").html(taskText);
    count = 0;
    $("#task-item").val("");
});

$(".assign").on("click", function () { //drop down event handler
    assignTo = $(this).data("role");
    $("#pass").show();
})

$("#pass").on("click", function () { //pass button event handler
    if (assignTo !== "") {
        if (assignTo !== task.assignedTo) {
            task.assignedTo = assignTo;
            $("#passTo").html("PASS TO");
            if (assignTo === "Manager") {
                $("#member2Img").attr("src", manager.data.results[0].picture.large)
            }
            if (assignTo === "QA") {
                $("#member2Img").attr("src", qa.data.results[0].picture.large)
            }
            if (assignTo === "BA") {
                $("#member2Img").attr("src", ba.data.results[0].picture.large)
            }
            if (assignTo === "Dev") {
                $("#member2Img").attr("src", dev.data.results[0].picture.large)
            }
            count++;
            task.timesPassed = count;
            $("#completed").show();

            $("#potatoImg").addClass("spin");
            setTimeout(function () { //pass animation
                $("#member1Img").attr("src", $("#member2Img").attr("src"));
                $("#member2Img").attr("src", "assets/images/end-user-icon.jpg");
                $("#potatoImg").removeClass("spin");
                database.ref("/task").set(task);
            }, 3000);

        }
        else {
            $("#passTo").html("PASS TO");
            $("#passTo").append(" (The "+ task.assignedTo + " already has this assignment.)")
        }
    }
});

$("#completed").on("click", function () { //completed event handler
    $("#task-display").css({
        "font-weight": "normal",
        "color": "black",
        "font-size": "2.28rem"
    });
    database.ref("/task").set(null);
    $("#potatoImg").attr("src", "assets/images/hot-potato.gif");
    $("#dropBtn").hide();
    $("#pass").hide();
    $("#completed").hide();
});