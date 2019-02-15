var Pool = require('pg').Pool;
var config = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'billboard',
};

var pool = new Pool(config);

async function get_hits(){

    try {
        var response = await pool.query("select * from public.hot100");
        console.log(response.rows);
    }
    catch(e){
        console.error("MY ERROR", e)
    }
    
}

get_hits();