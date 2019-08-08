const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 数据存储路径
const adapters = new FileSync('db.json')
const db = low(adapters)

db.defaults({
  'assetType': [],
  'asset': []
}).write()

module.exports = db
