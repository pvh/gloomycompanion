
import { listen, document_load } from '/app/utils.js';
import { EVENT_NAMES } from '/app/constants.js';

import { ModifierDeck } from '/app/decks/modifierdeck.js';
import { AbilityDeck } from '/app/decks/abilitydeck.js';
import { ModifierDeckRenderer } from '/app/renderers/modifierdeck.js';

let container = document.getElementById("tableau");

let ability_decks = [];

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
	modifier_deck.shuffle();
	modifier_deck_renderer = new ModifierDeckRenderer(modifier_deck, create_container());
	let cards = modifier_deck_renderer.render();

	container.addEventListener('click', ()=>{
		deck.draw(1);
	})


	event.decks.forEach(function(deck) {
		let ability = new AbilityDeck(deck, event.level)
		ability_decks.push(ability.shuffle());
	})

	console.log(ability_decks);




	window.ability = ability_decks;
	window.deck = modifier_deck;
}

function init() {

	listen(EVENT_NAMES.LOAD_SCENARIO, load_scenario);
}

document_load(init);