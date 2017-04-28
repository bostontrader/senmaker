// @flow
import React from 'react'

import NPSelect         from '../../np/NPSelect'
import VPSelect         from '../../vp/VPSelect'
import {validateClause} from '../../../data/Validator'
import ClauseActions    from '../../../data/clause/ClauseActions'

function ClauseAddForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }
    const s:Object = props.strings

    const onClickSaveClause = () => {
        const clause = props.clause.getIn(['addedit','clause'])
        validateClause(clause)
        ClauseActions.onClickSaveClause(clause)
    }

    let theButtons = []
    //if ( props.app.getIn(['level','currentLevel']) >= syllabus.verbPhrase.level)
        theButtons = [
            <button id='save-clause' key='1' onClick={onClickSaveClause}>{s.save}</button>,
            <button id='cancel'      key='2' onClick={ClauseActions.onClickCancel}>{s.cancel}</button>
        ]

    const npSelectOptions = props.np.getIn(['dict','coll']).toArray().map(function(np) {
        return {value:np.get('id'), label:np.get('generatedText')}
    })

    const vpSelectOptions = props.vp.getIn(['dict','coll']).toArray().map(function(vp) {
        return {value:vp.get('id'), label:vp.get('generatedText')}
    })

    const npSelected:string = props.clause.getIn(['addedit','clause','np','id'])
    const vpSelected:string = props.clause.getIn(['addedit','clause','vp','id'])

    const onChangeNP = (id) => {ClauseActions.onChangeSelectedNP(props.np.getIn(['dict','coll',id]))}
    const onChangeVP = (id) => {ClauseActions.onChangeSelectedVP(props.vp.getIn(['dict','coll',id]))}

    return(
        <div style={style}>
            <NPSelect options={npSelectOptions} value={npSelected} onChange={onChangeNP} />
            <VPSelect options={vpSelectOptions} value={vpSelected} onChange={onChangeVP} />
            <p id="generatedText">{props.clause.getIn(['addedit','clause','generatedText'])}</p>
            {theButtons}
        </div>
    )

}

export default ClauseAddForm
