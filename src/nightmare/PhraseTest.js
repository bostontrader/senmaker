var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const PhraseTest = (nightmare, delay) => {

    return nightmare

        .then( res => {return NTU.lookFor(nightmare, '#cheat', false)})
        .then( res => {return nightmare.click('#iunderstandCheckbox').wait(delay)})
        .then( res => {return NTU.lookFor(nightmare, '#iunderstandCheckmark', true)})

}

module.exports = PhraseTest
