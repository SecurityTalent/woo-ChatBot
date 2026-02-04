const axios = require("axios");
const xml2js = require("xml2js");

const FEED_URL =
  "https://msinternational.com.bd/wp-content/uploads/wpwoof-feed/xml/catalog_casio.xml";

async function loadProducts() {
  const res = await axios.get(FEED_URL, { timeout: 15000 });

  const parser = new xml2js.Parser({ explicitArray: false });
  const data = await parser.parseStringPromise(res.data);

  const items = data.rss.channel.item;

  return items.map(item => ({
    id: item["g:id"],
    title: item["g:title"],
    price: item["g:price"],
    availability: item["g:availability"],
    description: item["g:description"],
    link: item["g:link"],
    image: item["g:image_link"],
    group_id: item["g:item_group_id"]
  }));
}

module.exports = loadProducts;
