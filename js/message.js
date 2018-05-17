/**
 * Contains all the functionality to message with the backend
 */

/**
 * Saves the provided data back into a rental, by messaging the provided data
 * to the backend server
 * @param {Number} id the id number of this rental
 * @param {Array} items the array of items to add to this rental. Even a single item must be in array form
 * @param {String} startDate the date the rental has been rented out, in String form
 * @param {String} endDate the date the rental needs to be returned by, in String form.
 * @param {Number} warning the warning level of this rental. 0 = none, 1 = low, 2 = high
 * @param {String} comment any comments you want to attach to this rental
 */
function saveRental(id, items, startDate, endDate, warning, comment){
    //Input checking
    if(!id) return console.error("You can't save a rental without a provided id number");
    if(!items) return console.error("You can't save a rental without providing any items");
    if(!startDate) return console.error("You can't save a rental without providing a startDate");
    if(!endDate) return console.error("You can't save a rental without providing an endDate");

    //For optional fields, fill out defaults, if they are not set yet
    if(!warning) warning = 0;
    if(!comment) comment = "";

    //If items are not yet an array, turn it into one
    if(items.constructor != Array) items = [items];

    //UriEncode the comment
    comment = encodeURI(comment);

    //Then build the message object
    const message = {
        "id": id,
        "items": items,
        "startDate": startDate,
        "endDate": endDate,
        "warning": warning,
        "comment": comment
    }

    //After the message object has been build, sent it to the backend
    messageBackend("save", message, function(response){
        console.log(response);
    });
}

/**
 * Shorthand form to delete files en-masse with an array of id-numbers
 */
function deleteRentals(ids){
    $.each(ids, function(index, value){
        deleteRental(value);
    });
}

/**
 * Deletes the rental with the provided id from the disk. At least , communicate this with 
 * the back-end server
 * @param {Number} id 
 */
function deleteRental(id){
    //Create the message object
    const message = {
        "id": id
    };

    //Now acutally message the back-end
    messageBackend("del", message,  function(response){
        console.log(response);
    });
}

/**
 * Shorthand form to move files en-masse with an array of id numbers
 * @param {Array} ids 
 */
function moveRentals(ids){
    $.each(ids, function(index, value){
        moveRental(value);
    });
}

/**
 * Moves the rental with the provided id from either the open or the closed folder to the other folder.
 * Works two ways round, basically being a 'close' and 'reopen' option.
 * @param {Number} id 
 */
function moveRental(id){
    //Create the message object
    const message = {
        "id": id
    };

    //Now acutally message the back-end
    messageBackend("move", message,  function(response){
        console.log(response);
    });
}

/**
 * Sends the provided action and message to the backend
 * @param {String} action 
 * @param {Object} message 
 * @param {Function} callback optional parameter, callback on response, with the response text
 */
function messageBackend(action, message, callback){
    //Populate the object to send to the server
    const data = {"action": action, "data": message};

    //Actually send the object to the server
    $.post('backend.php', data, function(response){
        //If a callback is defined, forward it the server-response
        if(callback) callback(response);
    });
}