'use strict';

function ready() {
    const headerMenuButton = document.querySelector('.nav-btn-container');
    const geocoder = new google.maps.Geocoder();
    const address = 'вулиця Академіка Підстригача, Львів, Львівська область, 79000';
    const form = document.querySelector('.form-contact');
    const errorBlock = document.querySelector('.error-block');
    let letterCounter = 0;

    function toggleButton() {
        headerMenuButton.classList.toggle('close');
        document.querySelector('.menu-list').classList.toggle('open');
        document.querySelector('.black-block').classList.toggle('open-black-background');
        headerMenuButton.removeEventListener('click', toggleButton, false);
        setTimeout(() => {
            document.querySelector('.mobile-btn').classList.toggle('mobile-close');
        },10);
        setTimeout(() => {
            headerMenuButton.addEventListener('click', toggleButton, false);
        },300);
    }
    headerMenuButton.addEventListener('click', toggleButton, false);

    form.onsubmit = (event) => {
        event.preventDefault();
        const nameFilter = new RegExp(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/, 'g');
        const emailFilter = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'g');
        const userName = form.user_name.value.trim().replace(/\s+/g, ' ');
        const userEmail = form.user_email.value.trim();
        const userMsg = form.user_msg.value.trim().replace(/\s+/g, ' ');

        errorBlock.classList.remove('show-error');
        form.submit_form.innerText = 'Waiting...';
        if (!nameFilter.test(userName)) {
            errorBlock.classList.add('show-error');
            document.querySelector('.error-text').innerText = 'Please provide valide name';
            form.submit_form.innerText = 'Send';
            return (false);
        }
        if (!emailFilter.test(userEmail)) {
            errorBlock.classList.add('show-error');
            document.querySelector('.error-text').innerText = 'Please provide valide email';
            form.submit_form.innerText = 'Send';
            return (false);
        }
        if (userMsg.length < 1 || userMsg.length > 120) {
            errorBlock.classList.add('show-error');
            document.querySelector('.error-text').innerText = 'Please provide valide message';
            form.submit_form.innerText = 'Send';
            return (false);
        }
        sendContactForm(userName, userEmail, userMsg);
    };

    function sendContactForm(userName, userEmail, userMsg) {
        const xhr = new XMLHttpRequest();

        errorBlock.classList.remove('show-error');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.user_name.value = '';
                form.user_email.value = '';
                form.user_msg.value = '';
                form.submit_form.innerText = 'Send';
                document.querySelector('.success-block').classList.add('show-success');
                document.querySelector('.success-text').innerText = 'Form successfully sended';
                setTimeout(() => {
                    document.querySelector('.success-block').classList.remove('show-success');
                    document.querySelector('.success-text').innerText = '';
                }, 10000);
            } else if (xhr.status !== 200 && xhr.status !== 0) {
                errorBlock.classList.add('show-error');
                document.querySelector('.error-text').innerText = 'Oops, something goes wrong';
                form.submit_form.innerText = 'Send';
                setTimeout(() => {
                    errorBlock.classList.remove('show-error');
                }, 10000);
            }
        }
        xhr.open('POST', '/contact-form', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ name: userName, email: userEmail, msg: userMsg }));
    }

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
    $('.menu-item').on('click', function (event) {
       event.preventDefault();
       const id  = $(this).find('a').attr('href');
       const top = $(id).offset().top - 150;
       eventFire(headerMenuButton, 'click');
       $('body,html').animate({ scrollTop: top }, 500);
   });

   function eventFire(element, eventType) {
       if (element.fireEvent) {
           element.fireEvent('on' + eventType);
       } else {
           var eventObj = document.createEvent('Events');
           eventObj.initEvent(eventType, true, false);
           element.dispatchEvent(eventObj);
       }
   }
    $('.form-textarea').on('keyup', function() {
        letterCounter = this.value.length;
        $('#counter').text(letterCounter);
    });
}

document.addEventListener('DOMContentLoaded', ready);
