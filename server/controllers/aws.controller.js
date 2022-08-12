const AWS = require('aws-sdk');
const config = require('../config/config');

module.exports = {
  uploadFile,
  uploadBase64,
}

function uploadFile(key, file) {

  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'leped',
    Key: key,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.putObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({ success: false, data: err });
      }
      resolve({ sucess: true, data: resp });
    })
  });
}

function uploadBase64(key, file) {

  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'leped',
    Key: key,
    Body: file,
    ACL: "public-read",
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  return new Promise((resolve, reject) => {
    s3.putObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({ success: false, data: err });
      }
      resolve({ sucess: true, data: resp });
    })
  });
}


