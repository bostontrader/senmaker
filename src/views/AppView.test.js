import {Map}          from 'immutable'
import React          from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'

import Intro        from './syllabus/Intro'
import Nound        from './syllabus/Nound'
import Verbd        from './syllabus/Verbd'
import AppStore     from '../data/app/AppStore'
import NoundStore   from '../data/dictionary/nound/NoundStore'
import NoundAEStore from '../data/dictionary/nound/addedit/NoundAEStore'
import VerbdStore   from '../data/dictionary/verbd/VerbdStore'
import VerbdAEStore from '../data/dictionary/verbd/addedit/VerbdAEStore'
import QuizStore    from '../data/quiz/QuizStore'
import StringStore  from '../data/strings/StringStore'

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
            addedit: NoundAEStore.getInitialState(),
            dict: NoundStore.getInitialState()
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
        app:AppStore.getInitialState(),
        verbd: Map({
            addedit: VerbdAEStore.getInitialState(),
            dict: VerbdStore.getInitialState()
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
