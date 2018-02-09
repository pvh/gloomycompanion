'use strict';

import { toggle_class } from '/app/utils.js';

export class UICard {

    constructor(card){
    	this.card = card;

        this.back = create_modifier_card_back();
        this.front = create_modifier_card_front(card.content.image);
        console.log(this.back);
        this.flip_up(false);
    }

    flip_up(faceup) {
        toggle_class(this.back, "up", !faceup);
        toggle_class(this.back, "down", faceup);

        toggle_class(this.front, "up", faceup);
        toggle_class(this.front, "down", !faceup);
    }

    set_depth(z) {
        this.back.style.zIndex = z;
        this.front.style.zIndex = z;
    }

    push_down() {
        this.back.style.zIndex -= 1;
        this.front.style.zIndex -= 1;
    }

    addClass(class_name) {
        this.front.classList.add(class_name);
        this.back.classList.add(class_name);
    }

    removeClass(class_name) {
        this.front.classList.remove(class_name);
        this.back.classList.remove(class_name);
    }

    attach(parent) {
        parent.appendChild(this.back);
        parent.appendChild(this.front);
    }
}

function create_modifier_card_back() {
    var card = document.createElement("div");
    card.className = "card modifier back draw";
    return card;
}

function create_modifier_card_front(card_url) {
    var img = document.createElement("img");
    img.className = "cover";
    img.src = card_url;

    var card = document.createElement("div");
    card.className = "card modifier front draw";

    card.appendChild(img);

    return card;
}




export default UICard;