'use strict';

import { UICard } from '/app/renderers/card.js';

export class DeckRenderer{
    constructor(deck, container){
        this.deck = deck;
        this.container = container;
        this.uiCards = [];
        this.deck_space = container;
    }
    
    render(){

        this.uiCards.forEach((c, i) => {
            c.set_depth((i * -1)-1);
            c.attach(this.deck_space);
        });

        this.deck.ondraw(this.ondrawn.bind(this));
        this.deck.onshuffle(this.onshuffled.bind(this));

        return this.uiCards;
    }

    ondrawn(cards) {
        this.uiCards.forEach((c, i) => {
            c.push_down();
            c.removeClass("pull");
        });

        cards.forEach((card, i) => {
            let uiCard = this.uiCards.find((uc) => uc.card === card);
            this.move_to_top(uiCard);

            uiCard.split(i, cards.length);
            uiCard.draw();
        }); 
    }

    onshuffled(deck){

        let uiCards = this.get_uicards_from_pile(deck);

        uiCards.forEach((card, i) => {
            card.discard();
            card.set_depth((i * -1)-1);
            card.split(0);
        });
        window.setTimeout(()=>{
            let topCard = uiCards[0];
            this.move_to_top(topCard);
            topCard.shuffle();
        },500);
    }

    get_uicards_from_pile(deck){
        return this.uiCards.filter(uicard => {
            return deck.cards.includes(uicard.card);
        });
    }

    move_to_top(uiCard){
        let topCard = this.deck_space.children[0];
        this.deck_space.insertBefore(uiCard.front,topCard);
        this.deck_space.insertBefore(uiCard.back,topCard);
    }
}

export default DeckRenderer; 
