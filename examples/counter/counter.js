
function createState () {
  return { count: 0 }
}

function render ({ state, H, view }) {
  ++state.count
  view.stateChanged()
  return H`
<p>This text has been 
rendered ${state.count} time${state.count > 1 ? 's' : ''}.
   
<button onclick="${view.closeFuncGlobal}()">&times;</button></p>
`
}

module.exports = { render, createState }
