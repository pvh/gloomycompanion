'use strict';

import UICard from '/app/decks/card.js';

export class Deck {
    constructor(type, name) {

        this.name = name;
        this.type = type;
        this.shuffle_required = false;
        
        this.cards = [];
        this.discard = [];

        this._ondraw = console.log;
        this._onshuffle = console.log;
        this._onadd = console.log;
        this._onremove = console.log;
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
        this._onshuffle(this);
        this.shuffle_required = false;
        return this;
    }
    draw(draw_count){
        draw_count = draw_count || 1;
        let drawn = [];
        while (draw_count-- > 0){
            if (this.cards.length == 0)
                return this.reset_deck().shuffle().draw();

            let card = this.cards.shift();
            drawn.push(card);
            this.discard.push(card);
            this.shuffle_required = card.shuffle_next_round || this.shuffle_required;
        } 
        this._ondraw(drawn, this);
        return drawn;
    }
    reset_deck(){
        if (!this.shuffle_required)
            return {shuffle: ()=>{}};

        while (this.discard.length > 0){
            var c = this.discard.pop();
            if (c)
                this.cards.push(c);
        }
        return this;
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
    onadd(_cb){
        this._onadd = _cb || (() => {});
    }
    onremove(_cb){
        this._onremove = _cb || (() => {});
    }
}

export { Card } from '/app/decks/card.js';
export default Deck;