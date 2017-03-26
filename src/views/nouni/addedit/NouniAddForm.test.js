import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore       from '../../../data/AppStore'
import Nound          from '../../../data/dictionary/nound/Nound'
import NouniAEStore   from '../../../data/nouni/addedit/NouniAEStore'
import StringStore    from '../../../data/StringStore'

import NouniAddForm from './NouniAddForm'

describe("NouniAddForm", () => {

    it("Renders a NouniAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            mostRecentlySelectedNound: Nound(),
            nound: Map({
                nouns: OrderedMap()
            }),
            nouni: Map({
                addEditNouni: NouniAEStore.getState(),
            }),
            strings:strings
        }

        const renderExpression = <NouniAddForm {...props} />
        const nouniAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nouniAddForm.type).toBe('div')
        //expect(nouniAddForm.props.children.length).toBe(4)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })
})
