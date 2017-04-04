import React from 'react'

import NoundAEActions    from '../../../data/dictionary/nound/addedit/NoundAEActions'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'

function NoundRow(props) {

    const {noun} = props;
    //const onClickEditNound = () => props.onClickEditNound(noun)
    const onClickEditNound = () => NoundAEActions.onClickEditNound(noun)
    //const onClickSave = () => props.nound.getIn(['onClickSaveNound'])({base: props.nound.getIn(['addEditNound','nound','base'])})

    let noundRow = <div>noun item</div>
    //if( props.level >= NoundPanelLevel.PLURALIZATION) {
        /*noundRow =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNound} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= NoundPanelLevel.BASE) {
        noundRow =
            <tr>
                <td>{noun.base}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNound} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (noundRow)

}

export default NoundRow
