const { MongoClient } = require('mongodb')

const uri = 'dbUser'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = client
