import React from 'react'

import AdjectivdAEActions from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEActions'

function AdjectivdAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => AdjectivdAEActions.onClickSaveAdjectivd({base: props.adjectivd.getIn(['addEditAdjectivd','adjectivd','base'])})
    const s = props.strings

    let adjectivdAddForm = null

    //if(props.level.getIn(['currentAppLevelConfig', 'adjectivdPanel']) >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelAdjectiv}>{s.cancel}</button>
            </div>*/

    //} else if(props.level.getIn(['currentAppLevelConfig', 'adjectivdPanel']) >= AdjectivdPanelLevel.BASE) {
        adjectivdAddForm =
            <div id="adjectivd-add-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.adjectivd.getIn(['addEditAdjectivd','adjectivd','base'])} onChange={(e)=>AdjectivdAEActions.onChangeBase(e.target.value)} />
                <button id='save-adjectivd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={AdjectivdAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return adjectivdAddForm
}

export default AdjectivdAddForm
