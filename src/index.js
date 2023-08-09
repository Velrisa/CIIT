import app from './app.js';
import { conectarBD } from './db.js';

app.listen(4000);
conectarBD();

console.log('Serve on port',4000);