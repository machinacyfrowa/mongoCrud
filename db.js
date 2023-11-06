//sterownik do bazy danych
const { MongoClient } = require('mongodb');
//uri połaczenia do konkretnej bazy mongodb
const uri = "mongodb+srv://admin:x37zKvQmPixEfUOe@cluster0.qtyrl5o.mongodb.net/?retryWrites=true&w=majority";



async function connect() {
    const client =  new MongoClient(uri);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    } catch (e) {
        console.log("Error connecting to database: " + e);
        process.exit(1);
    }
}

module.exports = {connect}
