import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const isPlaceholderUri = (uri) =>
  !uri || uri.includes('username:password@cluster.mongodb.net')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI

  if (isPlaceholderUri(uri)) {
    if (process.env.NODE_ENV === 'development') {
      const mongod = await MongoMemoryServer.create()
      const memoryUri = mongod.getUri('fitsphere')
      const conn = await mongoose.connect(memoryUri)
      console.log('MongoDB Connected: in-memory database (development fallback)')
      console.log('Set MONGODB_URI in backend/.env to persist data across restarts')
      return conn
    }

    throw new Error('MONGODB_URI is not configured')
  }

  try {
    const conn = await mongoose.connect(uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`MongoDB connection failed (${error.message}). Using in-memory database.`)
      const mongod = await MongoMemoryServer.create()
      const memoryUri = mongod.getUri('fitsphere')
      const conn = await mongoose.connect(memoryUri)
      console.log('MongoDB Connected: in-memory database (development fallback)')
      return conn
    }

    throw error
  }
}

export default connectDB
