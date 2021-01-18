module.exports = obj => {
  for ( const key in obj ) {
    return false
  }
  return true
};