<?php
    require_once '../database/config.php';
    require_once '../database/DiveSite.php';
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $objectType = $_POST['objectType'];
    $transactionType = $_POST['transactionType'];

    function uploadFile($target_dir, $fileIndex) {
        if($_FILES[$fileIndex]) {
            
            $target_file = $target_dir . basename($_FILES[$fileIndex]['name']);
            
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

            $check = getimagesize($_FILES[$fileIndex]['tmp_name']);

            if($check !== false) {
                $uploadOk = 1;
            } else {
                $uploadOk = 0;
            }
            
            $uniqueIndex = 0;

            $pieces = pathinfo($target_file);
            $filenameToStore = $pieces['filename'] . '.' . $pieces['extension'];

            while(file_exists($target_file)) {
                $uniqueIndex++;
                $target_file = $pieces['dirname'] . '/' . $pieces['filename'] . '[' . $uniqueIndex . '].' . $pieces['extension'];

                $filenameToStore = $pieces['filename'] . '[' . $uniqueIndex . '].' . $pieces['extension'];
            }

            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }

            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
            } else {
                move_uploaded_file($_FILES[$fileIndex]['tmp_name'], $target_file);
            }
        }

        return $filenameToStore;
    }

    switch($objectType) {
        case 'place':
            switch($transactionType) {

                case 'plainUpdate':
                    
                 $diveSites = json_decode($_POST['data']);

                foreach($diveSites as $diveSite) {
                    // This should be a divesite with the new data, but the id of the one in the db,
                    $diveSiteToUpdate = new DiveSite($diveSite);
                    $diveSiteToUpdate->update();

                }
                    
                break;

                case 'getAll':
                    echo json_encode(DiveSite::getAll());
                    break;

                case 'delete':
                    echo 'i am saying delete';

                    //var_dump($_POST);
                    $diveSite = DiveSite::findById($_POST['id']);


                   
                     $diveSite->delete();
                    
                    break;

                case 'update':
                    echo 'hitting update function in php';
                    
                    $diveSite = DiveSite::findById($_POST['id']);

                    

                    var_dump($diveSite);

                    // Take the existing locationImageString here.
                    $originalLocationImageString = $diveSite->getValue('locationImagePaths');

                    // Turn it into an actual array
                    $originalLocationImageStringAsArray = json_decode($originalLocationImageString);

                    // // This must be loopable
                    if(array_key_exists('locationImageOne', $_FILES)) {
                        $locationImageOneToStore = uploadFile('../img/divesites/location_images/', 'locationImageOne');
                        $originalLocationImageStringAsArray[0] = $locationImageOneToStore;
                    }

                    if(array_key_exists('locationImageTwo', $_FILES)) {
                        $locationImageTwoToStore = uploadFile('../img/divesites/location_images/', 'locationImageTwo'); 
                        $originalLocationImageStringAsArray[1] = $locationImageTwoToStore;
                    }

                    if(array_key_exists('locationImageThree', $_FILES)) {
                        $locationImageThreeToStore = uploadFile('../img/divesites/location_images/', 'locationImageThree'); 
                        $originalLocationImageStringAsArray[2] = $locationImageThreeToStore;
                    }

                    if(array_key_exists('locationImageFour', $_FILES)) {
                        $locationImageFourToStore = uploadFile('../img/divesites/location_images/', 'locationImageFour'); 
                        $originalLocationImageStringAsArray[3] = $locationImageFourToStore;
                    }

                    // Encode back to JSON
                    $originalLocationImageString = json_encode($originalLocationImageStringAsArray);

                    // // Update divesite
                    $diveSite->setValue('locationImagePaths', $originalLocationImageString);

                    if(array_key_exists('thumbnailFile', $_FILES)) {
                        $filenameToStore = uploadFile('../img/divesites/thumbnails/', 'thumbnailFile');
                        $diveSite->setValue('thumbnailPath', $filenameToStore);
                    }

                    $diveSite->setValue('heading', $_POST['heading']);
                    $diveSite->setValue('subheading', $_POST['subheading']);
                    $diveSite->setValue('rating', $_POST['rating']);
                    $diveSite->setValue('islands', $_POST['islands']);
                    $diveSite->setValue('locationTextTitle', $_POST['locationTextTitle']);
                    $diveSite->setValue('locationText', $_POST['locationText']);
                    $diveSite->setValue('virtualTourUrl', $_POST['virtualTourUrl']);
                    $diveSite->setValue('regions', $_POST['regions']);
                    


                    if ($_POST['isDiveSite']) {
                        $diveSite->setValue('diverLevel', $_POST['diverLevel']);
                        $diveSite->setValue('depth', $_POST['depth']);
                        $diveSite->setValue('visibility', $_POST['visibility']);
                        $diveSite->setValue('current', $_POST['current']);
                    } else {
                        $diveSite->setValue('ratingComment', $_POST['ratingComment']);
                        $diveSite->setValue('type', $_POST['type']);
                        $diveSite->setValue('isPaid', $_POST['isPaid']);
                    }

                    if ($diveSite->getValue('depth') == '') {
                        $diveSite->setValue('depth', null);
                    }

                    if ($diveSite->getValue('visibility') == '') {
                        $diveSite->setValue('visibility', null);
                    }

                   // if ($diveSite->getValue('isDraft') == '') {
                        $diveSite->setValue('isDraft', $_POST['isDraft']);
                   // }

                    echo 'UPDATED IN PHP SCRIPT';
                   var_dump($_POST);

                    $diveSite->update();



                    DiveSite::removeUnusedImages();

                    echo json_encode($diveSite);


                    break;
                case 'save':
                //echo 'data in backend';
                    // var_dump($_POST);


                    //$filenameToStore = uploadFile('../img/divesites/thumbnails/', 'thumbnailFile');
                    $diveSite = new DiveSite($_POST);
                    if(array_key_exists('thumbnailFile', $_FILES)) {
                        $filenameToStore = uploadFile('../img/divesites/thumbnails/', 'thumbnailFile');
                        $diveSite->setValue('thumbnailPath', $filenameToStore);
                    }
                    
                    
                    
                    
                    
                   // $diveSite->setValue('thumbnailPath', $filenameToStore);
                    
                    if ($_POST['isDiveSite'] == '1') {

                        



                        $locationImageOneToStore = '';//uploadFile('../img/divesites/location_images/', 'locationImageOne');
                        $locationImageTwoToStore =  '';//uploadFile('../img/divesites/location_images/', 'locationImageTwo');
                        $locationImageThreeToStore = '';// uploadFile('../img/divesites/location_images/', 'locationImageThree');
                        $locationImageFourToStore =  '';//uploadFile('../img/divesites/location_images/', 'locationImageFour');

                        if(array_key_exists('locationImageOne', $_FILES)) {
                            $locationImageOneToStore = uploadFile('../img/divesites/location_images/', 'locationImageOne');
                            $originalLocationImageStringAsArray[0] = $locationImageOneToStore;
                        }
    
                        if(array_key_exists('locationImageTwo', $_FILES)) {
                            $locationImageTwoToStore = uploadFile('../img/divesites/location_images/', 'locationImageTwo'); 
                            $originalLocationImageStringAsArray[1] = $locationImageTwoToStore;
                        }
    
                        if(array_key_exists('locationImageThree', $_FILES)) {
                            $locationImageThreeToStore = uploadFile('../img/divesites/location_images/', 'locationImageThree'); 
                            $originalLocationImageStringAsArray[2] = $locationImageThreeToStore;
                        }
    
                        if(array_key_exists('locationImageFour', $_FILES)) {
                            $locationImageFourToStore = uploadFile('../img/divesites/location_images/', 'locationImageFour'); 
                            $originalLocationImageStringAsArray[3] = $locationImageFourToStore;
                        }

                        $locationImageString = json_encode([$locationImageOneToStore, $locationImageTwoToStore, $locationImageThreeToStore, $locationImageFourToStore]);
                        $diveSite->setValue('locationImagePaths', $locationImageString);
                    } else {
                        $diveSite->setValue('depth', null);
                        $diveSite->setValue('visibility', null);
                        $diveSite->setValue('current', null);
                        $diveSite->setValue('diverLevel', null);
                    }

                    if ($diveSite->getValue('depth') == '') {
                        $diveSite->setValue('depth', null);
                    }

                    if ($diveSite->getValue('visibility') == '') {
                        $diveSite->setValue('visibility', null);
                    }

                    if ($diveSite->getValue('associatedPlaceID') == 'null' || $diveSite->getValue('associatedPlaceID') == '') {
                        $diveSite->setValue('associatedPlaceID', -1); // Why the hell can't I have null here?!?!
                    }



                    // This echo will spit out the last insert id.
                    echo $diveSite->insert();
                    
                    DiveSite::removeUnusedImages();
                    
                    break;
                }
            
            break;
    }
    