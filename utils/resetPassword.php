<?php require_once '../database/User.php'; ?>
<?php require_once '../utils/functions.php'; ?>

<?php
    date_default_timezone_set('Europe/London');


    // If there are set, then we should have enough to be able to change the password
    if (isset($_POST['email']) && isset($_POST['newPassword'])) {

        $newPasswordEncrypted = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);

        $user = User::getByEmail($_POST['email']);
        $user->setValue('password', $newPasswordEncrypted);
        $user->update();

        exit(json_encode(array('status' => 1, 'msg' => 'Your password has been changed. You may now log in. Please wait...')));    

    }


    if (isset($_GET['email']) && isset($_GET['token'])) {
        $email = $_GET['email'];
        $token = $_GET['token'];
        // If the user doesn't exist meaning someone's feeding it bad data or it's expired...
        if (!User::userExistsWithEmailAndToken($email, $token)) {
            header('Location: login.php');
            exit();
        }
    } 




    /*
        If we are going to render the form, that means it's safe.
        What do we need to be able to update the password?
        We need the raw password.
        We also need a way to get hold of the user.

        We can get hold of the user using both the token and the email. In PHP.
    */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container" style="margin-top: 100px;">
        <div class="row justify-content-center">
            <div class="col-md-6 col-md-offset-3" align="center">
                <img style="width: 100%;" src="../img/logo-black.png"><br><br>
                <p>Please enter your new password below:</p>
                <input type="password" class="form-control" id="password1" placeholder="Password..."><br>
                <input type="password" class="form-control" id="password2" placeholder="Password..."><br>
                <input id="submitNewPassword" type="button" class="btn btn-primary" value="Reset Password"><br><br>
                <p id='forgotPasswordFormResponse'></p>
            </div>
        </div>
    </div>


    <script>
        $.urlParam = function(name){
	        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	        return results[1] || 0;
        }

        $(document).ready(function() {
            $('#submitNewPassword').click(function() {
                var moreDataNeeded = $('#password1').val() == '' || $('#password2').val() == '';

                if (moreDataNeeded == true) {
                    $('#forgotPasswordFormResponse').html('Please enter both fields.');
                } else if ($('#password1').val() !== $('#password2').val()) {
                    $('#forgotPasswordFormResponse').html('Please ensure both passwords match.');
                } else {


                    $.ajax({
                        url: 'utils/resetPassword.php',
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            newPassword: $('#password1').val(),
                            email: $.urlParam('email')
                        },
                        success: function(response) {

                            $('#forgotPasswordFormResponse').html(response.msg);

                            setTimeout(function() { 
                                window.location.replace("http://www.divingthailand.co.uk/login");
                            }, 5000);

                        }
                    });
                }
            });
        });
    </script>
</body>
</html>




















