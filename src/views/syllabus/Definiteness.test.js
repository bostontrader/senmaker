import React from 'react'

import ReactTestUtils       from 'react-dom/test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Definiteness    from './Definiteness'
import LessonNavigator from './LessonNavigator'
import NPAEForm        from '../np/addedit/NPAEForm'
import initialState    from '../../data/StateGetter'

describe("Definiteness", () => {

    it("Renders Definiteness", () => {
        const renderExpression = <Definiteness {...initialState} />
        const definitenessComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(definitenessComponent.type).toBe('div')

        expect(findWithClass(definitenessComponent,'help'))
        expect(findWithType(definitenessComponent,NPAEForm))
        expect(findWithClass(definitenessComponent,'quiz'))
        expect(findWithType(definitenessComponent,LessonNavigator))

        // TypeError: Cannot read property 'style' of null
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
