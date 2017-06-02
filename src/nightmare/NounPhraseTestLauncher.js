var Nightmare = require('nightmare')

var LanguageSwitchTest = require('./LanguageSwitchTest')
var IntroTest          = require('./IntroTest')
var NounPhraseTest     = require('./NounPhraseTest')
var NoundTest     = require('./NoundTest')
var DefinitenessTest   = require('./DefinitenessTest')
var PhraseTest         = require('./PhraseTest')

describe('NounPhrase', () => {

    const url = 'http://localhost:8081'

    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
        //const delayA = 10
        const delayB = 250
        const delayC = 1000

        nightmare.goto(url).wait(delayC)

            // By default the app starts in Chinese.  Test that we can switch the language to English
            .then( res => {return LanguageSwitchTest(nightmare, delayC)})

            // And the rest of the test runs in English

            // Advance to NounPhraseTest
            .then( res => {return IntroTest(nightmare, delayB)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayB)})
            .then( res => {return NoundTest(nightmare, delayB)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayB)})
            .then( res => {return DefinitenessTest(nightmare, delayB)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayB)})
            .then( res => {return PhraseTest(nightmare, delayB)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayB)})

            .then( res => {return NounPhraseTest(nightmare, delayC)})
            .then(result => {done()})

    }).timeout(32000)

})