interface MongooseGlobal extends NodeJS.Global {
  _mongoClientPromise: any
  mongoose: {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: MongooseGlobal