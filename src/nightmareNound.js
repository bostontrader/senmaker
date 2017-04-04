const nightmareNound = (nightmare, delay) => {
    return nightmare
        .click('#lesson-next').wait(delay)
        .click('#add-nound').wait(delay)
        .click('#nound-add-form #cancel').wait(delay)

        // The noundAddForm should now go away.
        .evaluate(function () {
            return document.querySelector('#nound-add-form') === null
        })

        .then(
            nound_add_form_gone => {
                if (!nound_add_form_gone)
                    throw('nound-add-form has not gone away after cancel')
            })
        .then( res => {
            return nightmare
                .click('#add-nound').wait(delay)
                .type('#base', 'carrot').wait(delay)
                .click('#save-nound').wait(delay)

                // The NoundAddForm should now go away.
                .evaluate(function() {
                    return document.querySelector('#nound-add-form') === null
                })
        })
        .then(nound_add_form_gone => {
            if (!nound_add_form_gone)
                throw('nound-add-form has not gone away after save')
        })
        .then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#insertNoundCheck') !== null
                })
        })
        .then(insertNoundCheckFound => {
            if (!insertNoundCheckFound)
                throw('insertNoundCheck did not appear after save')
        })

        .then( res => {
            return nightmare
                .click('#n-1').wait(delay)
                .click('#cancel').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#nound-edit-form') === null
                })
        })
        .then(nound_edit_form_gone => {
            if (!nound_edit_form_gone)
                throw('nound-edit-form has not gone away after cancel')
        })

        .then( res => {
            return nightmare
                .click('#n-1').wait(delay)
                .type('#base', 'beaver').wait(delay)
                .click('#save-nound').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#nound-edit-form') === null
                })
            })
        .then(nound_edit_form_gone => {
            if (!nound_edit_form_gone)
                throw('nound-edit-form has not gone away after save')
        }).then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#updateNoundCheck') !== null
                })
        })
        .then(updateNoundCheckFound => {
            if (!updateNoundCheckFound)
                throw('updateNoundCheck did not appear after save')
        }).then( res => {
            return nightmare
                .click('#n-1').wait(delay)
                .click('#delete-nound').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#nound-edit-form') === null
                })
        })
        .then(nound_edit_form_gone => {
            if (!nound_edit_form_gone)
                throw('nound-edit-form has not gone away after delete')
        })
        .then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#deleteNoundCheck') !== null
                })
        })
        .then(deleteNoundCheckFound => {
            if (!deleteNoundCheckFound)
                throw('deleteNoundCheck did not appear after delete')
        })
}

module.exports = nightmareNound
