import React from 'react'

import TestUtils       from 'react-addons-test-utils'
import {findWithClass} from 'react-shallow-testutils'
import {findWithType}  from 'react-shallow-testutils'
import rtRenderer      from 'react-test-renderer'

import Pluralization   from './Pluralization'
import LessonNavigator from './LessonNavigator'
import NoundPanel      from '../dictionary/nound/NoundPanel'
import initialState    from '../../data/StateGetter'

describe("Pluralization", () => {

    it("Renders Pluralization", () => {
        const renderExpression = <Pluralization {...initialState} />
        const noundRenderer = TestUtils.createRenderer().render(renderExpression)
        expect(noundRenderer.type).toBe('div')
        expect(findWithClass(noundRenderer,'help'))
        expect(findWithType(noundRenderer,NoundPanel))
        expect(findWithClass(noundRenderer,'quiz'))
        expect(findWithType(noundRenderer,LessonNavigator))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
