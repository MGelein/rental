<?php
//Clean the whole post Array before processing
filter_var_array($_POST, FILTER_SANITIZE_STRING);

//Get the action we're trying to do here
$action = $_POST['action'];

//Switch based on the action, forward the data to the correct method
switch($action){
    case 'save':
        break;
    case 'del':
        break;
    case 'move':
        break;
    case 'list':
        break;
    default:
        exit("This action ($action) was not recognized. Ignored.");
        break;
};