import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const url = `mongodb://${DB_HOST}:${DB_PORT}`;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';


class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  isAlive() { return !!this.db; }

  async nbUsers() { return this.users.countDocuments(); }

  async nbFiles() { return this.files.countDocuments(); }
}

const dbClient = new DBClient();
module.exports = dbClient;