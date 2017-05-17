var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const DefinitenessTest = (nightmare, delay) => {

    return nightmare

        // Change the selected noun and look for the changeNoundCheckmark
        .type('.Select-control input','carrot\u000d').wait(delay)
        .then( res => {return NTU.lookFor(nightmare, '#changeNoundCheck', true)})

        // Change the definiteness and look for the changeDefinitenessCheckmark
        .then( res => {return nightmare.click('#definite').wait(delay)})
        .then( res => {return NTU.lookFor(nightmare, '#changeDefinitenessCheck', true)})

        // Can you see that the article has changed?
        .then( res => {return nightmare.click('#iseeArticleChanged').wait(delay)})

        // Clicking the above checkbox passes the quiz and makes the quizbox go away
        // .then( res => {return NTU.lookFor(nightmare, '#iseeArticleChangedCheck', true)})
        .then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

        // Can I see the cheat button?
        .then( res => {return NTU.lookFor(nightmare, '#cheat', true)})

}

module.exports = DefinitenessTest
