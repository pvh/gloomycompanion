
import { listen, document_load } from '/app/utils.js';
import { EVENT_NAMES } from '/app/constants.js';

import { ModifierDeck } from '/app/decks/modifierdeck.js';
import { ModifierDeckRenderer } from '/app/renderers/modifierdeck.js';

let container = document.getElementById("tableau");
var modifier_deck;
var modifier_deck_renderer;

function create_container(){
    let modifier_container = document.createElement("div");
    modifier_container.className = "card-container";
    modifier_container.id = "modifier-container";
    container.appendChild(modifier_container);
    return modifier_container;
}




function load_scenario(event, b) {

	console.log( event);

	modifier_deck = new ModifierDeck();
	modifier_deck_renderer = new ModifierDeckRenderer(modifier_deck, create_container());
	modifier_deck_renderer.render();

	window.deck = modifier_deck;

	console.log(modifier_deck);

	console.log(modifier_deck.draw());

}

function init() {

	listen(EVENT_NAMES.LOAD_SCENARIO, load_scenario);
}

document_load(init);