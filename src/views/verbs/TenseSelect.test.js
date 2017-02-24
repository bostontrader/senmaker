import React from 'react'
import renderer from 'react-test-renderer'
import TenseSelect from './TenseSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <TenseSelect />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

