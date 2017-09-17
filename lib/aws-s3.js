'use strict'

const debug = require('debug')('cfgram:aws-s3')

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
s3.config.setPromisesDependency(require('bluebird'))

const uploads = module.exports = {}

uploads.uploadProm = function(params) {
  debug('#s3Upload')

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3Data) => {
      if(err) reject(err)
      resolve(s3Data)
    })
  })
}

uploads.deleteProm = function(params) {
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, s3data) => {
      if(err) return reject((err.stack))
      resolve(s3data)
    })
  })
}
