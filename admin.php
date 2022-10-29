<?php require_once "database/DiveSite.php"; ?>
<?php require_once 'database/User.php'; ?>
<?php require_once "utils/functions.php"; ?>
<?php/* Utils::checkLogin();*/ ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <link rel="stylesheet" type="text/css" href="css/fontawesome-all.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" href="css/admin.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="js/jquery-3.3.1.js"></script>
    <script src="js/ofi.min.js"></script>
    <script type="text/javascript" src="slick/slick.js"></script>
    <script src="js/utils.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>  
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/New MVC/Views/CheckboxField.js"></script>
    <script src="js/New MVC/Views/TextAreaField.js"></script>
    <script src="js/New MVC/Views/SelectField.js"></script>
    <script src="js/New MVC/Views/FileField.js"></script>
    <script src="js/New MVC/Views/TextField.js"></script>
    <script src="js/New MVC/UserModel.js"></script>
    <script src="js/New MVC/UserCollectionModel.js"></script>
    <script src="js/New MVC/UsersView.js"></script>
    <script src="js/New MVC/Event.js"></script>
    <script src="js/New MVC/PlaceCollectionController.js"></script>
    <script src="js/New MVC/PlaceCollectionView.js"></script>
    <script src="js/New MVC/PlaceModel.js"></script>
    <script src="js/New MVC/PlaceCollectionModel.js"></script>
    <script src="js/New MVC/FormView.js"></script>
    <title>Admin</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Dive Thailand</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active placesMenuOption">
                    <a class="nav-link" href="admin#list">Places</a>
                </li>
                <li class="nav-item peopleMenuOption">
                    <a class="nav-link" href="admin#users">People<span class="sr-only">(current)</span></a>
                </li>
                
                <li class="nav-item newMenuOption">
                    <a id="newButton" class="nav-link" href="#">New</a>
                </li>
            </ul>
            <div id="logout" class="my-2 my-lg-0 logoutContainer" style="height:100%;">
            <a class="logoutLink" href="#">
                <div class="logoutIcon">
                    <i class="navIcon fas fa-sign-out-alt"></i>
                </div>
                <div>        
                    Sign Out
                </div>
            </a>
                <!-- <a href="#"><i class="navIcon fas fa-sign-out-alt"></i>Sign Out</a> -->
                
            </div>
        </div>
    </nav>

    <div class="mainContent"></div>
    <?php require_once 'partials/footer.php'; ?>
    <script>

        $('#logout').click(function() {
            $.post('utils/logout.php');
            window.location.replace("login");
        });

        $(document).ready(function() {
            var model = new PlaceCollection();
            
            model.initFromDatabase(function() {
                var formView = new FormView();
                var view = new PlaceCollectionView(model);
                var controller = new PlaceCollectionController(model, view, formView);
                
               // formView.buildForm();
                view.show();


            });
        });






    </script>














</body>
</html>