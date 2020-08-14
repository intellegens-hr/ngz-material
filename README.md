# &lt;ngz-material /&gt;

Angular Material based components, services and other to be (re)used in other projects


## Usage

```ts
import { NgzMaterialModule } from '@intellegens/ngz-material'
```

### &lt;ngz-grid /&gt;

```ts
import { GridModule } from '@intellegens/ngz-material'
```

```html
<!-- Grid component:
      - [dataSource] Array of data to show as rows
      - [dataLength] Total number of rows available. Only required when doing API data management (pagination, ordering, filtering) via the (changed) event handler
      - [dataManageLocally] If false, table won't event attempt to do client-side ordering, pagination or filtering
      - [detectColumns] If columns should be detected directly from data source (if false, all displayed columns need to be manually specified)
      - (changed) Event allows outside component to provide managed data on any grid change (pagination, ordering, filtering)
-->
<ngz-grid #grid
  [dataSource]="dataSource"
  [dataLength]="dataSourceLength"
  [dataManageLocally]="true"
  [detectColumns]="true"
  (changed)="onGridChange($event)"
  [header]="true"
  [footer]="true">

  <!-- Configure filtering:
       - [hasFiltering] If filters should be displayed in grid header
  -->
  <ng-container ngzGridFilteringDef
    [hasFiltering]="true">
  </ng-container>

  <!-- Configure pagination:
       - [hasPagination] If pagination is displayed
       - [pageLengthOptions] Selectable numbers of rows per page
       - [defaultPageLength] Default number of rows per page
  -->
  <ng-container ngzGridPaginationDef
    [hasPagination]="true"
    [pageLengthOptions]="[5,10,15,25]"
    [defaultPageLength]="5">
  </ng-container>

  <!-- Configure column
       - ngzGridColumnDef="first" column key being configured
       - [header] Label in grid header
       - [footer] Label in grid footer
       - [hasOrdering] If column has ordering enabled (alternatively default sort by this column by passing 'asc'|'desc')
       - [hasFiltering] If column has filtering enabled
  -->
  <ng-container ngzGridColumnDef="first"
    [header]="'First Name'"
    [footer]="'First Name'"
    [hasOrdering]="true"
    [hasFiltering]="true">
  </ng-container> 

  <!-- Configure column
       - ngzGridColumnDef="last" column key being configured
  -->
  <ng-container ngzGridColumnDef="last">
    <!-- Provides template for grid header. Exposing values to be used inside the template:
         - config:  Column configuration
         - key:     Column key
         - caption: Column caption
         - values:  Values for this column from all rows
         - page:    Indices of first and last row on the currently displayed page
    -->
    <ng-container *ngzGridColumnHeaderCellTemplate="let config = config; let values = values">
      {{ config.header.toUpperCase() }}
    </ng-container>
    <!-- Provides template for grid cell. Exposing values to be used inside the template:
         - row:   Current [dataSource] row
         - key:   Column key
         - index: Row index
         - value: Column value in current [dataSource] row
    -->
    <ng-container *ngzGridColumnCellTemplate="let row = row; let key = key;">
      {{ row[key] }}
    </ng-container>
    <!-- Provides template for grid footer. Exposing values to be used inside the template:
         - config:  Column configuration
         - key:     Column key
         - caption: Column caption
         - values:  Values for this column from all rows
         - page:    Indices of first and last row on the currently displayed page
    -->
    <ng-container *ngzGridColumnFooterCellTemplate="let config = config; let values = values">
      Found {{ values.filter(name => (name.toLowerCase() === 'doe').length || '0' }} "Doe"s Total 
    </ng-container>
  </ng-container>

  <!-- Hide detected column:
       - ngzGridColumnDef="id" column key being configured
  -->
  <ng-container ngzGridColumnDef="id"
    [hidden]="true">
    <!-- Set call template, required for "virtual" columns -->
    <ng-container *ngzGridColumnCellTemplate="let row = row;">
      {{ row.last }}, {{ row.first }}
    </ng-container>
  </ng-container>      
  
  <!-- Add a virtual column (not connected directly to any data source property)
       - ngzGridColumnDef="full"
       - [virtual] Marks a column as not connected to data source property
  -->
  <ng-container ngzGridColumnDef="full"
    [virtual]="true"
    [header]="'Full Name'"
    [footer]="'Full Name'"
    [hasOrdering]="'asc'"
    [hasFiltering]="false">
    <!-- Set call template, required for "virtual" columns -->
    <ng-container *ngzGridColumnCellTemplate="let row = row;">
      {{ row.last }}, {{ row.first }}
    </ng-container>
  </ng-container>

  <!-- Alternative way of adding a virtual column -->
  <ng-container
    [header]="'Full Name'"
    [footer]="'Full Name'"
    [hasOrdering]="false"
    [hasFiltering]="false">
    <!-- Set call template, required for "virtual" columns -->
    <ng-container *ngzGridColumnFooterCellTemplate="let config = config; let values = values">
      Found {{ values.filter(name => (name.toLowerCase() === 'doe').length || '0' }} "Doe"s Total 
    </ng-container>
  </ng-container>

  <!-- Inject custom content on top -->
  <ng-container ngzGridInjectedContentDef [position]="'top'" [class]="'top-injected-tr'">
    <ng-container *ngzGridInjectedContentTemplate> Injected TOP #1 </ng-container>
  </ng-container>
  <ng-container ngzGridInjectedContentDef [position]="'top'" [class]="'top-injected-tr'">
    <ng-container *ngzGridInjectedContentTemplate> Injected TOP #2 </ng-container>
  </ng-container>

  <!-- Inject custom content on bottom -->
  <ng-container ngzGridInjectedContentDef [position]="'bottom'" [class]="'bottom-injected-tr'">
    <ng-container *ngzGridInjectedContentTemplate> Injected BOTTOM #1 </ng-container>
  </ng-container>
  <ng-container ngzGridInjectedContentDef [position]="'bottom'" [class]="'bottom-injected-tr'">
    <ng-container *ngzGridInjectedContentTemplate> Injected BOTTOM #2 </ng-container>
  </ng-container>

</ngz-grid>
```

