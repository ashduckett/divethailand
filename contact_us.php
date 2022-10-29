<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $location = $_POST['location'];
    $message = $_POST['message'];

    $emailTo = 'info@divingthailand.co.uk';
    $emailSubject = 'Dive Thailand Contact Us';

    $messageToSend = 'Hello, you have received a message from ' . $name . "\n";
    $messageToSend .= 'You can reply to them with: ' . $email . "\n";
    $messageToSend .= 'Their location is: ' . $location . "\n";
    $messageToSend .= 'You can call them on: ' . $phone . "\n";
    $messageToSend .= 'Here is their message: ' . "\n\n" . $message;

    mail($emailTo, $emailSubject, $messageToSend);

