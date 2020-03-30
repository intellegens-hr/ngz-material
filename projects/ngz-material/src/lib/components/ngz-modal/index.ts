// <ngz-modal /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, OnChanges, SimpleChanges, Input, ContentChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgzModalContentDirective } from './directives/ngzModalContent';

/**
 * Modal component, based on Angular material's <mat-modal />
 * Supports:
 * - TODO: ...
 *
 * Usage:
 * <ngz-modal>\
 *  TODO: Add a full usage syntax example\
 * </ngz-modal>
 */
@Component({
  selector:    'ngz-modal',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class NgzModalComponent implements OnChanges {

  //#region HTML component interface (@Inputs/@Outputs/@Content)

  /**
   * If modal is displayed or not
   */
  @Input()
  public visible = false;

  /**
   * Content to be displayed inside the modal
   */
  @ContentChild(NgzModalContentDirective, { read: TemplateRef })
  public content: TemplateRef<any> = null;

  ////#endregion

  //#region Properties

  /**
   * Opened dialog reference
   */
  private _dialogRef: any = null;

  ////#endregion

  //#region Component life-cycle

  constructor (private _dialog: MatDialog) {}

  public ngOnChanges (changes: SimpleChanges) {
    if (changes.visible) {
      // Close previous dialog, if shown
      this._closePreviousModalDialog();
      // Open in new dialog
      this._openModalDialog();
    }
  }

  ////#endregion

  //#region Exposed methods for managing the component

  /**
   * Shows modal
   */
  public show () {
    this.visible = true;
    this._openModalDialog();
  }

  /**
   * Hides modal
   */
  public hide () {
    this.visible = false;
    this._closePreviousModalDialog();
  }

  ////#endregion

  //#region Internal methods

  /**
   * Closes previously opened modal dialog (if found)
   */
  private _closePreviousModalDialog () {
    if (this._dialogRef) {
      this._dialogRef.close();
      this._dialogRef = null;
    }
  }

  /**
   * Opens modal using MatDialog service
   */
  private _openModalDialog () {
    this._closePreviousModalDialog();
    if (this.visible && this.content) {
      this._dialogRef = this._dialog.open(this.content);
    }
  }

  //#endregion

}
