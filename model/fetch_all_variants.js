const Variants = require('./variants');

async function fetch_all() {
  try {
    const fetchAll = await new Variants().fetchAll();
    console.log(fetchAll.toJSON());
    return fetchAll.toJSON();
  } catch (e) {
    console.log(`Failed to fetch data: ${e}`);
  } finally {
  }
}

fetch_all();
