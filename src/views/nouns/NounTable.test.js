import Immutable from 'immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'

import Noun from '../../data/nouns/Noun'
import NounConstants from '../../data/nouns/NounConstants'
import NounStore from '../../data/nouns/NounStore'
import NounTable from './NounTable'

describe('NounTable', function() {

    beforeEach(function() {

        //let editStore = '';
        //this.setEditID = (id) => editStore = id;

        //let draftStore = '';
        //this.setDraftText = (text) => draftStore = text;

        //this.catfood = () => {
            //console.log('catfood yum')
        //}

        //let nounStore = Immutable.OrderedMap()

        //this.setNouns = (nouns) => {
            //nouns.forEach(noun => {
                //const id = Counter.increment();
                //nounStore = nounStore.set(
                    //id,
                    //new Noun({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
                //)
            //})
        //}

        // Because of how NounStore is set up it's not easy to get access to ids of
        // nouns. This will get the id of a particular noun based on the index it
        // was added to state in.
        //this.id = (index) => {
            //if (nounStore.size <= index) {
                //throw new Error(
                    //'Requested id for an index that is larger than the size of the ' +
                    //'current state.'
                //)
            //}
            //return Array.from(nounStore.keys())[index]
        //}

        // Override all the get state's to read from our fake data.
        //NounDraftStore.getState = () => draftStore;
        //NounEditStore.getState = () => editStore;
        //NounStore.getState = () => nounStore

        // Simple helper so tests read easier.
        //this.render = () => renderer.create(<AppContainer />).toJSON();
    })


    it('renders correctly', () => {

        let props = {'nouns':Immutable.OrderedMap()}

        //let propsnouns = Immutable.OrderedMap()

        //this.setNouns = (nouns) => {
        //nouns.forEach(noun => {
        //const id = Counter.increment();
        //nounStore = nounStore.set(
        //id,
        //new Noun({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
        //)
        //})
        //}

        //this.setNouns([
            //{base: 'cat', plural: 'cats', pluralization_rule: 0}
        //])

        //const nouns = [
        //{base: 'cat', plural: 'cats', pluralization_rule: 0}
        //]

        const tree = renderer.create(
            <NounTable {...props} />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the html is ok', () => {
        let props = {'nouns':Immutable.OrderedMap()}

        //const nouns = [
            //{base: 'cat', plural: 'cats', pluralization_rule: 0}
        //]

        const renderer = ReactTestUtils.createRenderer();
        renderer.render(<NounTable {...props}  />);
        const result = renderer.getRenderOutput();

        expect(result.type).toBe('table')
    })

})