```ts
  // Initialize data source (also supported Promise<object[]> or Observable<object[]>)
  this.dataSource: object[] = [
    { id: 1, first: 'Alice', last: 'Alison' },
    { id: 2, first: 'Bob', last: 'Bobber' },
    { id: 3, first: 'Charlie', last: 'Charlton' },
  ];
  // Public grid methods methods
  this.grid.updateOrdering({ orderingField: string, orderingAscDirection: boolean });
  this.grid.updatePagination({ pageIndex: number });
  this.grid.updateFiltering(key: string, value: any);
  this.grid.customizeRow(item => (item.id === this.dataSource[1].id), 'dark-bg', 2000);
  // Handle change event for API data management (pagination, ordering, filtering)
  this.onGridChange = (e) => {
    // Stop local management of data
    e.preventDefault();
    // Use some assumed api service to get managed data
    const res = await api.getData({
      orderingFiled:        e.state.orderingField,
      orderingAscDirection: e.state.orderingAscDirection,
      pageIndex:            e.state.pageIndex,
      pageLength:           e.state.pageLength,
      filters:              e.state.filters
    });
    this.dataSource = res.data;
    this.dataSourceLength = res.total;
  };
```

### &lt;ngz-grid-actions /&gt;

```ts
import { GridModule } from '@intellegens/ngz-material'
```

