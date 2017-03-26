import React from 'react'

import AppActions from '../data/AppActions'
import LevelControl from './LevelControl'
import NouniAddForm from './nouni/addedit/NouniAddForm'

function Level03(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level03

    // if existing nouni, read it, else
    // make new nouni
    //AppActions.insertNouni({
        //ui:false,
        //noun:{base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s}
        //noun: {},
        //definiteness:''
    //})
    //props.onAddNoun}>{s.add_new} {s.noun}</button> opens the UI

    return(
        <div>
            <div className="help" style={style}>
                <h1>Definite or Indefinite</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
                <p>{s.help14}</p>
                <p>{s.help15}</p>
            </div>

            <NouniAddForm {...props} />

            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <p>{s.quiz1}</p>
                <p>{s.quiz2}</p>
                <p>{s.quiz3}</p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level03
