// @flow
import React from 'react'

import AdjectivdActions            from '../../../../data/dictionary/adjectivd/AdjectivdActions'
//import {AdjectivdPanelLevel}       from '../../../../data/dictionary/adjectivd/AdjectivdConstants'
import {validateAdjectivd}         from '../../../../data/Validator'

function AdjectivdAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => {
        const adjectivd:Object = props.adjectivd.getIn(['addedit','adjectivd'])
        validateAdjectivd(adjectivd)
        AdjectivdActions.onClickSaveAdjectivd(adjectivd)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Adjective</label>
            <input id='base' name='base' type='text'
                value={props.adjectivd.getIn(['addedit','adjectivd','base'])}
                onChange={(e)=>AdjectivdActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => AdjectivdActions.onClickDeleteAdjectivd(props.adjectivd.getIn(['addedit','adjectivd','id']))

    const buttonSave:Object   = <button id='save-adjectivd'   onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={AdjectivdActions.onClickCancel}>{s.cancel}</button>

    const theButtons:Object = (props.adjectivd.getIn(['addedit','adjectivd','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    let adjectivdAEForm:Object = <div></div>

    //switch(props.adjectivdPanelLevel) {
        //case AdjectivdPanelLevel.BASE:
            adjectivdAEForm =
                <div id='adjectivd-addedit-form' style={style}>
                    {baseControls}
                    {theButtons}
                </div>
            //break
        //case AdjectivdPanelLevel.PLURALIZATION:
            //adjectivdAEForm =
                /*<div id='adjectivd-addedit-form' style={style}>
                    {baseControls}
                    <PluralizationRuleSelect pluralization_rule={0}/>
                    <label htmlFor='plural'>Plural</label>
                    <input id='plural' name='plural' type='text'
                        value={props.adjectivd.getIn(['addedit','adjectivd','plural'])}
                        onChange={(e)=>AdjectivdActions.onChangePlural(e.target.value)}
                    />
                    {theButtons}
                </div>*/
            //break
        //default:
            // adjectivdAEForm already has a suitable default. Do nothing.

    //}

    return adjectivdAEForm

}

export default AdjectivdAEForm
