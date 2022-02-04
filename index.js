const stackTrace = require('stack-trace')

module.exports = function (e, logger) {
  const trace = stackTrace.parse(e).map(c => `at ${c.getMethodName() || c.getFunctionName() || '<anonymous>'} ${c.getFileName()}:${c.getLineNumber()}:${c.getColumnNumber()}`)
  const stack = `${e.message}\n  ${trace.join('\n  ')}`
  if (logger) logger(stack)

  return stack
}
