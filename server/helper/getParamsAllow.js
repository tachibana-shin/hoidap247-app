module.exports = (args, fields) => {
  const argsColumns = []
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