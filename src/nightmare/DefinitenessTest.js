var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const DefinitenessTest = (nightmare, delay) => {

    return nightmare

        // Change the selected noun and look for the changeNoundCheckmark
        // Note: make sure this noun has been entered as an example already.
        .type('.Select-control input','carrot\u000d').wait(delay)
        .then( res => {return NTU.lookFor(nightmare, '#changeNoundCheck', true)})

        // Change the definiteness and look for the changeDefinitenessCheckmark
        .then( res => {return nightmare.click('#definite').wait(delay)})
        .then( res => {return NTU.lookFor(nightmare, '#changeDefinitenessCheck', true)})

        // Can you see that the article has changed?
        .then( res => {return nightmare.click('#iseeArticleChanged').wait(delay)})

        .then( res => {return NTU.lookFor(nightmare, '#iseeArticleChangedCheck', true)})
        //.then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

        // Can I see the examples button?
        //.then( res => {return NTU.lookFor(nightmare, '#examples', true)})

}

module.exports = DefinitenessTest
