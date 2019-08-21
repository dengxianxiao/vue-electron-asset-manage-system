const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 数据存储路径l
const adapters = new FileSync('db.json')
const db = low(adapters)

db.defaults({
  'assetType': [],
  'asset': [],
  'department': [],
  'assetBorrow': []
}).write()

module.exports = db
