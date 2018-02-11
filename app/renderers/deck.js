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
            this.uiCards.forEach((c) => {
                c.push_down();
                if (c.containsClass('top')){
                    window.setTimeout(() => c.removeClass("top"), 2000);
                    return;
                }
                c.flip_up(false);
                c.removeClass("pull");
            });

            cards.forEach((card) => {
                let uiCard = this.uiCards.find((uc) => uc.card === card);
                this.move_to_top(uiCard);
                uiCard.draw();
            }); 
    }

    onshuffled(deck){
        this.uiCards.forEach((card, i) => {
            card.discard();
            card.set_depth((i * -1)-1);
        });
        window.setTimeout(()=>{
            let topCard = this.uiCards[0];
            this.move_to_top(topCard);
            topCard.shuffle();
        },500);

    }

    move_to_top(uiCard){
        let topCard = this.deck_space.children[0];
        this.deck_space.insertBefore(uiCard.front,topCard);
        this.deck_space.insertBefore(uiCard.back,topCard);
    }
}

export default DeckRenderer; 
