// @flow
import React from 'react'

import NoundActions    from '../../../../data/dictionary/nound/NoundActions'
import {validateNound} from '../../../../data/Validator'

//import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
//import PluralizationSelect from '../../../nouni/PluralizationSelect'

function NoundAddForm(props:Object):Object {

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

    let noundAddForm:Object

    //if(props.level.getIn(['currentAppLevelConfig', 'noundPanel']) >= NoundPanelLevel.PLURALIZATION) {
        /*noundAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>*/

    //} else if(props.level.getIn(['currentAppLevelConfig', 'noundPanel']) >= NoundPanelLevel.BASE) {
        noundAddForm =
            <div id='nound-add-form' style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.nound.getIn(['addedit','nound','base'])}
                    onChange={(e)=>NoundActions.onChangeBase(e.target.value)}
                />
                <button id='save-nound' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={NoundActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return noundAddForm
}

export default NoundAddForm
