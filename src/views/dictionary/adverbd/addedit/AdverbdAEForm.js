// @flow
import React from 'react'

import AdverbdActions    from '../../../../data/dictionary/adverbd/AdverbdActions'
import {validateAdverbd} from '../../../../data/Validator'

function AdverbdAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const adverbd:Object = props.adverbd.getIn(['addedit','adverbd'])
        validateAdverbd(adverbd)
        AdverbdActions.onClickSaveAdverbd(adverbd)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Adverb</label>
            <input id='base' name='base' type='text'
                value={props.adverbd.getIn(['addedit','adverbd','base'])}
                onChange={(e)=>AdverbdActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => AdverbdActions.onClickDeleteAdverbd(props.adverbd.getIn(['addedit','adverbd','id']))

    const buttonSave:Object   = <button id='save-adverbd'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-adverbd' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={AdverbdActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.adverbd.getIn(['addedit','adverbd','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    let adverbdAEForm:Object = <div></div>

    adverbdAEForm =
        <div id='adverbd-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>

    return adverbdAEForm

}

export default AdverbdAEForm
