'use strict';

import { Deck, Card } from '/app/decks/deck.js';
import { DECK_TYPES, EVENT_NAMES } from '/app/constants.js';
import { listen } from '/app/utils.js';
import { MODIFIER_DECK, MODIFIER_CARDS, CARD_TYPES_MODIFIER } from '/app/data/modifiercards.js';

export class ModifierDeck extends Deck {
    constructor() {
    	super(DECK_TYPES.MODIFIER, "Monster modifier deck");

    	this.advantage_to_clean = false;

    	this.cards = [];
		MODIFIER_DECK.forEach((card) => {
    		var c = new Card(card.type, card.shuffle, {image: card.image});
    		this.cards.push(c);
    	});
    }
    count(card_type){
    	var c = 0;
    	this.cards.forEach((card) => {
    		if (card.type == card_type) c++;
    	});
    	return c;
    }
    add(card_type){
    	let c;
    	if (card_type === CARD_TYPES_MODIFIER.BLESS)
    		c = new Card(MODIFIER_CARDS.BLESS.type, MODIFIER_CARDS.BLESS.shuffle, {image: MODIFIER_CARDS.BLESS.image});
    	else if (card_type === CARD_TYPES_MODIFIER.CURSE)
    		c = new Card(MODIFIER_CARDS.CURSE.type, MODIFIER_CARDS.CURSE.shuffle, {image: MODIFIER_CARDS.CURSE.image});
    	else 
    		return false;

    	if (this.count(c.type) >= 10)
    		return 10;

    	this.cards.push(c);
    	this.shuffle();
		return this.count(c.type);
    }
    remove(card_type){	
    	var removed = false;

    	this.cards = this.cards.filter((c) => {
    		if (removed) return true;	
    		if (c.type === card_type){
    			removed = true;
    			return false;
    		}
    	});

    	this.shuffle();
		return this.count(card_type);
    }
    _reshuffle(){
    	this.discard = this.discard.filter((card) => (card.type !== CARD_TYPES_MODIFIER.BLESS && card.type !== CARD_TYPES_MODIFIER.CURSE));
    	return super._reshuffle();
    }
}






function define_modifier_card(card_definition) {
    var card_front = create_modifier_card_front(card_definition.image);
    var card_back = create_modifier_card_back();

    var card = {
        ui: new UICard(card_front, card_back),
        card_type: card_definition.type,
        shuffle_next_round: card_definition.shuffle
    };

    return card;
}


function create_modifier_card_back() {
    var card = document.createElement("div");
    card.className = "card modifier back";

    return card;
}

function create_modifier_card_front(card_url) {
    var img = document.createElement("img");
    img.className = "cover";
    img.src = card_url;

    var card = document.createElement("div");
    card.className = "card modifier front";
    card.appendChild(img);

    return card;
}





function load_modifier_deck(number_bless, number_curses) {


    deck.draw_top_discard = function() {
        if (this.discard.length > 0) {
            var card = this.discard[this.discard.length-1];
            card.ui.set_depth(-3);
            card.ui.addClass("pull");
            card.ui.flip_up(true);
            card.ui.removeClass("draw");
            card.ui.addClass("discard");
        }
        force_repaint_deck(this);
    }

    deck.count = function (card_type) {
        return (this.draw_pile.filter(function (card) {
            return card.card_type === card_type;
        }).length);
    }.bind(deck);

    deck.remove_card = function (card_type) {
        for (var i = 0; i < deck.draw_pile.length; i++) {
            if (deck.draw_pile[i].card_type == card_type) {
                deck.draw_pile.splice(i, 1);
                reshuffle(deck, false);

                force_repaint_deck(deck);
                break;
            }
        }
        // write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.add_card = function (card_type) {
        // TOOD: Brittle
        deck.draw_pile.push(define_modifier_card(MODIFIER_CARDS[card_type.toUpperCase()]));

        force_repaint_deck(deck);
        reshuffle(deck, false);
        // write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.shuffle_end_of_round = function () {
        return this.discard.filter(function (card) {
                return card.shuffle_next_round;
            }).length > 0;
    }.bind(deck);

    deck.must_reshuffle = function () {
        return !this.draw_pile.length;
    }.bind(deck);

    deck.clean_discard_pile = function () {
        for (var i = 0; i < deck.discard.length; i++) {
            if (this.discard[i].card_type == CARD_TYPES_MODIFIER.BLESS
                || this.discard[i].card_type == CARD_TYPES_MODIFIER.CURSE) {
                //Delete this curse/bless that has been used
                this.discard.splice(i, 1);
                i--;
            }
        }

        // This is needed every time we update
        force_repaint_deck(this);
    }.bind(deck);

    deck.clean_advantage_deck = function () {
        if ((deck.advantage_to_clean) && deck.discard[1]) {
            deck.advantage_to_clean = false;
            deck.discard[0].ui.removeClass("right");
            deck.discard[0].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
        }
    }.bind(deck);
    var loaded_deck = JSON.parse(get_from_storage("modifier_deck"));

    MODIFIER_DECK.forEach(function (card_definition) {
        var card = define_modifier_card(card_definition);
        if (loaded_deck && find_in_discard_and_remove(loaded_deck.discard,card.card_type)) {
            deck.discard.push(card);
        } else {
            deck.draw_pile.push(card);
        }
    });






    

    return deck;
}