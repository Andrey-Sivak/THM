'use strict';

class Menu {
    constructor( options ) {
        this.btn = options.button;
        this.hamburger = options.hamburger;
        this.activeClass = options.activeClass;
        this.menu = options.menu;
        this.menuWrap = this.menu.parentElement;
        this.menuItems = this.menu.querySelector('.menu').children;
        this.menuItems = Array.prototype.slice.call( this.menuItems );

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.hamburger.classList.toggle( this.activeClass );
        this.menuWrap.classList.toggle( this.activeClass );
        this.menu.classList.toggle( this.activeClass );
        this.menuItems.forEach( item => item.classList.toggle( this.activeClass ) );
    }

    listener() {
        this.btn.addEventListener('click', this.toggleMenu);
    }

    init() {
        if( !this.btn || !this.hamburger || !this.activeClass  ) {
            return;
        }

        this.listener();
    }
}

export { Menu };