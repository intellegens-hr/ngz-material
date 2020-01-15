// EnTT pipes
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { EnttValidationError } from '@ofzza/entt-rxjs';
import { EnTTValidationMessagesService } from '../../services';

/**
 * EnTT validation message pipe
 */
@Pipe({ name: 'enttValidationMessage' })
export class EnTTValidationMessagePipe implements PipeTransform {
  constructor (private _validationMessages: EnTTValidationMessagesService) {}
  public transform (error: EnttValidationError): string {
    return this._validationMessages.getMessage(error);
  }
}

/**
 * EnTT validation messages pipe
 */
@Pipe({ name: 'enttValidationMessages' })
export class EnTTValidationMessagesPipe implements PipeTransform {
  constructor (private _validationMessages: EnTTValidationMessagesService) {}
  public transform (errors: EnttValidationError[]): string[] {
    return errors.map(err => this._validationMessages.getMessage(err));
  }
}
