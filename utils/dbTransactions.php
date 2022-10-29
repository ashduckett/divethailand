<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once '../database/config.php';
    require_once '../database/DiveSite.php';
    require_once '../database/User.php';


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


    $method = $_GET['method'];

    switch($method) {
        case 'getAll':
            echo json_encode(DiveSite::getAll());
            break;
        case 'update':

            $parsedData = json_decode($_POST['item']);

            $diveSite = new DiveSite($parsedData);

            if ($diveSite->getValue('depth') == '') {
                $diveSite->setValue('depth', null);
           }

           if ($diveSite->getValue('visibility') == '') {
               $diveSite->setValue('visibility', null);
           }

            $diveSite->update();

            break;

        case 'delete':
            $diveSite = DiveSite::findById($_POST['id']);
            $diveSite->delete();
            break;
        case 'deleteUser':
            $user = User::findById($_POST['id']);


           if ($user->getValue('email') !== 'admin@divingthailand.co.uk') {
                $user->delete();

                echo json_encode(['status' => 1, 'msg' => 'Deletion Successful.']);
            } else {
                echo json_encode(['status' => 0, 'msg' => 'Deletion Unsuccessful. This email address belongs to an administrator.']);
            }


            
            break;

        case 'uploadThumbnail':
            $id = intval($_POST['diveSiteId']);
            if(array_key_exists('thumbnailFile', $_FILES)) {
                $filenameToStore = uploadFile('../img/divesites/thumbnails/', 'thumbnailFile');
                $diveSite = DiveSite::findById($id);
                $diveSite->setValue('thumbnailPath', $filenameToStore);
            }
            break;

        case 'uploadLocationImageOne':
            $id = intval($_POST['diveSiteId']);
            if(array_key_exists('locationImageOneFile', $_FILES)) {
                $filenameToStore = uploadFile('../img/divesites/location_images/', 'locationImageOneFile');
                $diveSite = DiveSite::findById($id);
                $locationImagePaths = json_decode($diveSite->getValue('locationImagePaths'));
                $locationImagePaths[0] = $filenameToStore;
                $diveSite->setValue('locationImagePaths', json_encode($locationImagePaths));
                $diveSite->update();
            }
            break;

            case 'uploadLocationImageTwo':
            $id = intval($_POST['diveSiteId']);
            if(array_key_exists('locationImageTwoFile', $_FILES)) {
                $filenameToStore = uploadFile('../img/divesites/location_images/', 'locationImageTwoFile');
                $diveSite = DiveSite::findById($id);
                $locationImagePaths = json_decode($diveSite->getValue('locationImagePaths'));
                $locationImagePaths[1] = $filenameToStore;
                $diveSite->setValue('locationImagePaths', json_encode($locationImagePaths));
                $diveSite->update();
            }
            break;

            case 'uploadLocationImageThree':
            $id = intval($_POST['diveSiteId']);
            if(array_key_exists('locationImageThreeFile', $_FILES)) {
                $filenameToStore = uploadFile('../img/divesites/location_images/', 'locationImageThreeFile');
                $diveSite = DiveSite::findById($id);
                $locationImagePaths = json_decode($diveSite->getValue('locationImagePaths'));
                $locationImagePaths[2] = $filenameToStore;
                $diveSite->setValue('locationImagePaths', json_encode($locationImagePaths));
                $diveSite->update();
            }
            break;

            case 'uploadLocationImageFour':
            $id = intval($_POST['diveSiteId']);
            if(array_key_exists('locationImageFourFile', $_FILES)) {
                $filenameToStore = uploadFile('../img/divesites/location_images/', 'locationImageFourFile');
                $diveSite = DiveSite::findById($id);
                $locationImagePaths = json_decode($diveSite->getValue('locationImagePaths'));
                $locationImagePaths[0] = $filenameToStore;
                $diveSite->setValue('locationImagePaths', json_encode($locationImagePaths));
                $diveSite->update();
            }
            break;
        case 'save':
          //  var_dump($_POST);


            $data = [
                'associatedPlaceID' => (int)$_POST['associatedPlaceID'] == 'null' ? null : (int)$_POST['associatedPlaceID'],
                'diverLevel' => (int)$_POST['diverLevel'],
                'heading' => $_POST['heading'],
                'subheading' => $_POST['subheading'],
                'thumbnailPath' => $_POST['thumbnailPath'],
                'rating' => (int)$_POST['rating'],
                'ratingComment' => (int)$_POST['ratingComment'],
                'depth' => (int)$_POST['depth'],
                'visibility' => (int)$_POST['visibility'],
                'current' => (int)$_POST['current'],
                'locationText' => $_POST['locationText'],
                'locationTextTitle' => $_POST['locationTextTitle'],
                'locationImagePaths' => $_POST['locationImagePaths'],
                'islands' => $_POST['islands'],
                'virtualTourUrl' => $_POST['virtualTourUrl'],
                'isDiveSite' => (int)$_POST['isDiveSite'],
                'regions' => $_POST['regions'],
                'isPaid' => (int)$_POST['isPaid'],
                'isDraft' => (int)$_POST['isDraft'],
                'type' => $_POST['type'],
            //    'thumbnailFile' => $_POST['thumbnailFile'],
            //    'locationImageOne' => $_POST['locationImageOne'],
            //    'locationImageTwo' => $_POST['locationImageTwo'],
            //    'locationImageThree' => $_POST['locationImageThree'],
            //    'locationImageFour' => $_POST['locationImageFour'],
                'presentationOrder' => (int)$_POST['presentationOrder']               

            ];

            $diveSite = new DiveSite($data);

            // var_dump($diveSite);
            

            // var_dump($diveSite);

           // echo 'here is the associatedID ' . $diveSite->getValue('');
           // var_dump($_POST);
           //var_dump($_FILES);
            
            //  if(array_key_exists('thumbnailFile', $_FILES)) {
            //      $filenameToStore = uploadFile('../img/divesites/thumbnails/', 'thumbnailFile');
            //      $diveSite->setValue('thumbnailPath', $filenameToStore);
            // }
            
            if ($_POST['isDiveSite'] == '1') {
                // $locationImageOneToStore = '';
                // $locationImageTwoToStore =  '';
                // $locationImageThreeToStore = '';
                // $locationImageFourToStore =  '';

                // if(array_key_exists('locationImageOne', $_FILES)) {
                //     $locationImageOneToStore = uploadFile('../img/divesites/location_images/', 'locationImageOne');
                //     $originalLocationImageStringAsArray[0] = $locationImageOneToStore;
                // }

                //  if(array_key_exists('locationImageTwo', $_FILES)) {
                //      $locationImageTwoToStore = uploadFile('../img/divesites/location_images/', 'locationImageTwo'); 
                //      $originalLocationImageStringAsArray[1] = $locationImageTwoToStore;
                //  }

                // if(array_key_exists('locationImageThree', $_FILES)) {
                //      $locationImageThreeToStore = uploadFile('../img/divesites/location_images/', 'locationImageThree'); 
                //      $originalLocationImageStringAsArray[2] = $locationImageThreeToStore;
                // }

                // if(array_key_exists('locationImageFour', $_FILES)) {
                //      $locationImageFourToStore = uploadFile('../img/divesites/location_images/', 'locationImageFour'); 
                //      $originalLocationImageStringAsArray[3] = $locationImageFourToStore;
                // }

                //  $locationImageString = json_encode([$locationImageOneToStore, $locationImageTwoToStore, $locationImageThreeToStore, $locationImageFourToStore]);
                //  $diveSite->setValue('locationImagePaths', $locationImageString);
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

            // And this can be 0 for now but will need to be changed.
            //$diveSite->setValue('presentationOrder', null);


            // This echo will spit out the last insert id.
            echo $diveSite->insert();
            
            DiveSite::removeUnusedImages();
            
            break;

            case 'getAllUsers':
                echo json_encode(User::getAll());
                break;
        

            
    }