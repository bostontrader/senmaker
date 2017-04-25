// @flow
import React        from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import VerbdSelect  from '../../dictionary/verbd/VerbdSelect'
import VPActions    from '../../../data/vp/VPActions'

function VPEditForm(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => VPActions.onClickSaveVP(
        props.vp.getIn(['addedit','vp'])
    )

    const onDelete = () => VPActions.onClickDeleteVP(props.vp.getIn(['addedit','vp','id']))

    // should be verbd because we want a select list of verbd!
    const selectOptions = props.verbd.getIn(['dict','coll']).toArray().map(function(verb) {
        return {value:verb.get('id'), label:verb.get('base')}
    })
    const selectedValue = props.vp.getIn(['addedit','vp','verbd','id']).toString()

    const onChange = (id) => {
        VPActions.onChangeSelectedVerbd(props.verbd.getIn(['dict','coll',parseInt(id)]))
    }
    return(
        <div style={style}>
            <VerbdSelect options={selectOptions} value={selectedValue} onChange={onChange} />
            <RadioGroup name="actionTime" selectedValue={props.vp.getIn(['addedit','vp','actionTime']).toString()} onChange={(e)=>{VPActions.onChangeActionTime(e)}}>
                <Radio value="100" />Past
                <Radio value="200" />Present
                <Radio value="300" />Future
            </RadioGroup>
            <p id="generatedText">{props.vp.getIn(['addedit','vp','generatedText'])}</p>
            <button id='save-vp'   onClick={onClickSave}>{s.save}</button>
            <button id='delete-vp' onClick={onDelete}>{s.delete}</button>
            <button id='cancel'    onClick={VPActions.onClickCancel}>{s.cancel}</button>
        </div>
    )
}

export default VPEditForm
