'use strict';

import AbilityParser from '/app/renderers/abilityparser.js';
import { UIAbilityCard } from '/app/renderers/abilitycard.js';
import { DeckRenderer } from '/app/renderers/deck.js';

export class AbilityDeckRenderer extends DeckRenderer {
    constructor(deck, container){
        super(deck, container)

        this.parser = new AbilityParser(deck.stats);
    }
    render(){

        let deckname = this.deck.name + " • " + this.deck.level;

        this.uiCards = this.deck.cards.map((c) => new UIAbilityCard(c, deckname, this.parser).init());

        return super.render()
    }
}

export default AbilityDeckRenderer; 