```html
<!-- Grid actions component:
    - [viewHref] If present will cause "view" action to render as anchor linking to provided URL (can be string, or array of partial path strings)
    - [viewTarget] Only used in conjunction with "viewHref", if present opens anchor links in set target window
    - (view) If present, "view" button will be displayed and this will be it's onClick callback
    - [editHref] If present will cause "edit" action to render as anchor linking to provided URL (can be string, or array of partial path strings)
    - [editTarget] Only used in conjunction with "editHref", if present opens anchor links in set target window
    - (edit) If present, "edit" button will be displayed and this will be it's onClick callback
    - [deleteHref] If present will cause "delete" action to render as anchor linking to provided URL (can be string, or array of partial path strings)
    - [deleteTarget] Only used in conjunction with "deleteHref", if present opens anchor links in set target window
    - (delete) If present, "delete" button will be displayed and this will be it's onClick callback

    If placed inside a <ngz-grid /> component it will automatically set up parent column's label and styling if not already specified.
-->
<ngz-grid-actions
  [viewHref]="'https://example.com'"
  [viewTarget]="'_blank'"
  (view)="doOptionalOnViewAction()"
  [editHref]="'https://example.com'"
  [editTarget]="'_blank'"
  (edit)="doOptionalOnEditAction()"
  [deleteHref]="['https://example.com', 'some', 'nested', 'path']"
  [deleteTarget]="'_blank'"
  (delete)="doOptionalOnDeleteAction()">

  <!-- Grid action component:
       - [icon] Action button icon
       - [label] Action button label
       - [href] If present will cause action to render as anchor linking to provided URL (can be string, or array of partial path strings)
       - [target] Only used in conjunction with "href", if present opens anchor links in set target window
       - (activated) On click callback for the action button
  -->
  <ngz-grid-action
    [icon]="'material_icon'"
    [label]="'Label describing the action'"
    [href]="https://example.com"
    [target]="'_blank"
    (activated)="doCustomAction()">
  </ngz-grid-action>

</ngz-grid-actions>
```

### &lt;ngz-modal /&gt;

```ts
import { ModalModule } from '@intellegens/ngz-material'
```

```html
<!-- Open by setting [visible] value -->
<button (click)="visible = true">Close</button>
<!-- Open modal using direct method call -->
<button (click)="modal.show()">Open</button>

<!-- Modal component:
     - [visible] Two-way bound value controlling modal visibility
     - [autoFocus] If, when open, modal should focus it's content
     - [disableClose] If true, closing the modal by clicking the overlay or pressing the escape key will be disabled
     - [closeOnNavigation] If modal should close on navigation events
-->
<ngz-modal #modal
  [(visible)]="visible"
  [autoFocus]="true"
  [disableClose]="false"
  [closeOnNavigation]="false">

  <!-- Content -->
  Content to be shown inside the modal

  <!-- Close by setting [visible] value -->
  <button (click)="visible = false">Close</button>
  <!-- Close modal using direct method call -->
  <button (click)="modal.hide()">Close</button>

</ng-modal>
```

```ts
// Set two-way bound visibility status
public visible = true
```

### [ngzFocus]

```ts
import { A11nModule } from '@intellegens/ngz-material'
```

```html
<!-- Focus directive, will focus parent element when initialized -->
<anything [ngzFocus]></anything>
```

### EnTTValidationMessagesService && enttValidationMessage(s) pipe

```ts
import {
  EnTTValidationMessagesService,
  EnTTValidationMessagePipe,
  EnTTValidationMessagesPipe
} from '@intellegens/ngz-material';
```

```ts
// Define default error message
EnTTValidationMessagesService.defineErrorMessageDefault('Invalid!');
// Define error messages by type
EnTTValidationMessagesService.defineErrorMessagesByType({
  required: 'This field is mandatory!',
  email:    'Expecting email address!',
  min:      'Shorter than minimum length allowed!',
  max:      'Longer than maximum length allowed!'
});
// Define custom error message mapper functions
EnTTValidationMessagesService.defineErrorMappers((err: EnttValidationError) => `Error was thrown with message "${ err.message }"!`);
```

```html
<!-- Output single error -->
{{ enttModelInstance.errors.propertyA[0] | enttValidationMessage }}

<!-- Output multiple errors -->
<div *ngFor="let err of enttModelInstance.errors.propertyA | enttValidationMessages"> {{ err }} </div>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Contributing

### Reporting issues

When reporting issues, please keep to provided templates.

Before reporting issues, please read: [GitHub Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/github.md)


### Contributing

For work-flow and general etiquette when contributing, please see:
- [Git Source-Control Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/git.md)
- [GitHub Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/github.md)
- [Angular Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/angular.md)

Please accompany any work, fix or feature with their own issue, in it's own branch (see [Git Source-Control Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/git.md) for branch naming conventions), and once done, request merge via pull request.

When creating issues and PRs, please keep to provided templates.
