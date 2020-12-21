'use strict';

import { Menu } from "./Menu";
import { Validation } from "./validationClass";
import { Calculator } from "./Calculator";
import { LiveSearch } from "./LiveSearch";
import { Question } from "./Question";


window.addEventListener('load', function () {

    /*(function menu() {
        const menu = new Menu({
            button: document.querySelector('.header-menu__btn'),
            hamburger: document.querySelector('.header-menu__burger'),
            menu: document.querySelector('.header__menu'),
            activeClass: 'active'
        });

        menu.init();
    })();*/

    (function checkPage() {
        const page = document.querySelector('.check-page');
        if(!page) {
            return;
        }

        const addressElement = document.querySelector('.address__address');
        const address = window.localStorage.getItem('address');
        addressElement.innerHTML = address;
        randomPercent(7, 16);

        const platform = new H.service.Platform({
            'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU',
        });

        const service = platform.getSearchService();
        let pos = {};

        service.geocode({
            q: address
        }, (result) => {
            pos.lat = result.items[0].position.lat;
            pos.lng = result.items[0].position.lng;
        });

        setTimeout( function () {

            const defaultLayers = platform.createDefaultLayers();

            const map = new H.Map(
                document.getElementById('map'),
                defaultLayers.vector.normal.map,
                {
                    zoom: 15,
                    center: {
                        lat: pos.lat,
                        lng: pos.lng,
                    }
                });

            const svgMarkup = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">
<style type="text/css">
\t.st0{fill:#50AC2F;}
</style>
<g>
\t<g>
\t\t<path class="st0" d="M24,34.5c-2.5,0-4.5,2-4.5,4.5c0,0.7,0.2,1.5,0.5,2.1l3.7,6.7c0,0.1,0.1,0.1,0.2,0.1s0.2-0.1,0.2-0.1l3.7-6.7
\t\t\tc0.4-0.7,0.5-1.4,0.5-2.1C28.5,36.5,26.5,34.5,24,34.5z M24,41.3c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2
\t\t\tS25.2,41.3,24,41.3z"/>
\t</g>
</g>
</svg>`;

            const icon = new H.map.Icon(svgMarkup);
            const coords = {
                    lat: pos.lat,
                    lng: pos.lng,
                };
            const marker = new H.map.Marker(coords, {icon: icon});

            map.addObject(marker);
            map.setCenter(coords);

            console.log(map);
        },1000);


        function randomPercent(min, max) {
            const percent = Math.round(Math.random() * (max - min) + min);
            const percentElement = document.querySelector('.sale__info-percent');
            percentElement.innerHTML = `+${String(percent)}%`;
        }
    })();

    (function questionPage() {
        const page = document.querySelector('.question-page');
        if(!page) {
            return;
        }

        const question = new Question({
            wrapClass: 'question',
        });

        question.init();
    })();

    (function liveSearch() {

        if(!document.getElementById('livesearch')) {
            return false;
        }
        const platform = new H.service.Platform({
            'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU',
        });

        const service = platform.getSearchService();

        const searchField = new LiveSearch({
            inputID: 'check-address__input',
            liveSearchWrapID: 'livesearch',
            submitBtnID: 'check-address__btn',
            platform: platform,
            service: service
        });

        searchField.build();
    })();

    (function calculator() {
        if( !document.getElementById('calculator') ) {
            return;
        }

        const calc = new Calculator({
            wrapID: 'calculator',
            handleClass: 'calculator__bar_handle',
            progressClass: 'calculator__bar_progress',
            valueClass: 'calculator__value',
            inputClass: 'calculator__input',
            buttonsWrapClass: 'calculator__btns',
        });

        calc.build();

        const addressElem = document.querySelector('.page-caption>span');
        const address = localStorage.getItem('address');
        addressElem.innerHTML = `we found: ${address} !`;
    })();

    (function validation() {
        const form = document.querySelector('#form');
        if( !form ) {
            return;
        }

        const valid = new Validation({
            submitBtn: 'form-btn',
            firstName: 'f-name',
            lastName: 'l-name',
            phone: 'phone',
            checkbox: 'check',
        });

        valid.init();

        valid.submitBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if(valid.success) {
                setTimeout( function () {
                    document.location.href = '/thank-you.html';
                },1000)
            }
        });

        // addCalculatorData();

        function addCalculatorData() {
            const ageInput = form.querySelector('#age');
            const problemInput = form.querySelector('#problem');

            const ageValue = localStorage.getItem('age');
            const problemValue = localStorage.getItem('problem');

            ageInput.value = ageValue;
            problemInput.value = problemValue;
        }
    })();
});