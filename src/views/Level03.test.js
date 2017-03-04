import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import Level03 from './Level03'
import {NounPanelLevel} from '../data/nouns/NounConstants'

describe("Level03", () => {

    it("correctly renders the Level03", () => {
        const props = {level:{app: 3, nounPanel:NounPanelLevel.BASE}, editingNoun:{id:'', add:''}, nouns:OrderedMap()}
        const renderExpression = <Level03 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
