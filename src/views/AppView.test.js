import {Map}          from 'immutable'
import React          from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import AppView      from './AppView'
import Intro        from './syllabus/Intro' // 0
import Nound        from './syllabus/Nound' // 1
import initialState from '../data/StateGetter'

const tester = (currentLesson, lessonComponent) => {
    initialState.app = initialState.app.setIn(['level', 'currentLesson'],currentLesson)
    const renderExpression = <AppView {...initialState} />
    const appViewComponent = ReactTestUtils.createRenderer().render(renderExpression)
    expect(findWithType(appViewComponent,lessonComponent))
}

it('Renders Intro', () => {tester('intro',Intro)}) // 0
it('Renders Nound', () => {tester('nound',Nound)}) // 1


