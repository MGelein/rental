/**
 * The ready function for the whole doucment. This is run once the whole
 * document is loaded.
 */
$(document).ready(function(){
    //Prevent caching of Ajax requests
    $.ajaxSetup({cache: false});

    deleteRental(12002);
});