var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const IntroTest = (nightmare, delay) => {

    return nightmare

        .then( res => {return NTU.lookFor(nightmare, '#examples', false)})
        .then( res => {return nightmare.click('#iunderstandCheckbox').wait(delay)})

        .then( res => {return NTU.lookFor(nightmare, '#iunderstandCheckmark', true)})
        //.then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

}

module.exports = IntroTest
