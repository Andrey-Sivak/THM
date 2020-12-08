'use strict';

import { Menu } from "./Menu";
import { Validation } from "./validationClass";



window.addEventListener('load', function () {
    console.log(1);

    /*(function menu() {
        const menu = new Menu({
            button: document.querySelector('.header-menu__btn'),
            hamburger: document.querySelector('.header-menu__burger'),
            menu: document.querySelector('.header__menu'),
            activeClass: 'active'
        });

        menu.init();
    })();*/

    /*(function validation() {
        const form = document.querySelector('#form-page__form');
        if( !form ) {
            return;
        }

        const valid = new Validation({
            submitBtn: 'form-page__form_btn',
            firstName: 'first-name',
            lastName: 'last-name',
            phone: 'phone',
        });

        valid.init();

        addCalculatorData();

        function addCalculatorData() {
            const ageInput = form.querySelector('#age');
            const problemInput = form.querySelector('#problem');

            const ageValue = localStorage.getItem('age');
            const problemValue = localStorage.getItem('problem');

            ageInput.value = ageValue;
            problemInput.value = problemValue;
        }
    })();*/
});