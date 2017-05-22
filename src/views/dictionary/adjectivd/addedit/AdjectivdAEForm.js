// @flow
import React from 'react'

import AdjectivdActions            from '../../../../data/dictionary/adjectivd/AdjectivdActions'
import {validateAdjectivd}         from '../../../../data/Validator'

function AdjectivdAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

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

    const buttonSave:Object   = <button id='save-adjectivd'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-adjectivd' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={AdjectivdActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.adjectivd.getIn(['addedit','adjectivd','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    let adjectivdAEForm:Object = <div></div>

    adjectivdAEForm =
        <div id='adjectivd-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>

    return adjectivdAEForm

}

export default AdjectivdAEForm
