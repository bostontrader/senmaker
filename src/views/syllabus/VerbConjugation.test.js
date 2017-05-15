import React from 'react'

import ReactTestUtils       from 'react-dom/test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import VerbConjugation          from './VerbConjugation'
import LessonNavigator from './LessonNavigator'
import initialState    from '../../data/StateGetter'

describe("VerbConjugation", () => {

    it("Renders VerbConjugation", () => {
        const renderExpression = <VerbConjugation {...initialState} />
        const verbConjugationComponent = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(verbConjugationComponent.type).toBe('div')
        //expect(findWithClass(verbConjugationComponent,'help'))
        //expect(findWithClass(verbConjugationComponent,'quiz'))
        //expect(findWithType(verbConjugationComponent,LessonNavigator))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
