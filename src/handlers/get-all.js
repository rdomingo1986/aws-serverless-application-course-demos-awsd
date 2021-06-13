const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDB();

exports.getAllHandler = async (event) => {
  console.log(dynamodb);

  return true;
}