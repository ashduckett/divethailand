

<?php
    require_once '../database/User.php';
    session_start();
    if (isset($_POST['action']) && $_POST['action'] == 'login') {
        processForm();
    } else {
        displayForm(array(), array(), array(), new User(array()));
    }

    function displayForm($errorMessages, $missingFields, $user) {
        $root = realpath($_SERVER["DOCUMENT_ROOT"]);
        include "$root/partials/cutDownHeader.php"; 

        ?>

            <div class="container" style="margin-top: 100px;">
                <div class="row justify-content-center">
                    <div class="col-md-6 col-md-offset-3" align="center">
                        
                        <form id="loginForm" action="login" method="post">
                            <img style="width: 100%;" src="../img/logo-black.png">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Email..." name="email">
                            </div>
                            <div class="form-group">
                                <label for="password1">Password</label>
                                <input type="password" class="form-control" id="password1" placeholder="Password..." name="password">
                            </div>
                            <div class="form-group">
                                <input class="btn btn-primary" type="submit" name="submitButton" id="submitButton" value="Login" />
                            </div>
                            <div class="form-group">
                                <a class="btn btn-default" href="forgotPassword.php">Forgotten your password?</a>   
                            </div>
                            <input type="hidden" name="action" value="login" />
                            <div class="form-group">
                            <?php
                                echo 'errors';
                                if (count($errorMessages) > 0) {
                                    echo $errorMessages[0];
                                }
                            ?>
                            </div>

                        </form>

                         
                    </div>
                </div>

            </div>
             
        <?php
    }
    
    function processForm() {
        $requiredFields = array('email', 'password');
        $missingFields = array();
        $errorMessages = array();
        $user = new User(array('email' => isset($_POST['email']) ? $_POST["email"] : '', 'password' => isset( $_POST['password'] ) ? $_POST['password'] : ''));

        // This user is temporary. It represents a user that exists, but it doesn't have an id.

        // At the point of calling authenticate you need the hash and you need the actual password.

        // You can get the hash from the database when you read the user.
        // You pass the password in. So it should all be doable.



        foreach ($requiredFields as $requiredField) {
            if (!$user->getValue($requiredField)) {
                $missingFields[] = $requiredField;
            }
        }


        if ($missingFields) {
            $errorMessages[] = '<p class="error">Please fill in both fields.</p>';
        } elseif (!$loggedInMember = $user->authenticate()) {
            $errorMessages[] = '<p class="error">Please check your details and try again.</p>';
        }
        
        if ($errorMessages) {
            displayForm($errorMessages, $missingFields, $user);
        } else {
            $_SESSION["user"] = $loggedInMember;
            displayThanks();
        }
    }

    function displayThanks() {
        header('Location: ' . 'admin');
    }
    ?>

        

