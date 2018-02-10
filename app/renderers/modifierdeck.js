'use strict';

import { UICard } from '/app/renderers/uicard.js';

export class ModifierDeckRenderer{
	constructor(deck, container){
		this.deck = deck;
		this.container = container;
		this.uiCards = [];
		this.deck_space = undefined;
	}
	render(){
	    let button_div = document.createElement("div");
	    button_div.className = "modifier-deck-column-1";

	    button_div.appendChild(this.create_counter_widget("bless", (a) => this.deck.add(a), (a) => this.deck.remove(a)));
	    button_div.appendChild(this.create_counter_widget("curse", (a) => this.deck.add(a), (a) => this.deck.remove(a)));
	    button_div.appendChild(this.create_counter_widget("round"));

	    let end_round_div = document.createElement("div");
	    end_round_div.className = "counter-icon shuffle not-required";
	    //end_round_div.onclick = end_round;

	    button_div.appendChild(end_round_div);

	    let deck_column = document.createElement("div");
	    deck_column.className = "modifier-deck-column-2";

	    this.deck_space = document.createElement("div");
	    this.deck_space.className = "card-container modifier";


	    let draw_two_button = document.createElement("div");
	    draw_two_button.className = "button draw-two";
//	    draw_two_button.onclick = double_draw.bind(null, modifier_deck);

	    deck_column.appendChild(this.deck_space);
	    deck_column.appendChild(draw_two_button);

	    this.container.appendChild(deck_column);
	    this.container.appendChild(button_div);

	    this.uiCards = this.deck.cards.map((c) => new UICard(c));

	    this.uiCards.forEach((c, i) => {
	    	c.set_depth(i * -1);
	    	c.attach(this.deck_space);
	    });

	    this.deck.ondraw(this.ondrawn.bind(this));

	    return this.uiCards;
	}

	ondrawn(cards) {
	    	this.uiCards.forEach((c) => {
	    		c.push_down();
	    		if (c.containsClass('top')){
	    			window.setTimeout(() => c.removeClass("top"), 2000);
	  				return;
	    		}
	    		c.flip_up(false);
	    		c.removeClass("pull");
	    		c.removeClass("cleanup");
	    	});

	    	cards.forEach((card) => {
				let uiCard = this.uiCards.find((uc) => uc.card === card);
				this.move_to_top(uiCard);
				uiCard.draw();
			});	
	    }

	move_to_top(uiCard){
		let topCard = this.deck_space.children[0];
		this.deck_space.insertBefore(uiCard.front,topCard);
		this.deck_space.insertBefore(uiCard.back,topCard);
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
