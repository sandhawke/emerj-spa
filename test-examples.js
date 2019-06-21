const test = require('tape')
const my = require('.')

let events
let hook
function log (...args) {
  // console.log(args)
  events.push(args)
  hook()
}

test('example hello', async (t) => {
  events = []
  hook = () => {
    my.shutdown()
    t.deepEqual(events, [[ 'nodejs', '<p>Hello, World</p>' ]])
    t.end()
  }
  my.setMerge(log)
  require('./examples/hello/index')
})

test('example counter', async (t) => {
  events = []
  hook = () => {
    my.shutdown()
    t.deepEqual(events, [
      [ 'nodejs', '<button onclick="emerjspa0()">Add Counter</button>' ]
    ])
    t.end()
  }
  my.setMerge(log)
  require('./examples/counter/index')
})
