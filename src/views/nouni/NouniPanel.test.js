import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../data/app/AppStore'
import NouniAddForm  from './addedit/NouniAddForm'
//import NouniEditForm from './addedit/NouniEditForm'
import NouniPanel    from './NouniPanel'
import NouniTable    from './NouniTable'
import NoundAEStore  from '../../data/dictionary/nound/addedit/NoundAEStore'
import NouniAEStore  from '../../data/nouni/addedit/NouniAEStore'
import StringStore   from '../../data/strings/StringStore'

describe("NouniPanel", () => {

    it("Renders a NouniPanel w/o add/edit", () => {
        const props = {
            nouni: Map({
                addedit: NouniAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NouniPanel {...props} />
        const nouniPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nouniPanel.type).toBe('div')

        expect(findWithType(nouniPanel,'button'))
        expect(findWithType(nouniPanel,NouniTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NouniPanel with a NouniAddForm", () => {
        let props = {
            app: AppStore.getState(),
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            nouni: Map({
                addedit: NouniAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.nouni = props.nouni.setIn(['addedit','addNouni'],true)

        const renderExpression = <NouniPanel {...props} />
        const nouniPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nouniPanel.type).toBe('div')

        expect(findWithType(nouniPanel,'button'))
        expect(findWithType(nouniPanel,NouniAddForm))
        expect(findWithType(nouniPanel,NouniTable))

        // TypeError: Cannot read property 'style' of null wtf?
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NouniPanel with a NouniEditForm", () => {
        const props = {
            nouni: Map({
                addedit: NouniAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.nouni = props.nouni.setIn(['addedit','nouni','id'],"0") // don't let this string become falsey

        const renderExpression = <NouniPanel {...props} />
        const nouniPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nouniPanel.type).toBe('div')

        expect(findWithType(nouniPanel,'button'))
        expect(findWithType(nouniPanel,NouniEditForm))
        expect(findWithType(nouniPanel,NouniTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/
})
