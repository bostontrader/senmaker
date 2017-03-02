import {findAllWithType} from "react-shallow-testutils"
import {OrderedMap} from 'immutable'
import React from "react"
import TestUtils from "react-addons-test-utils"

import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'
import NounTable from './NounTable'

describe("NounTable", () => {

    let tuRenderer, nounTable, nouns

    beforeEach( () => {
        tuRenderer = TestUtils.createRenderer()

        nouns = OrderedMap()
        const id = 1
        const action = {base:'cat', plural:'cats', pluralization_rule: 1}

        nouns = nouns.set(id, new Noun({
            id: id,
            base: action.base,
            plural: action.plural,
            pluralization_rule: action.pluralization_rule
        }))
        
    })

    it("renders a level 1 NounTable", () => {
        tuRenderer = TestUtils.createRenderer()
        nounTable = tuRenderer.render(<NounTable level={1} nouns={nouns} />)
        expect(nounTable.type).toBe('table')
        expect(nounTable.props.children.length).toBe(2)
    })


    it("renders a level 2 NounTable", () => {
        tuRenderer = TestUtils.createRenderer()
        nounTable = tuRenderer.render(<NounTable level={2} nouns={nouns} />)
        expect(nounTable.type).toBe('table')
        expect(nounTable.props.children.length).toBe(2)
    })


    it("will render one NounItem", () => {
        //var nouns = shallowTestUtils.findAllWithType(nounlist, Toodo);
        //const nounItems = shallowTestUtils.findAllWithType(nounTable, NounItem)
        const nounItems = findAllWithType(nounTable, NounItem)
        //console.log(nounItems)
        expect(nounItems.length).toBe(1)

        //var dinnerNoun = nouns[2];
        //expect(dinnerNoun).to.deep.equal(
            //<Toodo key="toodo-2" text="go out to dinner" />
        //);
        expect(true)
    })
})
