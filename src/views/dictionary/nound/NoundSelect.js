import React from 'react'
import Select from 'react-select'

function NoundSelect(props) {

    const options = props.nound.getIn(['nouns']).toArray().map(function(noun) {
        return {value:noun.get('id'), label:noun.get('base')}
    })

    const selectedValue = props.nound.getIn(['selectedNounId'])

    return <Select options={options} value={selectedValue} placeholder="Select a noun..." onChange={(e)=>{ props.nound.getIn(['onChangeSelectedNoun'])(e)}}/>

}

export default NoundSelect
