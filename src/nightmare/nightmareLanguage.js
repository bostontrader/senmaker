const nightmareLanguage = (nightmare, delay) => {
    return nightmare
        .evaluate(function () {
            return document.querySelector('#zhFlag') === null
        })

        .then( zhFlagNotFound => {
            if (!zhFlagNotFound)
                throw('zhFlagFound was found, but it shouldn\'t be there.')
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
                throw('zhFlagFound was not found')
        })

        .then( res => {
            return nightmare
                .evaluate(function () {
                    return document.querySelector('#enFlag') === null
                })
        })

        .then( enFlagNotFound => {
            if (!enFlagNotFound)
                throw('enFlagFound was found, but it shouldn\'t be there.')
        })
}

module.exports = nightmareLanguage
