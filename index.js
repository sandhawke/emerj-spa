const emerj = require('emerj')
const H = require('escape-html-template-tag')
const whenDomReady = require('when-dom-ready')
// const EventEmitter = require('eventemitter3')

// things that behave different in browser and in node.js

let callSoon
let merge
let shutdown
let globals

if (typeof window === 'object')  {
  callSoon = window.requestAnimationFrame
  merge = emerj.merge.bind(emerj)
  shutdown = () => console.error('shutdown called but not implemented')
  globals = window
} else {
  let pleaseStop = false
  callSoon = f => {if (!pleaseStop) setTimeout(f, 100)}
  shutdown = () => { pleaseStop = true }
  // could use emerj with cheerio maybe if we actually need to see page?
  merge = () => {
    console.log('running %s', __filename)
  }
  globals = {}
}

// for test harness
function setMerge (f) { merge = f }

////////////////////////////////////////////////////////////////

let idCounter = 0

class View {
  constructor (id, config) {
    // console.log('View ctor', id, config)
    this.id  = id
    this.createState = () => ({}) // or EventEmitter?  hm.
    Object.assign(this, config)
    // console.log('this =', this)
    
    if (typeof id !== 'string') throw TypeError()
    if (typeof this.render !== 'function') throw TypeError()
    if (this.createState &&
        typeof this.createState !== 'function') throw TypeError()

    this.state = this.createState({view: this})

    if (this.state.addEventListener) {
      this.listener = () => this.stateChanged()
      this.state.addEventListener('change', this.listener)
    }
    
    this.changed = true
  }
  stateChanged () {
    this.changed = true
    // could do a thing where we use this instead of just
    // polling, on the animation frame, but it'd be more
    // complicated for trivial reduced load, I think.
  }
  close () {
    if (this.listener) {
      this.state.removeEventListener('change', this.listener)
    }
  }
  paint () {
    if (!this.element) {
      this.element = document.getElementById(this.id)
      // might be undefined because element hasn't been created
      // yet.  we should pick it up on a future animation frame.
    }
    if (this.element && this.changed) {
      this.changed = false
      const arg = {
        state: this.state,
        view: this,
        escapeHTML: H,  // I love the trick of putting this here
        H
      }
      let html = this.render(arg)
      if (Array.isArray(html)) html = html.join('\n')
      if (typeof html !== 'string') html = html.toString()

      // what if the id is on a different element, or the element
      // doesn't exist?

      // console.log('calling merge', this.element, html)
      merge(this.element, html)
    }
    callSoon(this.paint.bind(this))
  }
  idGen () {
    return 'emerjspa' + idCounter++
  }
  globalize (value) {
    const id = this.idGen()
    globals[id] = value
    return id
  }
}

function addView (...args) {
  const v = new View(...args)
  startLoop(v)
  return v
}

async function startLoop (v) {
  await whenDomReady()
  v.paint()
}

module.exports = { addView, setMerge }

