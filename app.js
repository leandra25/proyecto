const express = require('express');
const bodyParser = require('body-parser');
const medicoRoutes = require('./routes/medicoRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const turnoRoutes = require('./routes/turnoRoutes');
const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/', medicoRoutes);
app.use('/especialidad', especialidadRoutes);
app.use('/turnos', turnoRoutes);



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
