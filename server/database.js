/**
 * DB Connection
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const mongoose = require('mongoose');

/**
 * Class for connecting to the mongo DB
 *
 */
class Database {
  /**
   * Static method for establishing connection.
   */
  static async connect() {
    const dbHost = process.env.DB_URL.replace(
      '<PASSWORD>',
      process.env.DB_PASSWORD
    );

    try {
      const response = await mongoose.connect(dbHost, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      if (response) console.log('Connected to the Database!');
    } catch (err) {
      console.error(`Failed connection with error: ${err}`);
    }
  }
}

module.exports = Database;
