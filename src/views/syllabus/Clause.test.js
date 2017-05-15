import React from 'react'

import ReactTestUtils       from 'react-dom/test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Clause          from './Clause'
import LessonNavigator from './LessonNavigator'
import initialState    from '../../data/StateGetter'

describe("Clause", () => {

    it("Renders Clause", () => {
        //const renderExpression = <Clause {...initialState} />
        //const clauseComponent = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(clauseComponent.type).toBe('div')
        //expect(findWithClass(clauseComponent,'help'))
        //expect(findWithClass(clauseComponent,'quiz'))
        //expect(findWithType(clauseComponent,LessonNavigator))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
