// EnTT service
// ----------------------------------------------------------------------------

// Import dependencies
import { Injectable } from '@angular/core';
import { EnttValidationError } from '@ofzza/entt-rxjs';

/**
 * EnTT validation messages service
 */
@Injectable()
export class EnTTValidationMessagesService {

  /**
   * Holds default validation message
   */
  private static _errorMessageDefault = 'Invalid!';

  /**
   * Default error messages by validation error type
   */
  private static _errorMessagesByType = {
    required: 'This field is mandatory!',
    email:    'Expecting email address!',
    min:      'Shorter than minimum length allowed!',
    max:      'Longer than maximum length allowed!'
  };

  /**
   * Error mapping functions, attempt to match a validation error to a user-friendly message
   */
  private static _errorMappers: ((EnttValidationError) => string)[] = [
    // Default error mapper
    (err: EnttValidationError) => null
  ];

  /**
   * Defines a default validation error user-friendly message
   * @param message Default validation error user-friendly message
   */
  public defineErrorMessageDefault (message: string) {
    EnTTValidationMessagesService._errorMessageDefault = message;
  }

  /**
   * Defines error messages by validation error type
   * @param errors Hashmap of error messages by validation type
   */
  public defineErrorMessagesByType (errors: object) {
    for (const type in errors) {
      if (errors.hasOwnProperty(type)) {
        EnTTValidationMessagesService._errorMessagesByType[type] = errors[type];
      }
    }
  }

  /**
   * Defines mapping functions, mapping from a validation error to a user-friendly message
   * @param mapperFns Mapping functions, mapping from a validation error to a user-friendly message
   */
  public defineErrorMappers (mapperFns: ((EnttValidationError) => string)[]) {
    EnTTValidationMessagesService._errorMappers.push(...mapperFns);
  }

  /**
   * Returns user-friendly message corresponding to provided validation errors
   * @param errs Array of validation errors
   * @returns Array of user-friendly message corresponding to provided validation errors
   */
  public getMessages (errs: EnttValidationError[]) {
    // Initialize error messages
    const messages = {};
    // Process errors
    for (const err of errs) {
      // Find errors mapped by type
      const messageByType = EnTTValidationMessagesService._errorMessagesByType[err.type];
      if (messageByType) {
        messages[messageByType] = messageByType;
      }
      // Find errors mapped by error mapper
      for (const errorMapper of EnTTValidationMessagesService._errorMappers) {
        const msgByErrorMapper = errorMapper(err);
        if (msgByErrorMapper) {
          messages[msgByErrorMapper] = msgByErrorMapper;
        }
      }
    }
    // Return matched messages
    const messageArray = Object.keys(messages);
    return (messageArray.length ? messageArray : [EnTTValidationMessagesService._errorMessageDefault]);
  }

}
