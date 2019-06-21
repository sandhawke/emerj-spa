const test = require('tape')
const my = require('.')
const EventEmitter = require('eventemitter3')

let events
let hook
function log (...args) {
  // console.log(args)
  events.push(args)
  hook()
}

test('using state.emit(change)', async (t) => {
  events = []
  hook = () => { }
  my.setMerge(log)

  my.addView('n/a', { render, createState })
  function render ({ state }) {
    ++state.count
    if (state.count === 5) {
      my.shutdown()
      t.deepEqual(events, [
        [ 'nodejs', 'Count is 1' ],
        [ 'nodejs', 'Count is 2' ],
        [ 'nodejs', 'Count is 3' ],
        [ 'nodejs', 'Count is 4' ]
      ])
      t.end()
    }
    setTimeout(() => {
      state.emit('change')
    }, 100)
    return `Count is ${state.count}`
  }
  function createState () {
    const state = new EventEmitter()
    state.count = 0
    return state
  }
})
