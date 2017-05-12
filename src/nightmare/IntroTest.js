var Nightmare = require('nightmare')

const IntroTest = (nightmare, delay) => {

    return nightmare

        // Now answer the intro lesson question. Can I see the checkmark?
        .then( res => {
            return nightmare
                .click('#iunderstandCheckbox').wait(delay)
                .evaluate(function () {
                    return document.querySelector('#iunderstandCheckmark') !== null
                })
        })

        .then( iunderstandCheckmark => {
            if (!iunderstandCheckmark)
                throw('iunderstandCheckmark was not found')
        })

}

module.exports = IntroTest
