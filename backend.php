<?php
//Clean the whole post Array before processing
filter_var_array($_POST, FILTER_SANITIZE_STRING);

//Get the action we're trying to do here
$action = $_POST['action'];
//Grab the data component, this should always be an object
$data = $_POST['data'];

//Switch based on the action, forward the data to the correct method
switch($action){
    case 'save':
        save($data);
        break;
    case 'del':
        delete($data);
        break;
    case 'move':
        move($data);
        break;
    case 'list':
        break;
    default:
        exit("This action ($action) was not recognized. Ignored.");
        break;
};

function move($saveData){
    //First check the provided data
    if(!array_key_exists('id', $saveData)){
        exit("Can't delete without a provided id parameter");
    }
    //Now extract the id info
    $id = $saveData['id'];

    //Now create the two file URLS
    $fileA = "data/open/$id.rental";
    $fileB = "data/closed/$id.rental";

    //Depending on which file exists, move it to the other folder using rename
    if(file_exists($fileA) && file_exists($fileB)){
        //If both files exists, we have a duplicate, remove the open one
        unlink($fileA);
        echo "Duplicate files were found. Removed the 'open' copy ($fileA)";
    }else if(file_exists($fileA)){
        rename($fileA, $fileB);
        echo "Succesfully renamed $fileA to $fileB";
    }else if(file_exists($fileB)){
        rename($fileB, $fileA);
        echo "Succesfully renamed $fileB to $fileA";
    }else{
        //If neither file exists, report this back to the frontend and continue
        echo "Cannot move a none existing file ($fileA, $fileB)";
    }
}

/**
 * Removes the rental object that has the provided id
 */
function delete($saveData){
    //First check the provided data
    if(!array_key_exists('id', $saveData)){
        exit("Can't delete without a provided id parameter");
    }
    //Now extract the id info
    $id = $saveData['id'];

    //Now check both the open and closed folder, if so, remove
    if(file_exists("data/open/$id.rental")){
        if(unlink("data/open/$id.rental")){
            echo "Succesfully removed data/open/$id.rental";
        }else{
            echo "Could not remove data/open/$id.rental";
        }
    }
    if(file_exists("data/closed/$id.rental")) {
        if(unlink("data/closed/$id.rental")){
            echo "Succesfully removed data/closed/$id.rental";
        }else{
            echo "Could not remove data/closed/$id.rental";
        }
    }
}

/**
 * Saves using the provided data object, saving is always done in the open folder
 */
function save($saveData){
    //Input checking and validation
    if(!array_key_exists('id', $saveData)){
        exit("Can't save without a provided id parameter");
    }else if(!array_key_exists('warning', $saveData)){
        exit("Can't save without a provided warning parameter");
    }else if(!array_key_exists('startDate', $saveData)){
        exit("Can't save without a provided startDate parameter");
    }else if(!array_key_exists('endDate', $saveData)){
        exit("Can't save without a provided endDate parameter");
    }else if(!array_key_exists('items', $saveData)){
        exit("Can't save without a provided items parameter");
    }else if(!array_key_exists('comment', $saveData)){
        exit("Can't save without a provided comment parameter");
    }

    //Now grab all the data
    $id = $saveData['id'];
    $warning = $saveData['warning'];
    $comment = $saveData['comment'];
    $endDate = $saveData['endDate'];
    $startDate = $saveData['startDate'];
    $items = implode(",", $saveData['items']);

    //Now that we have all the data, save it to the disk
    $fileName = "data/open/$id.rental";
    $fileData = "startDate=$startDate\nendDate=$endDate\nwarning=$warning\nitems=$items\ncomment=$comment";
    $result = file_put_contents($fileName, $fileData);

    //Test if the result was succesful
    if($result === FALSE) echo "The rental could not be saved.";
    else echo "The rental with id($id) has been succesfully saved";
}   