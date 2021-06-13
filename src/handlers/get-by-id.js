const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const AWSXRay = require('aws-xray-sdk-core');

const dynamodb = AWSXRay.captureAWSv3Client(new DynamoDB());

exports.getByIdHandler = async (event) => {
  try {
    var response = await dynamodb.query({
      TableName: process.env.TABLE,
      KeyConditionExpression: 'Author = :author_name',
      ExpressionAttributeValues: {
        ':author_name': {
          S: decodeURIComponent(event.pathParameters.id)
        }
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items)
    };
  } catch (err) {
    throw new Error(err);
  }
}