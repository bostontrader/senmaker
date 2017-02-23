import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import NounTable from './NounTable'

it('renders correctly', () => {
    const tree = renderer.create(
        <NounTable  />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('the html is ok', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<NounTable  />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('table')
})

