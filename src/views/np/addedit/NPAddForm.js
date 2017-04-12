import React from 'react'

import NPAEActions from '../../../data/np/addedit/NPAEActions'
//import {NPPanelLevel} from '../../../../data/dictionary/np/NPConstants'
//import PluralizationSelect from '../../../nouni/PluralizationSelect'

function NPAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => NPAEActions.onClickSaveNP({
        base: props.np.getIn(['addEditNP','np','base'])
    })
    const s = props.strings

    let npAddForm = null

    //if(props.level.getIn(['currentAppLevelConfig', 'npPanel']) >= NPPanelLevel.PLURALIZATION) {
        /*npAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>*/

    //} else if(props.level.getIn(['currentAppLevelConfig', 'npPanel']) >= NPPanelLevel.BASE) {
        npAddForm =
            <div id="np-add-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.np.getIn(['addEditNP','np','base'])}
                    onChange={(e)=>NPAEActions.onChangeBase(e.target.value)}
                />
                <button id='save-np' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={NPAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return npAddForm
}


export default NPAddForm
