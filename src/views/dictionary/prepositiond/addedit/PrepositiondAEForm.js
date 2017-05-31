// @flow
import React from 'react'

import PrepositiondActions            from '../../../../data/dictionary/prepositiond/PrepositiondActions'
import {validatePrepositiond}         from '../../../../data/Validator'

function PrepositiondAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const prepositiond:Object = props.prepositiond.getIn(['addedit','prepositiond'])
        validatePrepositiond(prepositiond)
        PrepositiondActions.onClickSavePrepositiond(prepositiond)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Adjective</label>
            <input id='base' name='base' type='text'
                value={props.prepositiond.getIn(['addedit','prepositiond','base'])}
                onChange={(e)=>PrepositiondActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => PrepositiondActions.onClickDeletePrepositiond(props.prepositiond.getIn(['addedit','prepositiond','id']))

    const buttonSave:Object   = <button id='save-prepositiond'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-prepositiond' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'       onClick={PrepositiondActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.prepositiond.getIn(['addedit','prepositiond','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    return(
        <div id='prepositiond-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>
    )

}

export default PrepositiondAEForm
