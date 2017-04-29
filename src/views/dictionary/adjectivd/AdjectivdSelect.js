// @flow
import React  from 'react'
import Select from 'react-select'

function AdjectivdSelect(props:Object) {
    return <Select options={props.options} value={props.value} placeholder="Select an adjective..." onChange={(e)=>{props.onChange(e.value)}}/>
}

export default AdjectivdSelect

/*import React  from 'react'
import Select from 'react-select'
import AdjectivdActions from '../../../data/dictionary/adjectivd/AdjectivdActions'

function AdjectivdSelect(props) {

    const options = props.adjectivd.getIn(['adjectivs']).toArray().map(function(adjectiv) {
        return {value:adjectiv.get('id'), label:adjectiv.get('base')}
    })

    const selectedValue = props.app.getIn(['mostRecentlySelectedAdjectivd','id'])
    return <Select options={options} value={selectedValue} placeholder="Select a adjectiv..." onChange={(e)=>{
        console.log('changed')
        const adjectivd = props.adjectivd.getIn(['adjectivs']).get(e.value)
        AdjectivdActions.onChangeSelectedAdjectivd(adjectivd)
    }}/>

}

export default AdjectivdSelect
*/