$( document ).ready(function() {

    var topics= [ "Raptors", "Warrior", "Lakers", "Rockets", "Bucks", "Celtics", "Hawks", "Pelican"];

    // Create a button for each Team in the array
    // Run a 4 loop on array

    for(var i = 0; i < topics.length; i++) {
        // make a button for each element in array
        var x = $("<button>")
        // add team name text to button
        x.text(topics[i])
        // add team name data-type to button
        x.attr("data-team", topics[i])
        // add className to each button
        x.addClass("btnClass")
        // Append buttons to buttonHolder div
        $("#buttonHolder").append(x)
    }

    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

    $(document).on("click", ".btnClass", function(){

        var teamName = $(this).attr("data-team");

        var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + teamName + "&api_key=ANBgfW5F2cjtR85e50RUBGvJ0z5qVjOf&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {       
            
            for(var i = 0; i <= 10; i++) {
                var stillUrl = response.data[i].images.fixed_height_still.url
                var giphyUrl = response.data[i].images.fixed_height.url;
    
                // make a generic image tag
                var y = $("<img>");

                // give images a class name
                y.addClass("imgGiphy")

                // add url as src to image tag
                y.attr("src", stillUrl);

                // give the img a data-status of still
                y.attr("data-status", "still");

                // give the img a data-img of stillUrl
                y.attr("data-img", stillUrl);

                // give the img a data-giphy of giphyUrl
                y.attr("data-giphy", giphyUrl);
                
                // add the giphy to the apiOutput
                $("#image-wrapper").append(y);

                // adding the rating to each giphy
                // get the giphy rating
                var rating = "Rating: " + response.data[i].rating.toUpperCase();
                console.log(rating);

                // append rating to image-wrapper
                $("#image-wrapper").append("<p>", rating, "<br>");
    
            }

        });
    
    });


    $(document).on("click", ".imgGiphy", function() {
        // check if data-status attr is equal to still
        if($(this).attr("data-status") === "still") {
            // set data-status to "giphy"
            $(this).attr("data-status", "giphy");
            // change src to giphyUrl
            $(this).attr("src", $(this).attr("data-giphy"))
        } else {
            // set data-status to "still"
            $(this).attr("data-status", "still");
            // change src to stillUrl
            $(this).attr("src", $(this).attr("data-img"))
            
        }
    })

    // $("#submitBtn").on("click", function() {
    //     var userInput = $("#newGiphy").val();
    //     console.log(userInput);

    //     topics.push(userInput)

    // })






// end of document.ready function
});