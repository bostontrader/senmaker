import React from 'react'
import renderer from 'react-test-renderer'
import PluralizationSelect from './PluralizationSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <PluralizationSelect />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

