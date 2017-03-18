import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import AppContainer from './AppContainer'
import Counter from '../data/dictionary/nouns/Counter'
import Noun from '../data/dictionary/nouns/NounDictionaryItem'
import NounAddEditStore from '../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounStore from '../data/dictionary/nouns/NounDictionaryStore'

describe('AppContainer', function() {

    // Set up functions to help mock the data in each store that is used by
    // our container. If there are child containers you may also need to mock that
    // data as well. We do not need to mock all of the callbacks because we are
    // just testing how it renders at a particular point in time. If you also
    // wanted to test how the callbacks behave you would need to make these helper
    // functions actually inject their data into the stores rather than
    // overridding each store's getState() function. As your application grows
    // you should move these into test utils that can be reused across tests for
    // many containers. This should prevent the need for any code to be in the
    // beforeEach() function of your container tests.
    beforeEach(function() {

        let editStore = ''
        this.setEditID = (id) => editStore = id

        let nounStore = Immutable.OrderedMap()
        this.setNouns = (nouns) => {
            nouns.forEach(noun => {
                const id = Counter.increment()
                nounStore = nounStore.set(
                    id,
                    new Noun({id, text: noun.text, complete: !!noun.complete}),
                )
            })
        }

        // Because of how NounStore is set up it's not easy to get access to ids of
        // nouns. This will get the id of a particular noun based on the index it
        // was added to state in.
        this.id = (index) => {
            if (nounStore.size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                );
            }
            return Array.from(nounStore.keys())[index];
        };

        // Override all the get state's to read from our fake data.
        NounAddEditStore.getState = () => editStore;
        NounStore.getState = () => nounStore;

        // Simple helper so tests read easier.
        this.render = () => renderer.create(<AppContainer />).toJSON();
    });

    ///// Begin tests /////

    it('renders some nouns', function() {
        this.setNouns([
            {text: 'Hello', complete: false},
            {text: 'World!', complete: false},
            // Uncomment this to see what it looks like when a snapshot doesn't match.
            // {text: 'Some changes', complete: false},
        ]);

        expect(this.render()).toMatchSnapshot();
    });

    it('renders with no nouns', function() {
        expect(this.render()).toMatchSnapshot();
    });

    it('renders nouns that are complete', function() {
        this.setNouns([
            // Try changing complete to "true" for test0 to see how snapshot changes.
            {text: 'test0', complete: false},
            {text: 'test1', complete: true},
            {text: 'test2', complete: true},
            {text: 'test3', complete: false},
        ]);

        expect(this.render()).toMatchSnapshot();
    });

    it('can edit task that is not complete', function() {
        this.setNouns([
            {text: 'test0', complete: false},
            {text: 'test1', complete: true},
            {text: 'test2', complete: true},
            {text: 'test3', complete: false},
        ]);

        this.setEditID(this.id(0));

        expect(this.render()).toMatchSnapshot();
    });

    it('can edit task that is complete', function() {
        this.setNouns([
            {text: 'test0', complete: false},
            {text: 'test1', complete: true},
            {text: 'test2', complete: true},
            {text: 'test3', complete: false},
        ]);

        this.setEditID(this.id(1))

        expect(this.render()).toMatchSnapshot()
    })

})