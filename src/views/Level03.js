import React from 'react'

import DefinitenessRadio from './nouns/DefinitenessRadio'
import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'
import NounSelect from './nouns/NounSelect'

function Level03(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level03

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

            <div style={style}>
                <DefinitenessRadio {...props} />
                <NounSelect {...props} />
                <p>Catfood is good</p>
            </div>

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
