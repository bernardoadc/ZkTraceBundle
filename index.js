require('clarify')
const StackTracey = require('stacktracey')

function filter (a, F) {
  if (!F) return a

  return a.filter(c => !F.some(function (f) {
    if (f instanceof RegExp) return f.test(c.fileRelative)
    else return c.fileRelative.includes(f)
  }))
}

module.exports = function (e, logger, withFilter) {
  const trace = filter(new StackTracey(e).items, withFilter).map(c => `at ${c.calleeShort || '???'} ${c.fileRelative}:${c.line}:${c.column}`)
  const stack = `${e.message}\n  ${trace.join('\n  ')}`

  if (logger) logger(stack)
  return stack
}
