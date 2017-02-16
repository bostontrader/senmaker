'use strict';

import Counter from './Counter';
import Noun from './Noun';
import NounActionTypes from './NounActionTypes';
import NounStore from './NounStore';

describe('NounStore', function() {








    beforeEach( function() {

        this.state = NounStore.getInitialState();



        this.nouns = () => Array.from(this.state.values()).map(noun => ({
            text: noun.text,
            complete: !!noun.complete,
        }));

        // This function is for setting up data, it will add all the nouns to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            nouns.forEach(noun => {
                const id = Counter.increment();
                this.state = this.state.set(
                    id,
                    new Noun({id, text: noun.text, complete: !!noun.complete}),
                );
            });
        };




        this.id = (index) => {
            if (this.state.size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                );
            }
            return Array.from(this.state.keys())[index];
        };

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = NounStore.reduce(this.state, action);
        };
    })



    it('can add multiple nouns', function() {
        expect(this.nouns()).toEqual([])
    })

})












































































