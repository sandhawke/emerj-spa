const test = require('tape')
const my = require('.')
const delay = require('delay')
const fs = require('fs')

test(async (t) => {
  require('./examples/counter/index')
  my.stopNode()
  await delay(2000)
  const text = fs.readFileSync('_page_snapshot.html', 'utf8')
  t.equal(text, '<!doctype html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n  </head>\n  <body>\n    <div id="root"><p>This text has been rendered 1 times</p></div>\n  </body>\n</html>')
  t.end()
})
