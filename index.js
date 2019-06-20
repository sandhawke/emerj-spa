/*

In script mode, this gets browserfied by itself, and you provide:

window.renderApp -- a function given the appState, which should return
the new HTML for the body of the page. This will be called whenever
there's a new frame after the appState has emitted a 'change' event.

window.appState -- you can set this before domready to be any
EventEmitter. If you leave it alone, it will default to a new
EventEmitter. You'll have to do appState.emit('change') after any
data change you do.

In package mode, it returns { setup } which you can call to set the
renderApp and initial appState without touching the window object, if
you like.

It adds .H to the appState and to window, as the brilliant
escape-html-template-tag module.

 */

const emerj = require('emerj')
const H = require('escape-html-template-tag')
const whenDomReady = require('when-dom-ready')
const EventEmitter = require('eventemitter3')

let nodeStop = false
let windowObj = {}
if (typeof window === 'object') windowObj = window

function setup (options) {
  const state = options.appState || windowObj.appState || new EventEmitter()
  const render = options.renderApp || windowObj.renderApp
  if (typeof render !== 'function') throw Error('renderApp not a function')

  // Just make H available to everyone because it's so wonderful
  state.H = H
  windowObj.H = H

  let rootElement

  let dbChanged = true
  function touch () {
    dbChanged = true
    // console.log('db changed')
  }
  state.on('change', touch)

  function paint () {
    if (rootElement && dbChanged) {
      let html = render(state)
      if (Array.isArray(html)) html = html.join('\n')
      if (typeof html !== 'string') html = html.toString()
      dbChanged = false
      emerj.merge(rootElement, html)
    }
    windowObj.requestAnimationFrame(paint)
  }

  async function start () {
    await whenDomReady()
    rootElement = (document.getElementById('app') ||
                   document.getElementById('root') ||
                   document.getElementById('main'))
    paint()
  }

  // consider an isomophic solution instead
  function nodeStart () {
    console.log('running simulated browser app for node')
    const fs = require('fs')

    const filename = '_page_snapshot.html'
    paint()

    function paint () {
      if (nodeStop) return
      if (dbChanged) {
        const html = render(state)
        dbChanged = false
        const text = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`
        fs.writeFileSync(filename, text, 'utf8')
        console.log('wrote page HTML to', filename)
      }
      setTimeout(paint, 1000)
    }
  }

  if (typeof window === 'undefined') {
    nodeStart()
  } else {
    start()
  }
}

function stopNode () {
  nodeStop = true
}

module.exports = { setup, H, EventEmitter, stopNode }
