// ngzFocus directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, OnInit, ElementRef } from '@angular/core';

/**
 * [ngzFocus] directive
 * Focuses the parent element when loaded
 *
 * Usage:
 * <anything [ngzFocus] />
 */
@Directive({
  selector: '[ngzFocus]'
})
export class FocusDirective implements OnInit {

  constructor (private _el: ElementRef) {}

  public ngOnInit () {
    // FOcus element on load
    this._el.nativeElement.focus();
  }

}
