'use strict';

import UICard from '/app/decks/card.js';

export class Deck {
    constructor(type, name) {

        this.name = name;
        this.type = type;
        
        this.cards = [];
        this.discard = [];

        this._ondraw = console.log;
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
        this.onshuffle(this);
        return this;
    }
    draw(draw_count){
        draw_count = draw_count || 1;
        let drawn = [];
        while (draw_count-- > 0){
            if (this.cards.length == 0)
                return this._reshuffle().draw();

            let card = this.cards.shift();
            drawn.push(card);
            this.discard.push(card);
        } 
        this._ondraw(drawn, deck);
        return drawn;
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

    ondraw(_cb){
        this._ondraw = _cb || (() => {});
    }
    onshuffle(_cb){
        this._onshuffle = _cb || (() => {});
    }
}

export { Card } from '/app/decks/card.js';
export default Deck;