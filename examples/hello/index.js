const { addView } = require('emerj-spa')

addView('home', {render})

function render () {
  return `<p>Hello, World</p>`
}



