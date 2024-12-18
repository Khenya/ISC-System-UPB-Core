import dotenv from 'dotenv';
import { runMigrations } from './config/migrate';
import app from './app';

dotenv.config();
const port = process.env.PORT || 4000;

runMigrations()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to run migrations:', err);
    process.exit(1);
  });
