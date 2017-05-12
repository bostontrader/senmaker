var Nightmare = require('nightmare')

//var NoundTest         = require('./NoundTest')
var IntroTest         = require('./IntroTest')

var nightmareLanguage = require('./nightmareLanguage')

describe('Nound', () => {

    const url = 'http://localhost:8081'

    /**
     * Our primary task to to push buttons, enter text, and walk our way through the app. Our secondary task
     * is to verify that certain elements appear or vanish based on these actions.  It's tempting
     * to h/o/p/e believe that the unit testing covers this. But doing so here, in certain important
     * cases, eases our nerves re: is unit testing thorough enough?
     *
     */
    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800})
        const delayA = 10
        const delayB = 250
        const delayC = 1800

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

            .then( res => {return nightmareLanguage(nightmare, delayA)})

            // Now answer the intro lesson question. Can I see the checkmark?
            //.then( res => {
                //return nightmare
                    //.click('#iunderstandCheck').wait(delayA)
                    //.evaluate(function () {
                        //return document.querySelector('#iunderstandCheck') !== null
                    //})
            //})

            //.then( iunderstandCheck => {
                //if (!iunderstandCheck)
                    //throw('iunderstandCheck was not found')
            //})

            // Advance to NoundTest
            //.then( res => {
                //return nightmare.click('#lesson-next').wait(delayC)
            //})
            //.then( res => {return NoundTest(nightmare, delayC)})
            // No need to rewind

            .then(resolve => {done()})
            //.catch(err => {console.log(err),done()})

    }).timeout(35000)

})
