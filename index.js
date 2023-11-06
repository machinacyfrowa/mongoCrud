//zaimportuj bibliotekę express (serwer http)
const express = require('express');
//przygotuj instancję serwera http
const app = express();

//zdefiniuj ścieżkę dla głownego "folderu" aplikacji przy użyciu żądania GET
//używamy funkcji asynchronicznej pod przyszłe funkcje mongodb
app.get('/', async (req, res) => {
    res.send("ładzia!");
})

//funkcja wyświetla wszystkie rekordy z bazy danych
app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista wszystkich rekordów w bazie</h1>");
    res.end();
})

//uruchom serwer
app.listen(8000);