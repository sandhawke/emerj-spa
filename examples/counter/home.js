const { addView } = require('emerj-spa')
const counter = require('./counter')

function createState () {
  // an array of the element id of the counters
  return []
}

function render ({state, view}) {
  const out = []
  out.push(`<button onclick="${view.globalize(addCounter)}()">Add Counter</button>`)
  for (const id of state) out.push(`<div id=${id}></div>`)
  return out

  function addCounter () {
    view.stateChanged()
    const id = view.idGen()
    state.unshift(id)
    const v = addView(id, counter)
    // we can add things to the view object for it to use; in this
    // case we want it to be able to manage its own close button, to
    // remove itself from the list.
    v.closeFuncGlobal = view.globalize(() => {
      const pos = state.indexOf(id)
      state.splice(pos, 1)
      view.stateChanged()
      v.close()
    })
  }
}

module.exports = { render, createState }
