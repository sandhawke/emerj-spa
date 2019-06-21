const { addView } = require('emerj-spa')
const home = require('./home')

addView('home', home)

/*

addView({render: main,
         createState: () => [] // an array of ids of the counters
        })

function main ({state, view}) {
  const out = []
  out.push(`<button onclick="${view.globalize(addCounter)}()">Add Counter<\b>`)
  for (const id of state) out.push(`<div id=${id}></div>`)
  return out

  function addCounter () {
    view.stateChanged()
    const id = view.idGen()
    state.unshift(id)
    addView({id, render: renderCounter,
             createState: () => { count: 0, close }})
    function close () {
      // just take the id out of the list; there's no need
      const pos = state.indexOf(id)
      state.splice(pos, 1)
      view.stateChanged()
    }
  }
}

function renderCounter ({state, H, view}) {
  // window.setTimeout(() => view.stateChanged(), 100)
  ++state.count
  view.stateChanged()
  return H`
<p>This text has been 
rendered ${state.count} time${state.count > 1 ? 's' : ''}.
   
<button onclick="${view.globalize(state.close)}()">&times;</button></p>
`
}

*/
