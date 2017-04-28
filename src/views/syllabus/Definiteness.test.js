import React from 'react'

import TestUtils       from 'react-addons-test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Definiteness    from './Definiteness'
import LessonNavigator from './LessonNavigator'
import NPAddForm       from '../np/addedit/NPAddForm'
import initialState    from '../../data/StateGetter'

describe("Definiteness", () => {

    it("Renders Definiteness", () => {
        const renderExpression = <Definiteness {...initialState} />
        const definitenessComponent = TestUtils.createRenderer().render(renderExpression)
        expect(definitenessComponent.type).toBe('div')

        expect(findWithClass(definitenessComponent,'help'))
        expect(findWithType(definitenessComponent,NPAddForm))
        expect(findWithClass(definitenessComponent,'quiz'))
        expect(findWithType(definitenessComponent,LessonNavigator))

        // TypeError: Cannot read property 'style' of null
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
