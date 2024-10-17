const { readAction, deleteAction } = require("../CRUD/actions");
const { getCurrentDate } = require("../helpers/dateGenerator");

function isProduct(id) {
  const product = readAction("products", "id=?", [id]);
  const ret = product.length > 0;
  return ret;
}
function rearranging(body) {
  const { item, user_id } = body;
  let { id: item_id, name, price, quantity: qnt } = item;
  const creation_at = getCurrentDate();
  return {
    user_id,
    item_id,
    qnt,
    bought: 0,
    price,
    name,
    creation_at,
  };
}

exports.isProduct = isProduct;
exports.rearranging = rearranging;
