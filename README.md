# 🕒 Casio Product Chatbot (XML Feed Based)

A lightweight ChatGPT-style product chatbot built with **Node.js + HTML/CSS/JS**.  
It reads products directly from a **WooCommerce / Google XML feed** and allows users to search products in **Bangla, Banglish, or English**.

---

## ✨ Features

- 📦 Reads live product data from XML feed
- 💬 ChatGPT-style chat interface
- 🌐 Supports Bangla / Banglish / English queries
- 🖼️ Shows product image, price, stock & link
- ⚡ One-file backend & one-file frontend
- 🧠 Smart keyword-based search (language independent)

---

## 🚀 Backend Setup (Node.js)

### 1️⃣ Requirements
- Node.js v18+
- npm

### 2️⃣ Install dependencies
```bash
npm init -y
npm install express axios xml2js cors
```
## Run the server
```
node server.js
```
Server will start at:``http://localhost:3333``

API endpoint: ``POST /mcp/search-product``

Request body: ``{
  "query": "MTP-V004L watch er price koto"
}``

## 🧪 Example Queries
You can ask naturally:

```
MTP-V004L watch er price koto
MTP-V004L দাম কত
Casio enticer leather watch
Casio men’s watch price
```

The chatbot will reply with:

- Product image
- Product name
- Price
- Stock status
- Product link
