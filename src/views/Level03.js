import React from 'react'

import LevelControl from './LevelControl'
import Noun from './noun/Noun'
import NounSelect from './dictionary/nouns/NounDictionaryItemSelect'
import {RadioGroup, Radio} from 'react-radio-group'

function Level03(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level03

    //const onChange = () => props.onSetQuizScore(!presentQuizState)
    //onChange={onChange}

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

            <Noun {...props} />

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
