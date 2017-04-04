import React from 'react'

import VerbdAEActions from '../../../../data/dictionary/verbd/addedit/VerbdAEActions'
import PastTenseRuleSelect from '../PastTenseRuleSelect'
import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'

function VerbdAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => VerbdAEActions.onClickSaveVerbd({base: props.verbd.getIn(['addEditVerbd','verbd','base'])})
    const s = props.strings

    let verbdAddForm = null
    
    /*if(props.level.getIn(['currentAppLevelConfig', 'verbdPanel']) >= VerbdPanelLevel.PAST_TENSE) {
        verbdAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PastTenseRuleSelect pastTense_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>

    } else if(props.level.getIn(['currentAppLevelConfig', 'verbdPanel']) >= VerbdPanelLevel.BASE) {*/
        verbdAddForm =
            <div id="verbd-add-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.verbd.getIn(['addEditVerbd','verbd','base'])} onChange={(e)=>props.verbd.getIn(['onChangeVerbdBase'])(e.target.value)} />
                <button id='save-verbd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={VerbdAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return verbdAddForm

}

export default VerbdAddForm
