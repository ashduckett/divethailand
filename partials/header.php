<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$root = realpath($_SERVER["DOCUMENT_ROOT"]);
require_once("$root/divethailand/utils/functions.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/divethailand/">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="/divethailand/css/fontawesome-all.min.css"/>
    <link rel="stylesheet" type="text/css" href="/divethailand/css/normalize.css">
    <link rel="stylesheet" type="text/css" href="/divethailand/css/main.css">
    <link rel="stylesheet" type="text/css" href="/divethailand/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="/divethailand/slick/slick-theme.css"/>
    <link rel="stylesheet" type="text/css" href="/divethailand/css/slider.css"/>
    <link rel="stylesheet" type="text/css" href="/divethailand/css/screenSlider.css"/>
    <link rel="stylesheet" type="text/css" href="/divethailand/css/jquery-ui.css"/>
    
    <script src="/divethailand/js/jquery-3.3.1.js"></script>
    <script src="/divethailand/js/jquery-ui.min.js"></script>
    <script src="/divethailand/js/ofi.min.js"></script>
    <script src="/divethailand/js/utils.js"></script>
    <script src="/divethailand/js/videoSplit.js"></script>
    <script src="/divethailand/js/ScreenSlider.js"></script>
    <script type="text/javascript" src="/divethailand/slick/slick.js"></script>
    <!-- <script src="js/AdminRouter.js"></script> -->
    <title>Thailand Dive</title>
</head>

<body>
    <div class="contactFormOverlay">
        <div class="formDiv">
            <div class="formBanner">
                <div class="formImageContainer">
                    <img src="/divethailand/img/contact_form.jpg">
                </div>
                <div class="closeButton"><i class="fas fa-times"></i></div>
            </div>
            <div class="formHeader">
                <section class="standardCenteredSection">        
                    <h2 class="mediumHeader formHeaderText">The Best Dive Spots in Thailand from Fully Qualified Divers</h2>
                </section>
            </div>
            <div class="contactFormGuts">
                <div id="thankYouMsg">
                    <div>
                        <p>Thank you for reaching out. We will get back to you in due course.</p>
                        <a class="btn btn-green thankYouCloseBtn" href="#">Close</a>
                    </div>
                </div>

                <div class="fieldRow">
                    <div class="fieldContainer">
                        <div class="formField">
                            <label for="contactUsName">Name*</label>
                            <input id="contactUsName" name="name" type="text" placeholder="John Smith">
                        </div>
                    </div>
                    <div class="fieldContainer">
                        <div class="formField">
                            <label for="emailField">Email*</label>
                            <input id="emailField" name="name" type="email" placeholder="jsmith@divingthailand.co.uk">
                        </div>
                    </div>
                </div>
                <div class="fieldRow">
                    <div class="fieldContainer">
                        <div class="formField">
                            <label for="nameField">Phone*</label>
                            <input id="phoneField" name="name" type="text" placeholder="01234 56789">
                        </div>
                    </div>
                    <div class="fieldContainer">
                        <div class="formField">
                            <label for="nameField">Location*</label>
                            <input id="contactUsLocation" name="name" type="text" placeholder="i.e. Thailand">
                        </div>
                    </div>
                </div>
                <div class="fieldRow">
                    <div class="fieldContainer">
                        <div class="formField">
                            <label for="nameField">Message*</label>
                            <textarea id="contactUsMessage" name="name"></textarea>
                        </div>
                    </div>
                </div>
                <p class="formBottomError"></p>
                <div class="fieldRow submitFormRow">
                    <div class="fieldContainer">
                        <div class="formField">
                            <a id="contactUsEmail" class="btn btn-dark-blue" href="#">Submit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>