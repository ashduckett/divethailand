$(document).ready(function() {
    var placeView = new PlaceView();
    var placeController;

    
    function navigate(hashFrag) {
        switch(hashFrag) {
            case '#overview':
                // This should stop any running timers
                clearInterval(localStorage.getItem('timerId'));

                localStorage.removeItem('objectToEdit');
                $.post('../utils/databaseTransactions.php', { objectType: 'place', transactionType: 'getAll' }).done(function( data ) {
                    var places = JSON.parse(data);
                    var placeModel = new PlaceCollection(places);
                    var container = document.querySelector('.listView');
                    placeController = new PlaceController(container, placeModel, placeView);
                    placeController.render();
                });

                $('#placesMenuItem').addClass('active');
                $('#usersMenuItem').removeClass('active');
                break;
            case '#editPlace':
            case '#newPlace':
                placeController.renderForm();
                break;
            case '#users':
                placeController.renderUsersArea();

                $('#placesMenuItem').removeClass('active');
                $('#usersMenuItem').addClass('active');
                break;
        }
    }

    navigate(location.hash);

    window.addEventListener('hashchange', function() {
        navigate(location.hash);
    });
});