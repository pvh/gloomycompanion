'use strict';

import { Deck, Card } from '/app/decks/deck.js';
import { DECK_TYPES, EVENT_NAMES } from '/app/constants.js';
import { listen } from '/app/utils.js';
import { DECKS, DECK_DEFINITONS } from '/app/data/cards.js';
import { MONSTERS } from '/app/data/monsterstats.js'


export class AbilityDeck extends Deck{
    constructor(deckType, level) {

        let deck = DECKS[(deckType.class || deckType.name)];

        super(deck.class, deckType.name);
        
        this.cards = [];
        this.level = level;
        this.advantage_to_clean = false;

        let monster = MONSTERS[this.name];
        this.stats = monster.levels.find((l) => l.level === level);

        let deck_definition = DECK_DEFINITONS[deck.class];
        
        deck_definition.cards.forEach((card) => {
            let shuffle = card.shift();
            var c = new Card(deck.name + " " + card[0], shuffle, {content: card});
            this.cards.push(c);
        });
    }

}

export default AbilityDeck;