// EnTT service
// ----------------------------------------------------------------------------

// Import dependencies
import { Injectable } from '@angular/core';
import { EnttValidationError } from '@ofzza/entt-rxjs';

// Define types
type MapperFunction = (err: EnttValidationError) => string;

/**
 * EnTT instance management helper
 */
@Injectable()
export class EnTTManagerService {

  /**
   * Gets a deeply nested object property value by it's path
   * @param obj Object to extract nested value from
   * @param path Path to value
   */
  public getByPath (obj: any, path: string) {
    if (obj === undefined || path === undefined) {
      return undefined;
    }
    let keys = path.replace(/\[/g, '.').replace(/\]/g, '').split('.'),
        target = obj;
    while (keys.length) {
      // if part of the path does not exist - return undefined
      if (target[keys[0]] === undefined){
        return undefined;
      }
      target = target[keys[0]];
      keys = keys.slice(1);
    }
    return target;
  }

  /**
   * Sets a deeply nested object property value by it's path
   * @param obj Object to set nested value to
   * @param path Path to value
   * @param value Value to set
   */
  public setByPath (obj: any, path: string, value: any) {
    if (obj === undefined || path === undefined) {
      return undefined;
    }
    let keys = path.replace(/\[/g, '.').replace(/\]/g, '').split('.'),
        target = obj;
    while (keys.length > 1) {
      target = target[keys[0]];
      keys = keys.slice(1);
    }
    return target[keys[0]] = value;
  }

}

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
  private static _errorMappers: MapperFunction[] = [
    // Default error mapper
    // (err: EnttValidationError) => null
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
        EnTTValidationMessagesService._errorMessagesByType[type.toLowerCase()] = errors[type];
      }
    }
  }

  /**
   * Defines mapping functions, mapping from a validation error to a user-friendly message
   * @param mapperFns Mapping functions, mapping from a validation error to a user-friendly message
   */
  public defineErrorMappers (mapperFns: MapperFunction[]) {
    EnTTValidationMessagesService._errorMappers.push(...mapperFns);
  }

  /**
   * Returns user-friendly message corresponding to provided validation error
   * @param errs Validation errors
   * @returns User-friendly message corresponding to provided validation error
   */
  public getMessage (err: EnttValidationError) {
    // Initialize message
    let message;
    // Find errors mapped by type
    const messageByType = EnTTValidationMessagesService._errorMessagesByType[err.type.toLowerCase()];
    if (messageByType) {
      message = messageByType;
    }
    // Find errors mapped by error mapper
    for (const errorMapper of EnTTValidationMessagesService._errorMappers) {
      const msgByErrorMapper = errorMapper(err);
      if (msgByErrorMapper) {
        message = msgByErrorMapper;
      }
    }
    // Return message
    return message;
  }

}
