import React from 'react'

import AdjectivdRow from './AdjectivdRow'

function AdjectivdTable(props) {

    let adjectivdTable = null
    //const level = props.level.getIn(['currentAppLevelConfig','adjectivdPanel'])
    /*if( level >= AdjectivdPanelLevel.PLURALIZATION) {
        adjectivdTable =
            <table id="adjectivd-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.adjectivs.values()].reverse().map(adjectiv => (
                        <AdjectivdRow
                            key={adjectiv.id}
                            editing={props.editingAdjectiv}
                            level={level}
                            adjectiv={adjectiv}
                            onDeleteAdjectiv={props.onDeleteAdjectiv}
                            onClickEditAdjectivd={props.onClickEditAdjectivd}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= AdjectivdPanelLevel.BASE) {*/
        adjectivdTable =
            <table id="adjectivd-list">
                <thead>
                    <tr>
                        <th>Adjectiv</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.adjectivd.getIn(['adjectivs']).values()].map(adjectiv => (
                        <AdjectivdRow key={adjectiv.id} adjectiv={adjectiv} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(adjectivdTable)
}

export default AdjectivdTable
