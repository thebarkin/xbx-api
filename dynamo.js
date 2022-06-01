const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "xbx.zone";

const getGameById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const getGames = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const games = await dynamoClient.scan(params).promise();
  return games;
};

const addOrUpdateGame = async (game) => {
  const params = {
    TableName: TABLE_NAME,
    Item: game,
  };
  return await dynamoClient.put(params).promise();
};

const deleteGame = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getGameById,
  getGames,
  addOrUpdateGame,
  deleteGame,
};
