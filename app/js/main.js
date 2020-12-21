'use strict';

import { Menu } from "./Menu";
import { Validation } from "./validationClass";
import { Calculator } from "./Calculator";
import { LiveSearch } from "./LiveSearch";


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

    (function liveSearch() {

        const platform = new H.service.Platform({
            'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU',
        });

        const service = platform.getSearchService();

        if(!document.getElementById('livesearch')) {
            return false;
        }

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

        console.log(valid);

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