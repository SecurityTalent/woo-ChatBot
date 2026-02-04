const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FEED_URL =
  "https://msinternational.com.bd/wp-content/uploads/wpwoof-feed/xml/catalog_casio.xml";

let PRODUCTS = [];

/* ---------- Helpers ---------- */
function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\- ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractKeywords(question) {
  const stopWords = [
    "price","koto","dam","দাম","কত","er","watch","টা","ti",
    "please","bolo","show","me","need","chai","want","men","mens"
  ];

  return normalize(question)
    .split(" ")
    .filter(w => w.length > 2 && !stopWords.includes(w));
}

/* ---------- Load XML ---------- */
async function loadProducts() {
  const res = await axios.get(FEED_URL, { timeout: 20000 });
  const parser = new xml2js.Parser({ explicitArray: false });
  const data = await parser.parseStringPromise(res.data);

  PRODUCTS = data.rss.channel.item.map(item => ({
    id: item["g:id"],
    title: item["g:title"],
    price: item["g:price"],
    availability: item["g:availability"],
    description: item["g:description"],
    link: item["g:link"],
    image: item["g:image_link"]
  }));

  console.log("✅ Products loaded:", PRODUCTS.length);
}

/* ---------- Smart Search ---------- */
function findProducts(question) {
  const keywords = extractKeywords(question);

  return PRODUCTS.filter(p => {
    const text = normalize(`${p.title} ${p.description}`);
    return keywords.some(k => text.includes(k));
  });
}

/* ---------- API ---------- */
app.post("/mcp/search-product", (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.json({ count: 0, products: [] });
  }

  const results = findProducts(query);

  res.json({
    count: results.length,
    products: results.slice(0, 5)
  });
});

/* ---------- Start ---------- */
app.listen(3333, async () => {
  await loadProducts();
  console.log("🚀 Server running: http://localhost:3333");
});
