// EnTT pipes
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { EnttValidationError } from '@ofzza/entt-rxjs';
import { EnTTValidationMessagesService } from '../../services';

/**
 * EnTT validation messages pipe
 */
@Pipe({ name: 'enttValidationMessages' })
export class EnTTValidationMessagesPipe implements PipeTransform {
  constructor (private _validationMessages: EnTTValidationMessagesService) {}
  public transform (errors: EnttValidationError[]): string[] {
    return this._validationMessages.getMessages(errors);
  }
}
