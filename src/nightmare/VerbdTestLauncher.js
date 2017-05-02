var Nightmare = require('nightmare')

var VerbdTest         = require('./VerbdTest')
var nightmareLanguage = require('./nightmareLanguage')

describe('Verbd', () => {


    const url = 'http://localhost:8081'

    /**
     * Our primary task to to push buttons, enter text, and walk our way through the app. Our secondary task
     * is to verify that certain elements appear or vanish based on these actions.  It's tempting
     * to h/o/p/e believe that the unit testing covers this. But doing so here, in certain important
     * cases, eases our nerves re: is unit testing thorough enough?
     *
     */
    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
        const delayA = 10
        const delayB = 250
        const delayC = 1800

        // test reset at the end
        nightmare.goto(url).wait(delayC)

        // Verify that we can switch between languages and that the correct language switch is
        // displayed.

        // By default the language starts at zh.  Verify that we _can_ see the enFlag, but _not_ the zhFlag.
            .evaluate(function() {
                return document.querySelector('#enFlag') !== null
            })
            .then( enFlagFound => {
                if (!enFlagFound)
                    throw('enFlagFound was not found')
            })

            // Advance to VerbdTest
            .then( res => {
                return nightmare
                    .click('#lesson-next').wait(delayC)
                    .click('#lesson-next').wait(delayC)
            })
            .then( res => {return VerbdTest(nightmare, delayC)})
            // No need to rewind

            .then(resolve => {done()})
            .catch(err => {console.log(err),done()})

    }).timeout(35000)

})
