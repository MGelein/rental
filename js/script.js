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
/**Value that decides if we see rentals that have been closed*/
var showClosed = false;

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
    setInterval(updateRentals, 1000);
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
            listRentals((showClosed) ? "all" : "open", function(data){
                //Only update the timestamp once we have the data
                timestamp = ts;
                //Then set the data to the global variable
                rentals = data;
                console.log("Rentals succesfully received, updating screen");
                updateRentalOverview();
            });
        }
    });
}

/**
 * Handles the updating of the rental overview. This constructs a list of 
 * rentals received from the server using the rentalList template.
 */
function updateRentalOverview(){
    //The start of the HTML we will be injecting
    var html = "";
    //Now go through every rental and render it to the overview
    $.each(rentals, function(index, rental){
        var line = rentalItem.replace(/%IDNUMBER%/g, rental.id);
        line = line.replace(/%STARTDATE%/g, rental.startDate);
        line = line.replace(/%ENDDATE%/g, rental.endDate);
        line = line.replace(/%ITEMS%/g, rental.items.join(', '));
        line = line.replace(/%WARNING%/g, rental.warning);
        //Append this line to the html
        html += line;
    });

    //Now set the HTML of the rentalOverview
    $('#rentalList').html(html);

    //Log the event
    console.log("Rental overview updated.");
}