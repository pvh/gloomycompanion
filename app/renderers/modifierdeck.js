'use strict';

import { UICard } from '/app/renderers/card.js';
import { DeckRenderer } from '/app/renderers/deck.js';

export class ModifierDeckRenderer extends DeckRenderer {
    constructor(deck, container){
        super(deck, container)
    }
    render(){
        let button_div = document.createElement("div");
        button_div.className = "modifier-deck-column-1";

        button_div.appendChild(this.create_counter_widget("bless", (a) => this.deck.add(a), (a) => this.deck.remove(a)));
        button_div.appendChild(this.create_counter_widget("curse", (a) => this.deck.add(a), (a) => this.deck.remove(a)));
        button_div.appendChild(this.create_counter_widget("round"));

        let end_round_div = document.createElement("div");
        end_round_div.className = "counter-icon shuffle not-required";
        end_round_div.addEventListener('click', () => this.deck.reset_deck().shuffle());

        button_div.appendChild(end_round_div);

        let deck_column = document.createElement("div");
        deck_column.className = "modifier-deck-column-2";

        this.deck_space = document.createElement("div");
        this.deck_space.className = "card-container modifier";


        let draw_two_button = document.createElement("div");
        draw_two_button.className = "button draw-two";
//      draw_two_button.onclick = double_draw.bind(null, modifier_deck);

        deck_column.appendChild(this.deck_space);
        deck_column.appendChild(draw_two_button);

        this.container.appendChild(deck_column);
        this.container.appendChild(button_div);

        this.uiCards = this.deck.cards.map((c) => new UICard(c).init());

        this.deck.onadd(this.onadd.bind(this));
        this.deck.onremove(this.onremove.bind(this));

        return super.render()
    }

    onadd(card) {
        var uicard = new UICard(card).init();
        uicard.attach(this.deck_space);
        uicard.set_depth(-50);
        this.uiCards.push(uicard);
    }

    onremove(card){
        let uiCard = this.uiCards.find((uc) => uc.card === card);
        if (!uiCard)
            return;
        this.uiCards = this.uiCards.filter((uc) => uc !== uiCard);
        uiCard.detach();
    }

    create_counter_widget(card_type, increment_func, decrement_func) {

        let widget_container = document.createElement("div");
        widget_container.className = "counter-icon";

        let background = document.createElement("div");
        background.className = "background " + card_type;
        widget_container.appendChild(background);

        let text_element = document.createElement("div");
        text_element.className = "icon-text";
        text_element.innerText = "0";

        if (decrement_func)
            widget_container.appendChild(this.create_button(card_type, "decrement", "-", decrement_func, text_element));
        
        widget_container.appendChild(text_element);
        
        if (increment_func)
            widget_container.appendChild(this.create_button(card_type, "increment", "+", increment_func, text_element));

        return widget_container;
    }
    create_button(card_type, class_name, text, func, text_element) {
        var button = document.createElement("div");
        button.className = class_name + " button";
        button.innerText = text;

        button.addEventListener("click", () => {
            text_element.innerText = func(card_type);
        });

        return button;
    }
}

export default ModifierDeckRenderer; 
