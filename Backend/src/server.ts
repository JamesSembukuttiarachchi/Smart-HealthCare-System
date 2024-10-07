import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

class Database {
  private static instance: Database;
  private isConnected: boolean = false;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public connect(): void {
    if (this.isConnected) {
      console.log("Database is already connected.");
      return;
    }

    mongoose
      .connect(env.MONGO_CONNECTION_STRING)
      .then(() => {
        this.isConnected = true;
        console.log("Mongoose Connected");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  }
}

const port = env.PORT;
const database = Database.getInstance();
database.connect();

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
