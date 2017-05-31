// @flow
import React from 'react'

import ConjunctiondActions    from '../../../../data/dictionary/conjunctiond/ConjunctiondActions'
import {validateConjunctiond} from '../../../../data/Validator'

function ConjunctiondAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const conjunctiond:Object = props.conjunctiond.getIn(['addedit','conjunctiond'])
        validateConjunctiond(conjunctiond)
        ConjunctiondActions.onClickSaveConjunctiond(conjunctiond)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Conjunction</label>
            <input id='base' name='base' type='text'
                value={props.conjunctiond.getIn(['addedit','conjunctiond','base'])}
                onChange={(e)=>ConjunctiondActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => ConjunctiondActions.onClickDeleteConjunctiond(props.conjunctiond.getIn(['addedit','conjunctiond','id']))

    const buttonSave:Object   = <button id='save-conjunctiond'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-conjunctiond' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'              onClick={ConjunctiondActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.conjunctiond.getIn(['addedit','addConjunctiond'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    return(
        <div id='conjunctiond-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>
    )

}

export default ConjunctiondAEForm
