import React from 'react'
import Select from 'react-select'

function NounDictionaryItemSelect(props) {

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ]

    return <Select options={options} placeholder="Select a noun..." onChange={props.onSelectedNounChanged}/>

}

export default NounDictionaryItemSelect
