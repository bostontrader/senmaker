import {Map, OrderedMap} from 'immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

import AppStore from '../data/app/AppStore'
import Intro from './syllabus/Intro'
import Nound from './syllabus/Nound'
import Verbd from './syllabus/Verbd'
import NoundAEStore from '../data/dictionary/nound/addedit/NoundAEStore'
import QuizStore from '../data/quiz/QuizStore'

import StringStore from '../data/strings/StringStore'
import VerbdAEStore from '../data/dictionary/verbd/addedit/VerbdAEStore'

it('Renders Intro', () => {
    const props = {app:AppStore.getInitialState(), strings:StringStore.getInitialState(), quiz:QuizStore.getInitialState()}
    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Intro {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')

    const tree = rtRenderer.create(<Intro {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('Renders Nound', () => {
    const props = {
        app:AppStore.getInitialState(),
        nound: Map({
            addEditNound: NoundAEStore.getInitialState(),
            nouns: OrderedMap()
        }),
        quiz:QuizStore.getInitialState(),
        strings:StringStore.getInitialState()
    }

    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Nound {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')

    const tree = rtRenderer.create(<Nound {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('Renders Verbd', () => {
    const props = {
        addEditVerb: VerbdAEStore.getInitialState(),
        app:AppStore.getInitialState(),
        verbd: Map({
            addEditVerbd: VerbdAEStore.getInitialState(),
            verbs: OrderedMap()
        }),
        quiz:QuizStore.getInitialState(),
        strings:StringStore.getInitialState()
    }

    const rtuRenderer = ReactTestUtils.createRenderer()
    rtuRenderer.render(<Verbd {...props} />)
    const result = rtuRenderer.getRenderOutput()
    expect(result.type).toBe('div')


    const tree = rtRenderer.create(<Verbd {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})
