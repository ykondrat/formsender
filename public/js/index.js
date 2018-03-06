'use strict';

function ready() {
    const headerMenuButton = document.querySelector('.nav-btn-container');
    const geocoder = new google.maps.Geocoder();
    const address = 'вулиця Академіка Підстригача, Львів, Львівська область, 79000';

    function toggleButton() {
        headerMenuButton.classList.toggle('close');
        document.querySelector('.menu-list').classList.toggle('open');
        headerMenuButton.removeEventListener('click', toggleButton, false);
        setTimeout(() => {
            document.querySelector('.mobile-btn').classList.toggle('mobile-close');
        },10);
        setTimeout(() => {
            headerMenuButton.addEventListener('click', toggleButton, false);
        },300);
    }
    headerMenuButton.addEventListener('click', toggleButton, false);

    geocoder.geocode({'address': address}, function (results, status) {
        const coord = {
            lat: Number.parseFloat(results[0].geometry.location.lat()),
            lng: Number.parseFloat(results[0].geometry.location.lng())
        };
        const map = new google.maps.Map(document.querySelector('.map'), {
            zoom: 15,
            center: coord
        });
        const marker = new google.maps.Marker({
            position: coord,
            map: map
        });
    });
}

document.addEventListener('DOMContentLoaded', ready);
