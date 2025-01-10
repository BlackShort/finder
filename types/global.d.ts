interface MongooseGlobal extends NodeJS.Global {
  mongoose: {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: MongooseGlobal