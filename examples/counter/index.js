const { setup, H } = require('emerj-spa')

function renderApp (state) {
  if (!state.counter) state.counter = 1
  setTimeout(() => state.emit('change'), 100)
  return H`<p>This text has been rendered ${state.counter++} times</p>`
}

setup({ renderApp })
