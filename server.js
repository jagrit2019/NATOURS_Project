import { config } from 'dotenv';
import { listen } from './app';

config({ path: './config.env' });

const port = process.env.PORT || 3000;
listen(port, () => {
  console.log(`App running on port ${port}...`);
});
