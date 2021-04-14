const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const get = require("lodash/get");

router.post("/connect", async (req, res, next) => {
  try {
    const { credentials } = req.body;
    const client = new Client({
      ...credentials,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const tablesRes = await client.query(`
      SELECT * 
      FROM information_schema.tables
      WHERE table_schema='public';
    `);

    const tableNames = get(tablesRes, "rows", []).map((table) =>
      get(table, "table_name", "")
    );

    const response = {};

    const queriesResponses = await Promise.all(
      tableNames.map(
        async (name) =>
          await client.query(`
      SELECT *
      FROM "${name}";
    `)
      )
    );

    queriesResponses.map((queryRes, i) => {
      const tableName = tableNames[i];
      return (response[tableName] = { ...queryRes, tableName });
    });

    await client.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ error });
  }
});

router.post("/query", async (req, res, next) => {
  try {
    const { query, credentials } = req.body;

    const client = new Client({
      ...credentials,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const queryRes = await client.query(query);

    await client.end();
    return res.status(200).json(queryRes);
  } catch (error) {
    console.log({ error });
    return res.status(400).json(error);
  }
});

module.exports = router;
