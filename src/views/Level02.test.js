import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level02 from './Level02'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'
import VerbAddEditStore from '../data/verbs/VerbAddEditStore'
import VerbPanel from './verbs/VerbPanel'

describe("Level02", () => {

    it("Renders Level02", () => {
        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        expect(findWithClass(levelControl,'help'))
        expect(findWithType(levelControl,VerbPanel))
        expect(findWithClass(levelControl,'quiz'))
        expect(findWithType(levelControl,LevelControl))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
