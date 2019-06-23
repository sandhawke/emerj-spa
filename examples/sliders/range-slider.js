function render ({ state, view }) {
  let value = state[view.property] || '500'

  // bundle this into view.getUnique('demo'), etc?
  if (!view.sliderid) view.sliderid = view.idGen()

  console.log('rendering', view.id, value)

  view.setHTML(`

<div class="slidecontainer">
  <p>Property = ${view.property}</p>
  <p>${value}</p>
  <input type="range" min="1" max="1000" value="${value}" class="slider" id="${view.sliderid}">
</div>
`)

  var slider = document.getElementById(view.sliderid)
  slider.oninput = function () {
    state[view.property] = parseInt(this.value)
    console.log('emit change', state)
    state.emit('change')
  }
}

module.exports = { render }
