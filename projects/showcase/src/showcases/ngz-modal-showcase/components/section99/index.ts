// <ngz-grid-showcase-section-01 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, ViewChild } from '@angular/core';
import { NgzModalComponent } from '../../../../../../ngz-material/src/lib';

@Component({
  selector: 'ngz-modal-showcase-section-next',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgzModalShowcaseSectionNextComponent {

  @ViewChild('modal', { read: NgzModalComponent })
  private _modal: NgzModalComponent = null;

  public _visible = false;
  public _show () { this._modal.show(); }
  public _hide () { this._modal.hide(); }

}
