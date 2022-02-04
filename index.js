const stackTrace = require('stack-trace')

module.exports = function (e, logger) {
  let trace

  const map = c => `at ${c.getMethodName() || c.getFunctionName() || '<anonymous>'} ${c.getFileName()}:${c.getLineNumber()}:${c.getColumnNumber()}`
  if (e) trace = stackTrace.parse(e).map(map)
  else trace = stackTrace.get().map(map)
  const stack = `${e.message}\n  ${trace.join('\n  ')}`

  if (logger) logger(stack)
  return stack
}
