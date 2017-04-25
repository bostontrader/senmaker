// @flow
import React        from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import VerbdSelect     from '../../dictionary/verbd/VerbdSelect'
import syllabus        from '../../../data/Syllabus'
import {validateVerbd} from '../../../data/Validator'
import {validateVP}    from '../../../data/Validator'
import VPActions       from '../../../data/vp/VPActions'

function VPAddForm(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => {
        const vp = props.vp.getIn(['addedit','vp'])
        validateVP(vp)
        VPActions.onClickSaveVP(vp)
    }

    let theButtons = []
    if ( props.app.getIn(['level','currentLevel']) >= syllabus.verbPhrase.level)
        theButtons = [
            <button id='save-vp' key='1' onClick={onClickSave}>{s.save}</button>,
            <button id='cancel'  key='2' onClick={VPActions.onClickCancel}>{s.cancel}</button>
        ]

    // should be verbd because we want a select list of verbd!
    const selectOptions = props.verbd.getIn(['dict','coll']).toArray().map(function(verb) {
        return {value:verb.get('id'), label:verb.get('base')}
    })
    const selectedValue:string = props.vp.getIn(['addedit','vp','verbd','id'])

    const onChangeVerbd = (id) => { // id should be a number
        VPActions.onChangeSelectedVerbd(props.verbd.getIn(['dict','coll',id]))
    }

    return(
        <div style={style}>
            <VerbdSelect options={selectOptions} value={selectedValue} onChange={onChangeVerbd} />
            <RadioGroup name="actionTime" selectedValue={props.vp.getIn(['addedit','vp','actionTime']).toString()} onChange={(e)=>{VPActions.onChangeActionTime(e)}}>
                <Radio value="100" />Past
                <Radio value="200" />Present
                <Radio value="300" />Future
            </RadioGroup>
            <p id="generatedText">{props.vp.getIn(['addedit','vp','generatedText'])}</p>
            {theButtons}
        </div>
    )

}

export default VPAddForm
