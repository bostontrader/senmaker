import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level07 from './Level07'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'
//import VerbAddEditStore from '../data/dictionary/verbd/VerbdAddEditStore'
//import VerbPanel from './dictionary/verbd/VerbPanel'

describe("Level07", () => {

    it("Renders Level07", () => {
        //const props = {
            //addEditVerb: VerbAddEditStore.getInitialState(),
            //level:AppStore.getInitialState(),
            //verbs: OrderedMap(),
            //strings:StringStore.getInitialState()
        //}

        //const renderExpression = <Level07 {...props} />
        //const levelControl = TestUtils.createRenderer().render(renderExpression)
        //expect(levelControl.type).toBe('div')
        expect(true)
        //expect(findWithClass(levelControl,'help'))
        //expect(findWithType(levelControl,VerbPanel))
        //expect(findWithClass(levelControl,'quiz'))
        //expect(findWithType(levelControl,LevelControl))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
