module.exports = obj => {
  /* eslint-disable */
  for ( const key in obj ) {
    return false
  }
  return true
};