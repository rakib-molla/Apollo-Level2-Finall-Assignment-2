import mongoose from 'mongoose';
import config from './config/index';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();