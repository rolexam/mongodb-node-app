const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'SERIES'

let db

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
        db = client.db(dbName)
    })

const insertSeries = (item) => {
    const collection = db.collection('TVSeries')
    return collection.insertOne(item)
}

const getSeries = () => {
    const collection = db.collection('TVSeries')
    return collection.find({}).toArray()
}

const findSeries = (id) => {
    const collection = db.collection('TVSeries')
    return collection.findOne({_id: ObjectId(id)})
}

const searchSeries = (query) => {
    const collection = db.collection('TVSeries')
    return collection.find({title: new RegExp(query, 'i') }).toArray()
}

const deleteSeries = (id) => {
    const collection = db.collection('TVSeries')
    return collection.deleteOne({_id: ObjectId(id)})
}

const updateSeries = (id, data) => {
    const collection = db.collection('TVSeries')
    return collection.updateOne({ "_id": ObjectId(id) }, { $set: data })
}

module.exports = { init, getSeries, searchSeries, insertSeries, deleteSeries, findSeries, updateSeries }