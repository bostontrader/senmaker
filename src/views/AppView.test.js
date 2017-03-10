import {OrderedMap} from 'immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

//import AppStore from '../data/AppStore'
import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'
import {NounPanelLevel} from '../data/nouns/NounConstants'
import StringStore from '../data/StringStore'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

it('renders level00 correctly', () => {

    const props = {level:{currentAppLevel:{app: 0}, minLevel:true, maxLevel:false, quiz:false}, strings:StringStore.getInitialState()}

    const tree = rtRenderer.create(
        <Level00 {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const rtuRenderer = ReactTestUtils.createRenderer();
    rtuRenderer.render(<Level00 {...props} />);
    const result = rtuRenderer.getRenderOutput();

    expect(result.type).toBe('div')

})

it('renders level01 correctly', () => {

    const props = {level:{currentAppLevel:{app: 1, nounPanel:NounPanelLevel.BASE}, minLevel:false, maxLevel:false, quiz:false}, editingNoun:{id:'', add:''}, nouns:OrderedMap()}


    const tree = rtRenderer.create(
        <Level01 {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const rtuRenderer = ReactTestUtils.createRenderer();
    rtuRenderer.render(<Level01 {...props} />);
    const result = rtuRenderer.getRenderOutput();

    expect(result.type).toBe('div')

})

it('renders level02 correctly', () => {

    const props = {level:{currentAppLevel:{app: 2, verbPanel:VerbPanelLevel.BASE}, minLevel:false, maxLevel:false, quiz:false}, editingVerb:{id:'', add:''}, verbs:OrderedMap()}

    const tree = rtRenderer.create(
        <Level02 {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const rtuRenderer = ReactTestUtils.createRenderer();
    rtuRenderer.render(<Level02 {...props} />);
    const result = rtuRenderer.getRenderOutput();

    expect(result.type).toBe('div')

})
