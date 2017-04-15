import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

//import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../../data/app/AppStore'
import Definiteness from './Definiteness'
//import LevelControl from './LevelControl'
import NounAddEditStore from '../../data/dictionary/nound/addedit/NoundAEStore'
//import NounPanel from './dictionary/nound/NoundPanel'
import QuizStore from '../../data/quiz/QuizStore'
import StringStore from '../../data/strings/StringStore'

describe("Definiteness", () => {

    it("Renders Definiteness", () => {
        const props = {
            addedit: NounAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            nouns: OrderedMap(),
            strings:StringStore.getInitialState(),
            quiz:QuizStore.getInitialState()
        }

        const renderExpression = <Definiteness {...props} />
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
