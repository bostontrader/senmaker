import React from 'react'

function DefinitenessRadio(props) {

    return (
        <div>
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        name="definiteness"
                    />
                    Definite
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        name="definiteness"
                    />
                    Indefinite
                </label>
            </div>
        </div>
    )
}

export default DefinitenessRadio
