// @flow
import React from 'react'

import PastFormRuleSelect from './PastFormRuleSelect'
import {validateVerbd}    from '../../../../data/Validator'
import VerbdActions       from '../../../../data/dictionary/verbd/VerbdActions'
import {VerbdPanelLevel}  from '../../../../data/dictionary/verbd/VerbdConstants'

function VerbdAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => {
        const verbd:Object = props.verbd.getIn(['addedit','verbd'])
        validateVerbd(verbd)
        VerbdActions.onClickSaveVerbd(verbd)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Base Form</label>
            <input id='base' name='base' type='text'
                   value={props.verbd.getIn(['addedit','verbd','base'])}
                   onChange={(e)=>VerbdActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => VerbdActions.onClickDeleteVerbd(props.verbd.getIn(['addedit','verbd','id']))

    const buttonSave:Object   = <button id='save-verbd'   onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-verbd' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={VerbdActions.onClickCancel}>{s.cancel}</button>

    const theButtons:Object = (props.verbd.getIn(['addedit','addVerbd'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    let verbdAEForm:Object = <div></div>

    switch(props.verbdPanelLevel) {
        case VerbdPanelLevel.BASE:
            verbdAEForm =
                <div id="verbd-addedit-form" style={style}>
                    {baseControls}
                    {theButtons}
                </div>
            break
        case VerbdPanelLevel.PAST_FORM:
            verbdAEForm =
                <div id="verbd-addedit-form" style={style}>
                    {baseControls}
                    <PastFormRuleSelect />
                    <label htmlFor='pastForm'>Past Form</label>
                    <input id='pastForm' name='pastForm' type='text'
                           value={props.verbd.getIn(['addedit','verbd','pastForm'])}
                           onChange={(e)=>VerbdActions.onChangePastForm(e.target.value)}
                    />
                    {theButtons}
                </div>
            break
        case VerbdPanelLevel.MAX:
            verbdAEForm =
                <div id="verbd-addedit-form" style={style}>
                    {baseControls}
                    <PastFormRuleSelect />
                    <label htmlFor='pastForm'>Past Form</label>
                    <input id='pastForm' name='pastForm' type='text'
                           value={props.verbd.getIn(['addedit','verbd','pastForm'])}
                           onChange={(e)=>VerbdActions.onChangePastForm(e.target.value)}
                    />
                    {theButtons}
                </div>
            break
        default:
            // verbdAEForm already has a suitable default. Do nothing.

    }

    return verbdAEForm

}

export default VerbdAEForm
