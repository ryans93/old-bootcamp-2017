$("document").ready(function () {
    var topics = ["squid", "octopus", "nautilus", "cuttlefish", "stingray"];
    for(var i=0;i<topics.length;i++){
        var button=$("<button>");
        button.attr("class","query")
        button.data("topic",topics[i]);
        button.append(topics[i]);
        $("#buttonRow").append(button);
    }

    $("#submit").on("click", function(){
        var searchQuery=$("#searchTopic").val().trim();
        var button=$("<button>");
        button.attr("class","query")
        button.data("topic",searchQuery);
        button.append(searchQuery);
        $("#buttonRow").append(button);
    });

    $(document).on('click', ".query", function(){ 
        var type = $(this).data("topic");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+"&limit=10&api_key=dc6zaTOxFJmzC";
        console.log(type);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
        for(i=0;i<10;i++){
            var mainContainer=$("<div>");
            var ratingContainer=$("<div class=row>");
            ratingContainer.html(response.data[i].rating);
            console.log(response.data[i].rating)
            var pic=$("<img>");
            pic.data("state","still");
            pic.data("stillSrc",response.data[i].images.fixed_height_still.url);
            pic.data("animatedSrc",response.data[i].images.fixed_height.url);
            pic.attr("src",response.data[i].images.fixed_height_still.url);
            mainContainer.append(pic);
            mainContainer.append(ratingContainer);
            $("#gifDisplay").prepend(mainContainer);
        }
    });
});

    $(document).on('click', "img", function(){ 
        if ($(this).data("state")==="still"){
            $(this).data("state","animated");
            $(this).attr("src",$(this).data("animatedSrc"));
        }
        else{
            $(this).data("state","still");
            $(this).attr("src",$(this).data("stillSrc"));
        }
});




});



