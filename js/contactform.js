$(document).ready(function() {
    var getInTouchButton = document.getElementById('getInTouch');

    getInTouchButton.addEventListener('click', function(evt) {
        evt.preventDefault();

        var contactFormOverlay = document.querySelector('.contactFormOverlay');
        contactFormOverlay.style.display = 'block';
    });


    var contactFormOverlay = document.querySelector('.contactFormOverlay');
    contactFormOverlay.addEventListener('click', function(evt) {
        this.style.display = 'none';
    });

    var formDiv = document.querySelector('.formDiv');
    formDiv.addEventListener('click', function(evt) {
        evt.stopPropagation();
    });
});