var Nightmare = require('nightmare')

var LanguageSwitchTest = require('./LanguageSwitchTest')
var IntroTest          = require('./IntroTest')
var NoundTest          = require('./NoundTest')
var DefinitenessTest   = require('./DefinitenessTest')
var PhraseTest         = require('./PhraseTest')

describe('Full Test...', () => {

    const url = 'http://localhost:8081'

    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
        const delayA = 10
        const delayB = 250
        const delayC = 1000

        nightmare.goto(url).wait(delayC)

            // By default the app starts in Chinese.  Test that we can switch the language to English
            .then( res => {return LanguageSwitchTest(nightmare, delayC)})

            // And the rest of the test runs in English

            .then( res => {return IntroTest(nightmare, delayA)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayA)})

            .then( res => {return NoundTest(nightmare, delayA)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayA)})

            .then( res => {return DefinitenessTest(nightmare, delayC)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayC)})

            .then( res => {return PhraseTest(nightmare, delayC)})
            .then( res => {return nightmare.click('#lesson-next').wait(delayC)})


            .then(result => {done()})

    }).timeout(16000)

})
