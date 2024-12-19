import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port = process.env.PORT || 4000;

// Inicia la aplicación sin ejecutar migraciones
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
