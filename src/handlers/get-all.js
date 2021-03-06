const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const AWSXRay = require('aws-xray-sdk-core');

const dynamodb = AWSXRay.captureAWSv3Client(new DynamoDB());

exports.getAllHandler = async (event) => {
  try {
    var response = await dynamodb.scan({
      TableName: process.env.TABLE
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items)
    };
  } catch (err) {
    throw new Error(err);
  }
}