import React from 'react'

import TestUtils       from 'react-addons-test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Sentence        from './Sentence'
import LessonNavigator from './LessonNavigator'
import initialState    from '../../data/StateGetter'

describe("Sentence", () => {

    it("Renders Sentence", () => {
        const renderExpression = <Sentence {...initialState} />
        const sentenceComponent = TestUtils.createRenderer().render(renderExpression)
        expect(sentenceComponent.type).toBe('div')
        expect(findWithClass(sentenceComponent,'help'))
        expect(findWithClass(sentenceComponent,'quiz'))
        expect(findWithType(sentenceComponent,LessonNavigator))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
