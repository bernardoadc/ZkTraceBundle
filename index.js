require('clarify')
const StackTracey = require('stacktracey')

module.exports = function (e, logger) {
  const trace = new StackTracey(e).items.map(c => `at ${c.calleeShort || '???'} ${c.fileRelative}:${c.line}:${c.column}`)
  const stack = `${e.message}\n  ${trace.join('\n  ')}`

  if (logger) logger(stack)
  return stack
}
