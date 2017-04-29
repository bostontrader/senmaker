const nightmareDefiniteness = (nightmare, delay) => {
    return nightmare
        .click('#lesson-next').wait(delay)
        .type('.Select-control input','person\u000d').wait(delay)
        .evaluate(function() {
            return document.querySelector('#changeNoundCheck') !== null
        })
        .then(changeNoundCheckFound => {
            if (!changeNoundCheckFound)
                throw('changeNoundCheckFound did not appear after selection')
        })
        .then( res => {
            return nightmare
                .click('input[type="radio"]').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#changeDefinitenessCheck') !== null
                })
        })
        .then(changeDefinitenessCheckFound => {
            if (!changeDefinitenessCheckFound)
                throw('changeDefinitenessCheckFound did not appear when it should have')
        })
        .then( res => {
            return nightmare
                .click('#iseeArticleChanged').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#iseeArticleChangedCheck') !== null
                })
        })
        .then(iseeArticleChanged => {
            if (!iseeArticleChanged)
                throw('iseeArticleChanged did not appear when it should have')
        })
}

module.exports = nightmareDefiniteness
