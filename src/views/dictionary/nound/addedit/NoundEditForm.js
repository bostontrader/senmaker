// @flow
import React from 'react'

import NoundActions from '../../../../data/dictionary/nound/NoundActions'
//import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
//import PluralizationRuleSelect from './PluralizationRuleSelect'

function NoundEditForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => NoundActions.onClickSaveNound({
        id: props.nound.getIn(['addedit','nound','id']),
        base: props.nound.getIn(['addedit','nound','base']),
        //plural: props.nound.getIn(['addedit','nound','plural'])
    })
    const onDelete:Function = () => NoundActions.onClickDeleteNound(props.nound.getIn(['addedit','nound','id']))

    let noundEditForm:Object

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
        noundEditForm =
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

    return noundEditForm

}

export default NoundEditForm
