const { addView, EventEmitter } = require('emerj-spa')
const timeRange = require('./range-slider')

addView('home', { render })

function render () {
  // need a different state object here; otherwise you can't drag
  // the slider, because emerj is messing with it too much.
  const state = new EventEmitter()
  addView('time1', timeRange, { state }).property = 'startTime'
  addView('time2', timeRange, { state }).property = 'stopTime'
  addView('time3', timeRange, { state }).property = 'startTime'
  addView('time4', timeRange, { state }).property = 'stopTime'
  addView('time5', timeRange, { state }).property = 'startTime'
  addView('time6', timeRange, { state }).property = 'stopTime'

  return `
There seems to be a bug in emerj. Sometimes it changes the value of a range slider when merged with a different value, and sometimes it doesn't.  Note the numbers displayed stay in sync, but the handles don't always.

<div id="time1"></div>
<div id="time2"></div>
<div id="time3"></div>
<div id="time4"></div>
<div id="time5"></div>
<div id="time6"></div>
`
}
