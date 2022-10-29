<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    date_default_timezone_set('Europe/London');
    require '../database/User.php';
    
    $email = '';
    $password = '';
    // Construct a user out of the values sent
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        // Should do some error handling here to indicate failure in the return
        return;
    }
//
  //  echo 'email in backend ' . $email;


    if (isset($_POST['password'])) {
        $password = $_POST['password'];
    } else {
        // Should do some error handling here to indicate failure in the return
        return;
    }

//    echo 'about to initialise user';


    $user = new User(['email' => $email, 'password' => password_hash($password, PASSWORD_DEFAULT)]);
    //var_dump($user);


  //  echo 'about to call insert';

    if (!User::userExists($email)) {
        $user->insert();
        echo json_encode(['status' => 1, 'msg' => 'User created successfully']);
    } else {
        echo json_encode(['status' => 0, 'msg' => 'User with that email already exists.']);
    }
    // You should validate the input once you know you have it

    // Then you should make sure the user's email isn't already on the system.

    // Then you should call insert.
