import { IndexUniqueEnum } from '@enums/common';
import { ExceptionFilter, Catch, ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(exception: QueryFailedError) {
    let message = 'Database error';
    console.log(exception.message);
    if (
      exception.message.includes(IndexUniqueEnum.IDX_USER_PHONE_NUMBER_UNIQUE)
    ) {
      message = 'Phone number already exists';
    } else if (
      exception.message.includes(IndexUniqueEnum.IDX_USER_EMAIL_UNIQUE)
    ) {
      message = 'Email already exists';
    }
    throw new ConflictException(message);
  }
}
