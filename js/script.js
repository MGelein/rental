/**
 * The ready function for the whole doucment. This is run once the whole
 * document is loaded.
 */
$(document).ready(function(){
    //Prevent caching of Ajax requests
    $.ajaxSetup({cache: false});


    //Try to save a test rental
    saveRental(12001, ["B01", "B02"], "12-01-12", "12-02-12", 0, "No Comment");
});