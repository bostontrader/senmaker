var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const IntroTest = (nightmare, delay) => {

    return nightmare

        .then( res => {return NTU.lookFor(nightmare, '#cheat', false)})
        .then( res => {return nightmare.click('#iunderstandCheckbox').wait(delay)})

        // clicking the above checkbox passes the quiz and makes the quizbox go away
        .then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

}

module.exports = IntroTest
