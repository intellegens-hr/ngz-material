// <ngz-modal /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterViewInit, OnChanges, SimpleChanges, OnDestroy,
         Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
  templateUrl: 'index.html',
  styleUrls:   ['style.scss']
})
export class ModalComponent implements AfterViewInit, OnChanges, OnDestroy {

  //#region HTML component interface (@Inputs/@Outputs/@Content)

  /**
   * If modal is displayed or not
   */
  @Input()
  public visible = false;
  @Output()
  public visibleChange = new EventEmitter();

  /**
   * If modal should focus first child component when opened
   */
  @Input()
  public autoFocus = true;
  /**
   * If modal should disabled closing on overlay click and escape keypress
   */
  @Input()
  public disableClose = false;
  /**
   * If modal should close on navigation events
   */
  @Input()
  public closeOnNavigation = false;

  /**
   * Content to be displayed inside the modal
   */
  @ViewChild('content', { read: TemplateRef })
  public _content: TemplateRef<any> = null;

  ////#endregion

  //#region Properties

  /**
   * Opened dialog reference
   */
  private _dialogRef: any = null;

  /**
   * Holds changes queued for processing before modal was initialized
   */
  private _queuedChanges = [];

  ////#endregion

  //#region Component life-cycle

  constructor (private _dialog: MatDialog) {}

  public ngAfterViewInit () {
    // Process queued changes
    for (const changes of this._queuedChanges) {
      this.ngOnChanges(changes);
    }
  }

  public ngOnChanges (changes: SimpleChanges) {
    // Check if already initialized
    if (this._content) {

      // Process changes
      if (changes.visible) {
        if (changes.visible.currentValue) {
          // Open dialog
          this.show();
        } else {
          // Close dialog
          this.hide();
        }
      }

    } else {

      // Queue changes for later processing
      this._queuedChanges.push(changes);

    }
  }

  public ngOnDestroy () {
      // Close previous dialog, if shown
      this.hide();
  }

  ////#endregion

  //#region Exposed methods for managing the component

  /**
   * Shows modal
   */
  public show () {
    if (!this._dialogRef && this._content) {
      // Configure and open dialog
      const config = new MatDialogConfig();
      config.autoFocus         = this.autoFocus;
      config.closeOnNavigation = this.closeOnNavigation;
      config.disableClose      = this.disableClose;
      this._dialogRef = this._dialog.open(this._content, config);
      // Trigger change
      this.visibleChange.emit(true);
      // Subscribe to dialog close
      this._dialogRef.afterClosed().subscribe(() => {
        // Trigger change
        this.visibleChange.emit(false);
      });
    }
  }

  /**
   * Hides modal
   */
  public hide () {
    if (this._dialogRef) {
      // Close dialog
      this._dialogRef.close();
      this._dialogRef = null;
      // Trigger change
      this.visibleChange.emit(false);
    }
  }

  ////#endregion

}
