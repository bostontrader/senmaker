import React from 'react'

import ReactTestUtils       from 'react-dom/test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import VerbMax         from './VerbMax'
import LessonNavigator from './LessonNavigator'
import initialState    from '../../data/StateGetter'
import VerbdPanel      from '../../views/dictionary/verbd/VerbdPanel'

describe("VerbMax", () => {

    it("Renders VerbMax", () => {
        //const renderExpression = <VerbMax {...initialState} />
        //const verbMaxComponent = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(verbMaxComponent.type).toBe('div')
        //expect(findWithClass(verbMaxComponent,'help'))
        //expect(findWithType(verbMaxComponent,VerbdPanel))
        //expect(findWithClass(verbMaxComponent,'quiz'))
        //expect(findWithType(verbMaxComponent,LessonNavigator))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
