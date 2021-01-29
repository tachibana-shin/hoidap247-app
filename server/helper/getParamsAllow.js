module.exports = (args, fields) => {
  const argsColumns = []
  /* eslint no-unused-vars: "off" */
  for (const field in args) {
    if (fields.includes(field) && !!args[field]) {
      argsColumns.push({
        field,
        value: args[field]
      })
    }
  }
  return argsColumns
}