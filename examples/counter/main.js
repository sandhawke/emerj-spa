const { addView } = require('emerj-spa')
const counter = require('./counter')

function createState () {
  // an array of the element id of the counters
  return []
}

function render ({ state, view }) {
  const out = []
  out.push(`<button onclick="${view.globalize(addCounter)}()">Add Counter<\b>`)
  for (const id of state) out.push(`<div id=${id}></div>`)
  return out

  function addCounter () {
    view.stateChanged()
    const id = view.idGen()
    state.unshift(id)
    const v = addView(id, counter)
    v.close = () => {
      // just take the id out of the list; there's no need to cancel
      // the timeout because the element will be gone from the dom, so when
      // the timeout fires there will be nothing to do.
      const pos = state.indexOf(id)
      state.splice(pos, 1)
      view.stateChanged()
    }
  }
}

module.exports = { render, createState }
