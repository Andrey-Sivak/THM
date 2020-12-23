class LiveSearch {

    constructor(options) {
        this.input = document.querySelector(`#${options.inputID}`);
        this.wrap = this.input.parentElement;
        this.liveSearchWrap = document.querySelector(`#${options.liveSearchWrapID}`);
        this.submitBtn = document.querySelector(`#${options.submitBtnID}`);
        this.country = 'Canada';
        this.value = this.input.value;
        this.platform = options.platform;
        this.service = options.service;

        this.externalRequestHandler = this.externalRequestHandler.bind(this);
        this.removeElem = this.removeElem.bind(this);
    }

    externalRequestHandler(result) {
        const self = this;

        if(result.items.length < 25) {

            result.items.forEach( function (item) {

                if(item.title.indexOf(self.country) !== -1) {

                    self.liveSearchWrap.insertAdjacentHTML('afterbegin', `
                        <a href="#" class="form-group__livesearch_link">${item.title}</a>
                    `)
                }

                const searchLinks = [...document.getElementsByClassName('form-group__livesearch_link')];
                searchLinks.forEach( function (link) {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        self.value = this.innerHTML;
                        self.input.value = this.innerHTML;

                        searchLinks.forEach( function (item) {
                            self.removeElem(item);
                        })
                    })
                })
            })
        }
    }

    changeValue() {
        this.value = this.input.value;
    }

    showTolTip(input, toltip = false) {
        const self = this;
        if(!this.input.classList.contains('warn')) {
            this.input.classList.add('warn');
        }

        if(toltip) {

            if(this.wrap.getElementsByClassName('toltip')[0]) {
                return;
            }

            this.wrap.insertAdjacentHTML('afterbegin', `
                    <p class="toltip">${toltip}</p>
                `);

            const elem = this.wrap.getElementsByClassName('toltip')[0];

            elem.addEventListener('click', function () {
                self.removeElem(this);
            })
        }
    }

    checkNumberInString(str) {
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

    checkTolTip() {
        const el = this.wrap.getElementsByClassName('toltip')[0];
        if(el) {
            this.removeElem(el);
        }
    }

    removeElem(elem) {
        const parent = elem.parentElement;
        if(parent && parent.children[0]) {
            parent.removeChild(elem);
        }
    }

    submitSuccessAddress(address, url) {
        window.localStorage.setItem('address', address);
        setTimeout( function () {
            window.location.href = url;
        },1500)
    }

    changeNoteContent(elem, stringsArr) {
        for(let i = 1; i < stringsArr.length + 1; i++) {
            let timeout = 300;
            if(i !== 1) {
                timeout = 2000 * i;
            }

            setTimeout( function () {
                elem.innerHTML = stringsArr[i - 1];
            }, timeout);
        }
    }

    listeners() {
        const self = this;

        this.input.addEventListener('keydown',  () => {
            this.checkTolTip();
        });

        this.input.addEventListener('keyup', () => {
            this.changeValue();
        });

        this.input.addEventListener('keyup', () => {

            if(self.value.length > 2) {
                this.service.autosuggest({
                    q: `${self.value}`,
                    at: '38.71014896078624,-98.60787954719035'
                }, (result) => {
                    this.externalRequestHandler(result);
                });
            }
        });

        this.submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let success = true;

            if(this.value === "") {
                success = false;
                this.showTolTip(this.input, 'Please, enter your property address');
                return;
            }

            this.service.autosuggest({
                q: `${this.value}`,
                at: '38.71014896078624,-98.60787954719035'
            }, (result) => {

                const checkCorrectInput = result.items.some( function (el) {
                    return el.title === self.value;
                });

                if( !checkCorrectInput ) {
                    success = false;
                    this.showTolTip(this.input, 'Please, check your input. <br> We can\'t find this address');
                }
            });

            if(!this.checkNumberInString(this.value)) {
                success = false;
                this.showTolTip(this.input, 'Please enter a more precise address');
                return;
            }

            if( success ) {
                self.submitBtn.classList.add('active');

                self.wrap.insertAdjacentHTML('afterbegin', `
                    <span class="form-group__note"></span>
                `);

                const note = document.querySelector('.form-group__note');

                self.changeNoteContent(note, [
                    'Connect to MLS…',
                    `Checking ${self.value} ...`,
                    'Fetching data ...',
                    'Success !',
                ]);

                setTimeout( () => {
                    self.submitSuccessAddress(self.value, './calculator.html');
                },8000);
            }
        })
    }

    build() {
        this.listeners();
    }
}

export { LiveSearch };