import React  from 'react'
import Select from 'react-select'

function NoundSelect(props) {

    const options = props.nound.getIn(['nouns']).toArray().map(function(noun) {
        return {value:noun.get('id'), label:noun.get('base')}
    })

    const selectedValue = props.mostRecentlySelectedNound.getIn(['id'])
    return <Select options={options} value={selectedValue} placeholder="Select a noun..." onChange={(e)=>{
        const nound = props.nound.getIn(['nouns']).get(e.value)
        props.nound.getIn(['onChangeSelectedNound'])(nound)
    }}/>

}

export default NoundSelect
