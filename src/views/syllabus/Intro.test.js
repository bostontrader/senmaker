import React from 'react'

import TestUtils       from 'react-addons-test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Intro           from './Intro'
import LessonNavigator from './LessonNavigator'
import initialState    from '../../data/StateGetter'

describe("Intro", () => {

    it("Renders Intro before the Quiz", () => {
        const renderExpression = <Intro {...initialState} />
        const clauseComponent = TestUtils.createRenderer().render(renderExpression)
        expect(clauseComponent.type).toBe('div')
        expect(findWithClass(clauseComponent,'help'))
        expect(findWithClass(clauseComponent,'quiz'))
        expect(findWithType(clauseComponent,LessonNavigator))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Intro after the Quiz", () => {
        const renderExpression = <Intro {...initialState} />
        const clauseComponent = TestUtils.createRenderer().render(renderExpression)
        expect(clauseComponent.type).toBe('div')
        expect(findWithClass(clauseComponent,'help'))
        expect(findWithClass(clauseComponent,'quiz'))
        expect(findWithType(clauseComponent,LessonNavigator))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
