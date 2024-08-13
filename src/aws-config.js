// aws-config.js
import AWS from 'aws-sdk';

AWS.config.update({
  //amplify-user
  accessKeyId: 'AKIAZTDBOL5IL6L7F4N5',
  secretAccessKey: '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',
  region: 'us-east-1', // Ajusta la región según corresponda
});

const s3 = new AWS.S3();

export default s3;
