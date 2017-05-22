// @flow
import React from 'react'

import PluralizationRuleSelect from './PluralizationRuleSelect'
import NoundActions            from '../../../../data/dictionary/nound/NoundActions'
import {NoundPanelLevel}       from '../../../../data/dictionary/nound/NoundConstants'
import {validateNound}         from '../../../../data/Validator'

function NoundAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const nound:Object = props.nound.getIn(['addedit','nound'])
        validateNound(nound)
        NoundActions.onClickSaveNound(nound)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Noun</label>
            <input id='base' name='base' type='text'
                   value={props.nound.getIn(['addedit','nound','base'])}
                   onChange={(e)=>NoundActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => NoundActions.onClickDeleteNound(props.nound.getIn(['addedit','nound','id']))

    const buttonSave:Object   = <button id='save-nound'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-nound' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={NoundActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.nound.getIn(['addedit','addNound'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    let noundAEForm:Object = <div></div>

    switch(props.noundPanelLevel) {
        case NoundPanelLevel.BASE:
            noundAEForm =
                <div id='nound-addedit-form' style={style}>
                    {baseControls}
                    {theButtons}
                </div>
            break
        case NoundPanelLevel.PLURALIZATION:
            noundAEForm =
                <div id='nound-addedit-form' style={style}>
                    {baseControls}
                    <PluralizationRuleSelect pluralization_rule={0}/>
                    <label htmlFor='plural'>Plural</label>
                    <input id='plural' name='plural' type='text'
                        value={props.nound.getIn(['addedit','nound','plural'])}
                        onChange={(e)=>NoundActions.onChangePlural(e.target.value)}
                    />
                    {theButtons}
                </div>
            break
        default:
            // noundAEForm already has a suitable default. Do nothing.

    }

    return noundAEForm

}

export default NoundAEForm
