const LanguageSwitchTest = (nightmare, delay) => {

    // Initially, the language should be set to chinese and so the English flag should be visible,
    // but not the chinese flag.
    return nightmare
        .evaluate(function () {return document.querySelector('#zhFlag') === null})

        .then( zhFlagNotFound => {
            if (!zhFlagNotFound)
                throw('The Chinese flag was found, but it shouldn\'t be there.')
        })

        .then( res => {
            return nightmare.evaluate(function () {return document.querySelector('#enFlag') !== null})
        })

        .then( enFlagFound => {
            if (!enFlagFound)
                throw('The US flag was not found.')
        })
        
        // Now switch to english. Verify that we _can_ see the zhFlag, but _not_ the enFlag.
        .then( res => {
            return nightmare
            .click('#enFlag').wait(delay)

            // Verify that we can see the zhFlag
            .evaluate(function () {
                return document.querySelector('#zhFlag') !== null
            })
        })

        .then( zhFlagFound => {
            if (!zhFlagFound)
                throw('The Chinese flag was not found.')
        })

        .then( res => {return nightmare.evaluate(function () {return document.querySelector('#enFlag') === null})})

        .then( enFlagNotFound => {
            if (!enFlagNotFound)
                throw('The US flag was found, but it shouldn\'t be there.')})
}

module.exports = LanguageSwitchTest
