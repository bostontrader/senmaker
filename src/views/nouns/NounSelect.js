import React from 'react'
import Select from 'react-select'

function NounSelect(props) {

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ]

    return <Select options={options} placeholder="Select a noun..."/>

}

export default NounSelect
