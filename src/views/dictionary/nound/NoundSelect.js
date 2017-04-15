import React  from 'react'
import Select from 'react-select'
import NoundActions from '../../../data/dictionary/nound/NoundActions'

function NoundSelect(props) {

    const options = props.nound.getIn(['nouns']).toArray().map(function(noun) {
        return {value:noun.get('id'), label:noun.get('base')}
    })
    console.log('NoundSelect options=',options)
    const selectedValue = props.app.getIn(['mostRecentlySelectedNound','id'])
    return <Select options={options} value={selectedValue} placeholder="Select a noun..." onChange={(e)=>{
        console.log('changed')
        console.log('NoundSelect props.nound.nouns=',props.nound.get('nouns'))
        console.log('e.value',e.value)
        const nound = props.nound.getIn(['nouns']).get( "" + e.value) // ugly hack. integer to string
        console.log('NoundSelect nound=',nound)
        NoundActions.onChangeSelectedNound(nound)
    }}/>

}

export default NoundSelect
