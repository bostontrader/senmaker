// @flow
import React from 'react'

import VerbdActions from '../../../../data/dictionary/verbd/VerbdActions'
import {validateVerbd} from '../../../../data/Validator'

//import PastTenseRuleSelect from '../PastTenseRuleSelect'

function VerbdAddForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings
    
    const onClickSave:Function = () => {
        const verbd:Object = props.verbd.getIn(['addedit','verbd'])
        validateVerbd(verbd)
        VerbdActions.onClickSaveVerbd(verbd)
    }

    let verbdAddForm:Object

    /*if(props.app.getIn(['level','currentLevel'])) {
        verbdAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                       value={props.verbd.getIn(['addedit','verbd','base'])}
                       onChange={(e)=>VerbdActions.onChangeBase(e.target.value)}
                />
                <label htmlFor='pastTense'>Past Tense</label>
                <input id='pastTense' name='pastTense' type='text'
                       value={props.verbd.getIn(['addedit','verbd','pastTense'])}
                       onChange={(e)=>VerbdActions.onChangePastTense(e.target.value)}
                />
                <PastTenseRuleSelect pastTense_rule={0}/>

                <button id='save-verbd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={VerbdActions.onClickCancel}>{s.cancel}</button>
            </div>

    } else {*/
        verbdAddForm =
            <div id='verbd-add-form' style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.verbd.getIn(['addedit','verbd','base'])}
                    onChange={(e)=>VerbdActions.onChangeBase(e.target.value)}
                />
                <button id='save-verbd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={VerbdActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return verbdAddForm
}

export default VerbdAddForm
