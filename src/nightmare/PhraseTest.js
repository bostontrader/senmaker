var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const PhraseTest = (nightmare, delay) => {

    return nightmare

        .then( res => {return NTU.lookFor(nightmare, '#cheat', false)})
        .then( res => {return nightmare.click('#iunderstandCheckbox').wait(delay)})

        // Clicking the above checkbox passes the quiz and makes the quizbox go away
        //.then( res => {return NTU.lookFor(nightmare, '#iunderstandCheckmark', true)})
        .then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

}

module.exports = PhraseTest
