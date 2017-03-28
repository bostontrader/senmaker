import {Map, OrderedMap} from 'immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

import AppStore from '../data/AppStore'
import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'
import NoundAEStore from '../data/dictionary/nound/addedit/NoundAEStore'
import StringStore from '../data/StringStore'
import VerbdAEStore from '../data/dictionary/verbd/addedit/VerbdAEStore'

it('Renders Level00', () => {
    const props = {level:AppStore.getInitialState(), strings:StringStore.getInitialState()}
    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Level00 {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')

    const tree = rtRenderer.create(<Level00 {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('Renders Level01', () => {
    const props = {
        level:AppStore.getInitialState(),
        nound: Map({
            addEditNound: NoundAEStore.getInitialState(),
            nouns: OrderedMap()
        }),
        strings:StringStore.getInitialState()
    }

    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Level01 {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')

    const tree = rtRenderer.create(<Level01 {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('Renders Level02', () => {
    const props = {
        addEditVerb: VerbdAEStore.getInitialState(),
        level:AppStore.getInitialState(),
        verbd: Map({
            addEditVerbd: VerbdAEStore.getInitialState(),
            verbs: OrderedMap()
        }),
        strings:StringStore.getInitialState()
    }

    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Level02 {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')


    const tree = rtRenderer.create(<Level02 {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})
