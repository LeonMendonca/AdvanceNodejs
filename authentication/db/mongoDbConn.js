import { connect } from 'mongoose'

const uri = `${process.env.MONGODB_URI}/Auth`;

async function mongoDbConn() {
  return connect(uri);
}

export { mongoDbConn }
