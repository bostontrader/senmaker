var Nightmare = require('nightmare')

var LanguageSwitchTest = require('./LanguageSwitchTest')
var IntroTest          = require('./IntroTest')

describe('Intro', () => {

    const url = 'http://localhost:8081'

    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
        //const delayA = 10
        const delayB = 250
        const delayC = 1000

        nightmare.goto(url).wait(delayC)

        // By default it start in Chinese.  Test that we can switch the language to English
        .then( res => {return LanguageSwitchTest(nightmare, delayC)})

        // And the rest of the test runs in English
        .then( res => {return IntroTest(nightmare, delayB)})
        .then(result => {done()})

    }).timeout(4000)

})
