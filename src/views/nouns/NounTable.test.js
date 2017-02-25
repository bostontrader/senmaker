import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import NounTable from './NounTable'

it('renders correctly', () => {

    const nouns = [
        {base: 'cat', plural: 'cats', pluralization_rule: 0}
    ]

    const tree = renderer.create(
        <NounTable {...nouns} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('the html is ok', () => {

    const nouns = [
        {base: 'cat', plural: 'cats', pluralization_rule: 0}
    ]

    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<NounTable {...nouns}  />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('table')
})

