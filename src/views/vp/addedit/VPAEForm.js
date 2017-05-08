// @flow
import React        from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import VerbdSelect     from '../../dictionary/verbd/VerbdSelect'
import syllabus        from '../../../data/Syllabus'
import {validateVerbd} from '../../../data/Validator'
import {validateVP}    from '../../../data/Validator'
import VPActions       from '../../../data/vp/VPActions'
import {VPPanelLevel}  from '../../../data/vp/VPConstants'

function VPAEForm(props:Object):?Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => {
        const vp:Object = props.vp.getIn(['addedit','vp'])
        validateVP(vp)
        VPActions.onClickSaveVP(vp)
    }

    const onDelete:Function = () => VPActions.onClickDeleteVP(props.vp.getIn(['addedit','vp','id']))

    const buttonSave:Object   = <button id='save-vp'   onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-vp' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'    onClick={VPActions.onClickCancel}>{s.cancel}</button>

    // add mode or edit mode?
    const theButtons:Object = (props.vp.getIn(['addedit','vp','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    // should be verbd because we want a select list of verbd!
    const availableVerbds = props.verbd.getIn(['dict','coll']).toArray().map(function(verb) {
        return {value:verb.get('id'), label:verb.get('base')}
    })
    const selectedVerbd:string = props.vp.getIn(['addedit','vp','verbd','id'])

    const onChangeVerbd = (id) => {VPActions.onChangeSelectedVerbd(props.verbd.getIn(['dict','coll',id]))}

    let vpAEForm:?Object = null

    switch(props.vpPanelLevel) {

        case VPPanelLevel.BASE:
            vpAEForm =
                <div style={style}>
                    <VerbdSelect options={availableVerbds} value={selectedVerbd} onChange={onChangeVerbd} />
                    <RadioGroup name="actionTime" selectedValue={props.vp.getIn(['addedit','vp','actionTime']).toString()} onChange={(e)=>{VPActions.onChangeActionTime(e)}}>
                        <Radio value="100" />Past
                        <Radio value="200" />Present
                    </RadioGroup>
                    <p id="generatedText">{props.vp.getIn(['addedit','vp','generatedText'])}</p>
                    {theButtons}
                </div>
            break

        case VPPanelLevel.PAST_FORM:
            vpAEForm =
                <div style={style}>
                    <VerbdSelect options={availableVerbds} value={selectedVerbd} onChange={onChangeVerbd} />
                    <RadioGroup name="actionTime" selectedValue={props.vp.getIn(['addedit','vp','actionTime']).toString()} onChange={(e)=>{VPActions.onChangeActionTime(e)}}>
                        <Radio value="100" />Past
                        <Radio value="200" />Present
                    </RadioGroup>
                    <p id="generatedText">{props.vp.getIn(['addedit','vp','generatedText'])}</p>
                    {theButtons}
                </div>
            break

        case VPPanelLevel.MAX:
            vpAEForm =
                <div style={style}>
                    <VerbdSelect options={availableVerbds} value={selectedVerbd} onChange={onChangeVerbd} />
                    <RadioGroup name="actionTime" selectedValue={props.vp.getIn(['addedit','vp','actionTime']).toString()} onChange={(e)=>{VPActions.onChangeActionTime(e)}}>
                        <Radio value="100" />Past
                        <Radio value="200" />Present
                        <Radio value="300" />Future
                    </RadioGroup>
                    <p id="generatedText">{props.vp.getIn(['addedit','vp','generatedText'])}</p>
                    {theButtons}
                </div>
            break
        default:
            // vpAEForm already has a suitable default. Do nothing.

    }

    return vpAEForm

}

export default VPAEForm
