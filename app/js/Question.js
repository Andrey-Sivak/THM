class Question {

    constructor(options) {
        this.wrap = document.querySelector(`.${options.wrapClass}`);
        this.buttons = [...this.wrap.querySelector('.question__btns').children];
        this.title = this.wrap.querySelector('.question__title').innerHTML;
    }

    saveData(e, elem) {
        e.preventDefault();
        const answer = elem.innerHTML;
        const link = elem.getAttribute('href');
        window.localStorage.setItem(this.title, answer);

        setTimeout( function () {
            window.location.href = link;
        },500)
    }

    init() {
        const self = this;
        this.buttons.forEach( function (button) {
            button.addEventListener('click', function (e) {
                self.saveData(e, button);
            });
        })
    }
}

export { Question };