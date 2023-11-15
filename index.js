//zaimportuj bibliotekę express (serwer http)
const express = require('express');
//zaimportuj body-parser
const bodyParser = require('body-parser');
//przygotuj instancję serwera http
const app = express();
//używaj body-parsera do pobierania danych z formularzy
app.use(bodyParser.urlencoded({ extended: true }));
//zaimportuj nasze funkcje do danych
const db = require('./db');

//zdefiniuj ścieżkę dla głownego "folderu" aplikacji przy użyciu żądania GET
//używamy funkcji asynchronicznej pod przyszłe funkcje mongodb
app.get('/', async (req, res) => {
    res.send("ładzia!");
})

//funkcja wyświetla wszystkie rekordy z bazy danych
app.get('/listAll', async (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.write("<h1>Lista wszystkich rekordów w bazie</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});
//funkcja ywświetlająca rekordy według kryteriów wyszukiwania
app.post('/search', async (req, res) => {
    let criteria = req.body;
    const client = await db.connect();
    let list = await db.get(client, criteria);
    res.setHeader('content-type', 'text/html');
    res.write("<h1>Lista rekordów w bazie spełniających kryteria</h1>");
    res.write("<table>");
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});
app.post('/add', async (req, res) => {
    let data = req.body;
    const client = await db.connect();
    await db.add(client, data);
    db.close(client);
    res.end();
});
//uruchom serwer
app.listen(8000);