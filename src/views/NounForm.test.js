import React from 'react'
import renderer from 'react-test-renderer'
import NounForm from './NounForm'

it('renders correctly', () => {
    const tree = renderer.create(
        <NounForm editing={{base: ""}} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
