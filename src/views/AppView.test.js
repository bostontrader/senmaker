import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'

it('renders level00 correctly', () => {

    const props = {'level':0}

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

    const props = {
        'level':1,
        'editingNoun': {},
        'nouns':[]
    }

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

    const props = {
        'level':2,
        'editingVerb': {},
        'verbs':[]
    }

    const tree = rtRenderer.create(
        <Level02 {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    const rtuRenderer = ReactTestUtils.createRenderer();
    rtuRenderer.render(<Level02 {...props} />);
    const result = rtuRenderer.getRenderOutput();

    expect(result.type).toBe('div')

})
