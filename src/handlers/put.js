const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const AWSXRay = require('aws-xray-sdk-core');

const dynamodb = AWSXRay.captureAWSv3Client(new DynamoDB());

exports.putHandler = async (event) => {
  const body = JSON.parse(event.body);
  try {
    var response = await dynamodb.putItem({
      TableName: process.env.TABLE,
      Item: {
        'Author': {
          S: body.Author
        },
        'Title': {
          S: body.Title
        },
        'Category': {
          S: body.Category
        },
        'Formats': {
          M: body.Formats
        },
        'Year': {
          N: body.Year.toString()
        }
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (err) {
    throw new Error(err);
  }
}