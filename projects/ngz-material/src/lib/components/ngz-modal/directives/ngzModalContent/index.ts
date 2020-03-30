// [NgzModalContent] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input, ContentChild, TemplateRef } from '@angular/core';


/**
 * When child of <ngz-modal /> component, marks content to display inside te modal
 *
 * Usage:
 *
 * <ng-container *NgzGridColumnHeaderCellTemplate="let config = config; let key = key; let value = value">
 *  {{ value.toUpperCase() }}
 * </ng-container>
 */
@Directive({
  selector: '[NgzModalContent]'
})
export class NgzModalContentDirective {}
