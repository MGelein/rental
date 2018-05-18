/**
 * This document contains the main code for this application,
 * as well as containing the entry point.
 */
/**This contains the template of a single rentalItem in the rentalOverview */
var rentalItem;
/**This is a list of rentals, contains the list of JSON data as received from the server*/
var rentals;

/**
 * The ready function for the whole doucment. This is run once the whole
 * document is loaded.
 */
$(document).ready(function(){
    //Prevent caching of Ajax requests
    $.ajaxSetup({cache: false});
    console.log("Ajax setup done.");

    //Now initialize all tooltips in the file
    $('[data-toggle="tooltip"]').tooltip();
    console.log("Tooltips enabled.");

    //Download the rental item template
    $.get('data/templates/rental.html', function(response){
        rentalItem = response;
        console.log("Loaded rentalItem template.");
    });

    //Retrieve the list of rentals from the backend
    listRentals("all", function(data){
        rentals = data;
        console.log("Rentals succesfully received");
    });
});