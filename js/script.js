/**
 * This document contains the main code for this application,
 * as well as containing the entry point.
 */
/**This contains the template of a single rentalItem in the rentalOverview */
var rentalItem;
/**This is a list of rentals, contains the list of JSON data as received from the server*/
var rentals;
/**Contains the latest timestamp of the rentals update from the server */
var timestamp = 0;

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

    //Start the loop to update any changes from the rentals
    setInterval(updateRentals, 2000);
});

/**
 * Tries to update the rentals, first checks the timestamp of the
 * last update agains our last version, if it is lower, we need to update
 */
function updateRentals(){
    //First check our timestamp agains the one found on the backend
    $.get('data/timestamp.txt', function(data){
        //First cast to number
        const ts = Number(data);
        //Then compare to current timestamp, if the current timestamp is older, please update
        if(ts > timestamp){
            //Retrieve the list of rentals from the backend
            listRentals("all", function(data){
                //Only update the timestamp once we have the data
                timestamp = ts;
                //Then set the data to the global variable
                rentals = data;
                console.log("Rentals succesfully updated");
            });
        }
    });
}