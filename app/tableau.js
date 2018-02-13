
'use strict';

import { listen, document_load } from '/app/utils.js';
import { EVENT_NAMES } from '/app/constants.js';

import eventbus from '/app/tinycentraldispatch.js';

import { ModifierDeck } from '/app/decks/modifierdeck.js';
import { AbilityDeck } from '/app/decks/abilitydeck.js';
import { ModifierDeckRenderer } from '/app/renderers/modifierdeck.js';
import { AbilityDeckRenderer } from '/app/renderers/abilitydeck.js';

let container = document.getElementById("tableau");

let ability_decks = [];

var modifier_deck;
var modifier_deck_renderer;

function create_container(){
    let modifier_container = document.createElement("div");
    modifier_container.className = "card-container";

    container.appendChild(modifier_container);
    return modifier_container;
}

function load_scenario(event) {

	let modifier_container = create_container();
	modifier_container.id = "modifier-container";

	modifier_deck = new ModifierDeck();
	modifier_deck.shuffle();
	modifier_deck_renderer = new ModifierDeckRenderer(modifier_deck, modifier_container);
	modifier_deck_renderer.render();


	event.decks.forEach(function(deck) {
		let container = create_container();
		let ability = new AbilityDeck(deck, event.level);
		ability_decks.push(ability.shuffle());
		let renderer = new AbilityDeckRenderer(ability, container);
		renderer.render();
	});

	eventbus.listen("cards_drawn", undefined, (c) => console.log(c.deck.name + ' - cards left:',  c.deck.cards.length) );
	eventbus.listen("modifier_deck_changed", undefined, console.log );

	window.ability = ability_decks;
	window.deck = modifier_deck;
}

function init() {

	listen(EVENT_NAMES.LOAD_SCENARIO, load_scenario);
}

document_load(init);