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
    
    (function liveSearch() {
        const input = document.getElementById('check-address__input');
        if ( !input ) {
            return;
        }

        const wrap = input.parentElement;
        const liveSearch = document.getElementById('livesearch');
        const submitBtn = document.getElementById('check-address__btn');

        const platform = new H.service.Platform({
            'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU',
        });
        const service = platform.getSearchService();

        input.addEventListener('keydown', function (e) {
           checkTolTip();
        });

        input.addEventListener('keyup', function (e) {
            let value = input.value;
            const country = 'Canada';
            if(value.length > 2) {

                service.autosuggest({
                    q: `${value}`,
                    at: '38.71014896078624,-98.60787954719035'
                }, (result) => {
                    if(result.items.length < 25) {

                        result.items.forEach( function (item) {

                            if(item.title.indexOf(country) !== -1) {

                                liveSearch.insertAdjacentHTML('afterbegin', `
                                    <a href="#" class="form-group__livesearch_link">${item.title}</a>
                                `)
                            }
                        })
                    }

                    const searchLinks = [...document.getElementsByClassName('form-group__livesearch_link')];
                    searchLinks.forEach( function (link) {
                        link.addEventListener('click', function (e) {
                            e.preventDefault();
                            input.value = this.innerHTML;

                            searchLinks.forEach( function (item) {
                                removeElem(item);
                            })
                        })
                    })
                })
            }
        });

        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if(input.value === "") {
                showTolTip(input, 'Please, enter your property address');
                return;
            }

            service.autosuggest({
                q: `${input.value}`,
                at: '38.71014896078624,-98.60787954719035'
            }, (result) => {

                const checkCorrectInput = result.items.some( function (el) {
                    return el.title === input.value;
                });

                if( !checkCorrectInput ) {
                    showTolTip(input, 'Please, check your input. <br> We can\'t find this address');
                }
            });

            if(!checkNumberInString(input.value)) {
                showTolTip(input, 'Please enter a more precise address');
                return;
            }

            submitSuccessAddress(input.value, 'http://localhost:3000/calculator.html');

        });

        function submitSuccessAddress(address, url) {
            window.localStorage.setItem('address', address);
            setTimeout( function () {
                window.location.href = url;
            },1500)
        }

        function checkTolTip() {
            const el = wrap.getElementsByClassName('toltip')[0];
            if(el) {
                removeElem(el);
            }
        }

        function removeElem(elem) {
            const parent = elem.parentElement;
            parent.removeChild(elem);
        }

        function checkNumberInString(str) {
            let contain = false;

            for(let i = 0; i < 10; i++) {
                i = String(i);
                if(str.indexOf(i) !== -1) {
                    contain = true;
                    break;
                }
            }

            return contain;
        }

        function showTolTip(input, toltip = false) {
            if(!input.classList.contains('warn')) {
                input.classList.add('warn');
            }

            if(toltip) {

                if(wrap.getElementsByClassName('toltip')[0]) {
                    return;
                }

                wrap.insertAdjacentHTML('afterbegin', `
                    <p class="toltip">${toltip}</p>
                `);

                const elem = wrap.getElementsByClassName('toltip')[0];

                elem.addEventListener('click', function () {
                    removeElem(this);
                })
            }
        }
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