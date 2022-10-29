<?php
    use PHPMailer\PHPMailer\PHPMailer;
    require_once '../PHPMailer/PHPMailer.php';
    require_once '../PHPMailer/Exception.php';
    require_once '../utils/functions.php';
    require '../database/User.php';
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    date_default_timezone_set('Europe/London');

   // echo 'test';

    

    if (isset($_POST['email'])) {
 //       echo $_POST['email'];
        //echo 'set';
        
   //    if (trim($_POST['email']) === '') {
        // exit(json_encode(array('status' => 0, 'msg' => 'Please enter an email address.')));
     //       echo 'ss';
       // }
       
  


        if (User::userExists($_POST['email'])) {

            $token = Utils::generateNewString();
            $email = $_POST['email'];

            // // Get hold of the user object
            $user = User::getByEmail($_POST['email']);
            $user->setValue('token', $token);
            $user->updateTokenExporeToOneHourAhead();
            $user->update();

            $mail = new PHPMailer();
            $mail->isHTML(true);
            $mail->addAddress($_POST['email']);
            $mail->setFrom('info@divingthailand.co.uk', 'Dive Thailand');
            $mail->Subject = 'Reset Password';
            $mail->Body = "
                Hi,<br><br>
    
                In order to reset your password please click the link below:
                <a href='http://www.divingthailand.co.uk/utils/resetPassword.php?email=$email&token=$token'>http://www.divingthailand.co.uk/utils/resetPassword.php?email=$email&token=$token</a>
                <br><br>
                Kind Regards,<br><br>
                Dive Thailand
            ";

            
            
            if ($mail->send()) {
                 exit(json_encode(array('status' => 1, 'msg' => 'Please check your email inbox.')));    
            } else {
                 exit(json_encode(array('status' => 0, 'msg' => $mail->ErrorInfo)));    
            }


           // exit(json_encode(array('status' => 1, 'msg' => 'Please check your email inbox.')));
        } else {
            exit(json_encode(array('status' => 0, 'msg' => 'Email does not exist.')));
        }
    }
?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="../js/utils.js"></script>
</head>
<body>
    <div class="container" style="margin-top: 100px;">
        <div class="row justify-content-center">
            <div class="col-md-6 col-md-offset-3" align="center">
                <img style="width: 100%;" src="../img/logo-black.png"><br><br>
                <input class="form-control" id="forgottenPasswordEmail" placeholder="Email..."><br>
                <input id="submitForgottenPassword" type="button" class="btn btn-primary" value="Reset Password"><br><br>
                <p id='forgotPasswordFormResponse'></p>
            </div>
        </div>
    </div>


    <script>



        $(document).ready(function() {
            var email = $('#forgottenPasswordEmail');
            
            $('#submitForgottenPassword').on('click', function() {
                if ($.trim(email.val()) !== '') {
                    
                    
                    if (validateEmail($.trim(email.val()))) {
    				    email.css('border', '1px solid green');
                    
                        $.ajax({
                            url: 'forgotPassword.php',
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                email: email.val(),
                            },
                            success: function(response) {
                                if (!response.status) {
                                    $('#forgotPasswordFormResponse').html(response.msg).css('color', 'red');
                                } else {
                                    $('#forgotPasswordFormResponse').html(response.msg).css('color', 'green');
                                }

                                
                                //$('#forgotPasswordFormResponse').html('');    

                            }
                        });
                    } else {
                        email.css('border', '1px solid red');
                        $('#forgotPasswordFormResponse').html('Please enter a valid email address.').css('color', 'red');    
                    }

                } else {
                    email.css('border', '1px solid red');
                    $('#forgotPasswordFormResponse').html('Please enter an email address.').css('color', 'red');
			    }
            });

        });
    </script>


</body>
</html>