import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import AppContainer from './AppContainer'
import Counter from '../data/Counter'
import Noun from '../data/Noun'
import NounStore from '../data/NounStore'

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
                )
            }
            return Array.from(nounStore.keys())[index]
        }

        // Override all the get state's to read from our fake data.
        NounStore.getState = () => nounStore

        // Simple helper so tests read easier.
        this.render = () => renderer.create(<AppContainer />).toJSON()
    })

    ///// Begin tests /////

    it('renders some nouns', function() {
        this.setNouns([
            {base: 'Hello', plural: false},
            {base: 'World!', plural: false}
        ])

        expect(this.render()).toMatchSnapshot()
    })

})