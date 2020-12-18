'use strict';

import { Menu } from "./Menu";
import { Validation } from "./validationClass";
import { Calculator } from "./Calculator";


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

    (function calculator() {
        const calc = new Calculator({
            wrapID: 'calculator',
            handleClass: 'calculator__bar_handle',
            progressClass: 'calculator__bar_progress',
            valueClass: 'calculator__value',
            inputClass: 'calculator__input',
            buttonsWrapClass: 'calculator__btns',
        });

        calc.build();
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