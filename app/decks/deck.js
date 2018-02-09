'use strict';

import UICard from '/app/decks/card.js';

export class Deck {
    constructor(type, name) {

        this.name = name;
        this.type = type;
        
        this.cards = [];
        this.discard = [];
    }
    shuffle(){
        var array = this.cards;
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        
        this.cards = array;
        return this;
    }
    draw(){
        if (this.cards.length == 0)
            return this._reshuffle().draw();

        var card = this.cards.shift();
        this.discard.push(card);
        return card;
    }
    _reshuffle(){
        while (this.discard.length > 0){
            var c = this.discard.pop();
            if (c)
                this.cards.push(c);
        }
        return this.shuffle();
    }
    render(){
        return false;
    }
}

export { Card } from '/app/decks/card.js';
export default Deck;