'use strict';

import Counter from './Counter';
import Noun from './Noun';
import NounActionTypes from './NounActionTypes';
import NounStore from './NounStore';

describe('NounStore', function() {

    // Before each test case we set up some helper functions that makes the tests
    // easier to read. It's okay to have a fair amount of helper functions as long
    // as they make the tests simpler to read and write. Depending on the
    // complexity of your store it is perfectly reasonable to factor these out
    // into a separate `NounTestHelpers.js` file that can be reused -- and then
    // you could write tests for the helpers too! :P (we actually do this for our
    // main stores)
    beforeEach(function() {
        // Always start with the initial state.
        this.state = NounStore.getInitialState();

        // This function gets a more readable form of the nouns that we can pass
        // to expect().
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

        // Because of how NounStore is set up it's not easy to get access to ids of
        // nouns. This will get the id of a particular noun based on the index it
        // was added to state in.
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
    });

    ///// Begin tests /////

    it('can add multiple nouns', function() {
        expect(this.nouns()).toEqual([]);

        this.dispatch({
            type: NounActionTypes.ADD_NOUN,
            text: 'test0',
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
        ]);

        this.dispatch({
            type: NounActionTypes.ADD_NOUN,
            text: 'test1',
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
            {text: 'test1', complete: false},
        ]);
    });

    it('only removes completed nouns', function() {
        this.addNouns([
            {text: 'test0', complete: false},
            {text: 'test1', complete: true},
            {text: 'test2', complete: false},
        ]);

        this.dispatch({type: NounActionTypes.DELETE_COMPLETED_NOUNS});

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
            {text: 'test2', complete: false},
        ]);
    });

    it('can delete a specific noun', function() {
        this.addNouns([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
            {text: 'test2', complete: false},
        ]);

        this.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id: this.id(2),
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
        ]);

        this.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id: this.id(0),
        });

        expect(this.nouns()).toEqual([
            {text: 'test1', complete: true},
        ]);
    });

    it('can edit a specific noun', function() {
        this.addNouns([
            {text: 'test0', complete: false},
            {text: 'test1', complete: false},
            {text: 'test2', complete: false},
        ]);

        this.dispatch({
            type: NounActionTypes.EDIT_NOUN,
            id: this.id(1),
            text: 'foobar',
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
            {text: 'foobar', complete: false},
            {text: 'test2', complete: false},
        ]);
    });

    it('marks all nouns complete if any are incomplete', function() {
        this.addNouns([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
            {text: 'test2', complete: false},
        ]);

        this.dispatch({type: NounActionTypes.TOGGLE_ALL_NOUNS});

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
            {text: 'test2', complete: true},
        ]);
    });

    it('marks all nouns incomplete if all are complete', function() {
        this.addNouns([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
            {text: 'test2', complete: true},
        ]);

        this.dispatch({type: NounActionTypes.TOGGLE_ALL_NOUNS});

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
            {text: 'test1', complete: false},
            {text: 'test2', complete: false},
        ]);
    });

    it('toggles a particular noun', function() {
        this.addNouns([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
        ]);

        this.dispatch({
            type: NounActionTypes.TOGGLE_NOUN,
            id: this.id(0),
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: false},
            {text: 'test1', complete: true},
        ]);

        this.dispatch({
            type: NounActionTypes.TOGGLE_NOUN,
            id: this.id(0),
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: true},
            {text: 'test1', complete: true},
        ]);

        this.dispatch({
            type: NounActionTypes.TOGGLE_NOUN,
            id: this.id(1),
        });

        expect(this.nouns()).toEqual([
            {text: 'test0', complete: true},
            {text: 'test1', complete: false},
        ]);
    });
});

