import {v4 as uuid} from 'uuid'
import AWS from'aws-sdk'
import createError from 'http-errors'
import middy from '@middy/core'
import httpJsonParser from '@middy/http-json-body-parser'

const dynamoDB = AWS.DynamoDB.DocumentClient();


async function createBook(event, context) {

    const {title , author , image_url , description} = event.body
    const book = {
        id = uuid(),
        title,
        author,
        image_url,
        description
    }

    try{
        await dynamoDB.put({
         TableName: Books,
         Item: book   
        }).promise();
    }
    catch(error){
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: book}),
    };
  }
  
  export const handler = middy(createBook).use(httpErrorhandler()).use(httpEventNormalizer()).use(httpJsonBodyParser());  