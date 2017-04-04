import React from 'react'

import TestUtils  from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppStore    from '../../data/app/AppStore'
import QuizStore   from '../../data/quiz/QuizStore'
import StringStore from '../../data/strings/StringStore'

import Intro from './Intro'
import LessonNavigator from './LessonNavigator'

describe("Intro", () => {

    it("Renders Intro", () => {
        const props = {
            app:AppStore.getInitialState(),
            quiz: QuizStore.getInitialState(),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <Intro {...props} />
        const introRenderer = TestUtils.createRenderer().render(renderExpression)
        expect(introRenderer.type).toBe('div')

        expect(findWithClass(introRenderer,'help'))
        expect(findWithClass(introRenderer,'quiz'))
        expect(findWithType(introRenderer,LessonNavigator))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
