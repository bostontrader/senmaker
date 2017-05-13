//var Nightmare = require('nightmare')

// Look for the given css_id.  Do we expect2FindIt?
// If we expect2FindIt but don't, then squeal.
// If we don't expect2FindIt but we do, then squeal.
const lookFor = (nightmare, css_id, expect2FindIt) => {
    return nightmare
        .evaluate(function (css_id) {
            return document.querySelector(css_id) !== null
        },css_id)
        .then( objectFound => {
            if( objectFound && !expect2FindIt )
                throw('The object was found, but it shouldn\'t be.')
            if( !objectFound && expect2FindIt )
                throw('The object was not found, but it should be.')
        })
}

module.exports.lookFor = lookFor
