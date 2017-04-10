import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

//import AppStore from '../../../data/app/AppStore'
import AdjectivdPanel    from './AdjectivdPanel'
import AdjectivdTable    from './AdjectivdTable'
import AdjectivdAddForm  from './addedit/AdjectivdAddForm'
import AdjectivdEditForm from './addedit/AdjectivdEditForm'
import AdjectivdAEStore  from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore       from '../../../data/strings/StringStore'

describe("AdjectivdPanel", () => {

    it("Renders a AdjectivdPanel w/o add/edit", () => {
        const props = {
            adjectivd: Map({
                addEditAdjectivd: AdjectivdAEStore.getInitialState(),
                adjectivs: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <AdjectivdPanel {...props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with a AdjectivdAddForm", () => {
        let props = {
            adjectivd: Map({
                addEditAdjectivd: AdjectivdAEStore.getInitialState(),
                adjectivs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.adjectivd = props.adjectivd.setIn(['addEditAdjectivd','addAdjectivd'],true)

        const renderExpression = <AdjectivdPanel {...props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdAddForm))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a AdjectivdPanel with a AdjectivdEditForm", () => {
        const props = {
            adjectivd: Map({
                addEditAdjectivd: AdjectivdAEStore.getInitialState(),
                adjectivs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.adjectivd = props.adjectivd.setIn(['addEditAdjectivd','adjectivd','id'],"0") // don't let this string become falsey

        const renderExpression = <AdjectivdPanel {...props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdEditForm))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
