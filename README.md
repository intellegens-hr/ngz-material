# &lt;ngz-material /&gt;

Angular Material based components, services and other to be (re)used in other projects


## Usage

### &lt;ngz-grid /&gt;

```html
<!-- Grid component:
      - [dataSource] Array of data to show as rows
      - [dataLength] Total number of rows available. Only required when doing API data management (pagination, ordering, filtering) via the (changed) event handler
      - (changed) Event allows outside component to provide managed data on any grid change (pagination, ordering, filtering)
      - [detectColumns] If columns should be detected directly from data source (if false, all displayed columns need to be manually specified)
-->
<ngz-grid #grid
  [dataSource]="dataSource"
  [dataLength]="dataSourceLength"
  (changed)="onGridChange($event)"
  [detectColumns]="true"
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
       - [hasOrdering] If column has ordering enabled
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
    [hasOrdering]="false"
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
  // Handle change event for API data management (pagination, ordering, filtering)
  this.onGridChange = (e) => {
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


### &lt;ngz-modal /&gt;

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
