'use strict';

function ready() {
    let headerMenuButton = document.querySelector('.nav-btn-container');
    // let geocoder = new google.maps.Geocoder();
    // let address = 'вулиця Академіка Підстригача, Львів, Львівська область, 79000';

    function toggleButton() {
        headerMenuButton.classList.toggle('close');
        document.querySelector('.menu-list').classList.toggle('open');
        document.querySelector('.menu-black-background').classList.toggle('open-black-background');

        setTimeout(function(){
            document.querySelector('.mobile-btn').classList.toggle('mobile-close');
        },10);


        headerMenuButton.removeEventListener('click', toggleButton, false);

        setTimeout(function(){
            headerMenuButton.addEventListener('click', toggleButton, false);
        },300);
    }
    headerMenuButton.addEventListener('click', toggleButton, false);

    // geocoder.geocode({'address': address}, function (results, status) {
    //     let coord = {
    //         lat: Number.parseFloat(results[0].geometry.location.lat()),
    //         lng: Number.parseFloat(results[0].geometry.location.lng())
    //     };
    //     let map = new google.maps.Map(document.querySelector('.footer-map'), {
    //         zoom: 15,
    //         center: coord
    //     });
    //     let marker = new google.maps.Marker({
    //         position: coord,
    //         map: map
    //     });
    // });
}

document.addEventListener('DOMContentLoaded', ready);
