const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { Pool } = require('pg');

// Middleware to parse JSON request bodies
app.use(express.json());

// Use environment variables for sensitive connection details (recommended)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'jonzmaps',
  password: process.env.DB_PASSWORD || 'i808State!@',
  port: process.env.DB_PORT || 5432, // Default Postgres port
});

module.exports = pool;

app.get('/maps', async (req, res) => {
  try {
    // Execute a SQL query using the pool
    const result = await pool.query('SELECT * FROM mapz.mapdef ORDER BY id ASC LIMIT 100');
    
    // Send the query results back as a JSON response
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/maps/id/:id', async (req, res) => {
  try {
    const mapid= req.params.id;
    console.log(mapid); // Output: 123

    const qrybase = "SELECT * FROM mapz.mapdef WHERE id = 'mapid'";
    const qry = qrybase.replace('mapid', mapid);

    console.log(qry);
    
    // Execute a SQL query using the pool
    const result = await pool.query(qry);
    
    // Send the query results back as a JSON response
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/maps/allpoi', async (req, res) => {
  try {

    const qry = "SELECT * FROM mapz.poi";
    /* const qry = qrybase.replace('mapid', mapid);
    const qrybase = "SELECT * FROM mapz.mapdef WHERE id = 'mapid'";
    const qry = qrybase.replace('mapid', mapid);
 */
    console.log(qry);
    
    // Execute a SQL query using the pool
    const result = await pool.query(qry);
    
    // Send the query results back as a JSON response
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/maps/poi/:id', async (req, res) => {
  try {
    const poiid= req.params.id;
    console.log(poiid); // Output: 123

    const qrybase = "SELECT * FROM mapz.poi WHERE id = 'poiid'";
    const qry = qrybase.replace('poiid', poiid);

    console.log(qry);
    
    // Execute a SQL query using the pool
    const result = await pool.query(qry);
    
    // Send the query results back as a JSON response
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

/* 
MAPDEF sample
[{"id":"23ba1d87-284d-4096-ab90-3bce800997b7","name":"home","description":"my house ","point":null,"lon":null,"lat":null,"rsid":null},
{"id":"300cc654-8f3b-4a36-986c-8b6cfbea5bf2","name":"honalulu","description":"honahulu","point":null,"lon":"157.8583","lat":"21.3069","rsid":null},
{"id":"ef816a64-d078-4ded-bc98-ac1e8efc3413","name":"statue","description":"statue of liberty","point":null,"lon":"74.0445","lat":"40.6892","rsid":null}]

POI sample
[{"id":"8ea95cfb-5c17-4349-a692-a6b9475b3139","name":"statue of liberty","description":"french-made monument","point":null,"vector":null,"lon":"-74.0445","lat":"40.6892","srid":null,"created_by":"JFE","map_id":"23ba1d87-284d-4096-ab90-3bce800997b7","create_date":null}]
 */

// Define a simple GET route (endpoint)
app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
