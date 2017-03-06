import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import Level01 from './Level01'

describe("Level01", () => {

    it("correctly renders the Level01", () => {
        const props = {level:{currentAppLevel:{app: 1, nounPanel:NounPanelLevel.BASE}, minLevel:false, maxLevel:false, quiz:false}, editingNoun:{id:'', add:''}, nouns:OrderedMap()}
        const renderExpression = <Level01 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
