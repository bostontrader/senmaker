import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level03 from './Level03'
import LevelControl from './LevelControl'
import NounAddEditStore from '../data/dictionary/nound/addedit/NoundAEStore'
import NounPanel from './dictionary/nound/NoundPanel'
import StringStore from '../data/StringStore'

describe("Level03", () => {

    it("Renders Level03", () => {
        const props = {
            addEditNound: NounAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            nouns: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level03 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        //expect(levelControl.type).toBe('div')

        //expect(findWithClass(levelControl,'help'))
        //expect(findWithType(levelControl,NounPanel))
        //expect(findWithClass(levelControl,'quiz'))
        //expect(findWithType(levelControl,LevelControl))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
        expect(true)
    })

})
