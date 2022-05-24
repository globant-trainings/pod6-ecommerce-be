
function createDB() {
  let store = {};

  function save(key, value) {
    store = {
      ...store,
      [key]: value
    }
  }
  function getValue(key) {
    return store[key] || new Error(`Couldn't find the value of ${key}`)
  }

  return {
    save, getValue
  }
}

const db = createDB();

module.exports = db;
