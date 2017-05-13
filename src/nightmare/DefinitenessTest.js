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
        .then( res => {return NTU.lookFor(nightmare, '#iseeArticleChangedCheck', true)})

        // Can I see the cheat button?
        .then( res => {return NTU.lookFor(nightmare, '#cheat', true)})

}

module.exports = DefinitenessTest
