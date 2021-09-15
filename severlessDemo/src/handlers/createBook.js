import {v4 as uuid} from 'uuid'
import AWS from'aws-sdk'
import createError from 'http-errors'


async function createBook(event, context) {
    const book = {
        id = uuid(),
        title,
        author,
        image_url,
        description
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'create BOOK' }),
    };
  }
  
  export const handler = createBook;