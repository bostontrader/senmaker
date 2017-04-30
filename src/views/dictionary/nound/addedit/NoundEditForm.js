// @flow
import React from 'react'

import PluralizationRuleSelect from './PluralizationRuleSelect'
import NoundActions            from '../../../../data/dictionary/nound/NoundActions'
import {NoundPanelLevel}       from '../../../../data/dictionary/nound/NoundConstants'
import {validateNound}         from '../../../../data/Validator'

function NoundEditForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => {
        const nound:Object = props.nound.getIn(['addedit','nound'])
        validateNound(nound)
        NoundActions.onClickSaveNound(nound)
    }

    const onDelete:Function = () => NoundActions.onClickDeleteNound(props.nound.getIn(['addedit','nound','id']))

    const buttonSave:Object   = <button id='save-nound' onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'     onClick={NoundActions.onClickCancel}>{s.cancel}</button>

    const theButtons:Object = (props.nound.getIn(['addedit','nound','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    let noundEditForm:Object = <div></div>

    switch(props.noundPanelLevel) {
        case NoundPanelLevel.BASE:
            noundEditForm =
                <div id='nound-add-form' style={style}>
                    <label htmlFor='base'>Base Noun</label>
                    <input id='base' name='base' type='text'
                        value={props.nound.getIn(['addedit','nound','base'])}
                        onChange={(e)=>NoundActions.onChangeBase(e.target.value)}
                    />
                    <button id='save-nound' onClick={onClickSave}>{s.save}</button>
                    <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                    <button id='cancel'     onClick={NoundActions.onClickCancel}>{s.cancel}</button>
                </div>
            break
        case NoundPanelLevel.PLURALIZATION:
            noundEditForm =
                <div id='nound-add-form' style={style}>
                    <label htmlFor='base'>Base Noun</label>
                    <input id='base' name='base' type='text'
                        value={props.nound.getIn(['addedit','nound','base'])}
                        onChange={(e)=>NoundActions.onChangeBase(e.target.value)}
                    />
                    <PluralizationRuleSelect pluralization_rule={0}/>
                    <label htmlFor='plural'>Plural</label>
                    <input id='plural' name='plural' type='text'
                        value={props.nound.getIn(['addedit','nound','plural'])}
                        onChange={(e)=>NoundActions.onChangePlural(e.target.value)}
                    />
                    <button id='save-nound' onClick={onClickSave}>{s.save}</button>
                    <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                    <button id='cancel'     onClick={NoundActions.onClickCancel}>{s.cancel}</button>
                </div>
            break
        default:
            // noundEditForm already has a suitable default. Do nothing.

    }

    return noundEditForm


    //if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.PLURALIZATION) {
        /*noundEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.nound.getIn(['addedit','noun','base'])} onChange={(e)=>props.nound.getIn(['onChangeNounBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-nound' type='submit' value={s.save}/>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.BASE) {
        /*noundEditForm =
            <div id="nound-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.nound.getIn(['addedit','nound','base'])}
                    onChange={(e)=>NoundActions.onChangeBase(e.target.value)}
                />
                <button id='save-nound'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={NoundActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return noundEditForm*/

}

export default NoundEditForm
