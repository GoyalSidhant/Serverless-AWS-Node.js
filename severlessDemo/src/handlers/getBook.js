import {v4 as uuid} from 'uuid'
import AWS from'aws-sdk'
import createError from 'http-errors'
import middy from '@middy/core'
import httpJsonParser from '@middy/http-json-body-parser'

const dynamoDB = AWS.DynamoDB.DocumentClient();


async function createBook(event, context) {

   
    try{
      const result = await dynamoDB.scan({
          TableName: Books
      }).promise();
      const books = result.items; 
    }
    catch(error){
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ books }),
    };
  }
  
  export const handler = middy(createBook).use(httpErrorhandler()).use(httpEventNormalizer()).use(httpJsonBodyParser());  