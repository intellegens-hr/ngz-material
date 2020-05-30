#### v1.0.7

- `ngz-grid > ng-container[ngzGridColumnDef][hasOrdering]` now supports values of `'asc'` and `'desc'` to provide default sorting by this column

#### v1.0.6

- New `ngz-grid[dataManageLocally]` attribute, controlling if grid should even attempt client-side data management
- New `grid.customizeRow()` method, used to provide a way to customize a row
- `EnTTValidationMessagesService` will now keep handle types as case insensitive

#### v1.0.5

- Support for column keys to be paths, not just property names, pointing to nested properties, like "nested.child.name"

#### v1.0.4

- Making sure publishing to NPM captures correct README.md

#### v1.0.3

- Added CHANGELOG.md
- Updated package description, repository, keywords, license and author for publishing
- Updated to Angular 9.1.6, Angular Material 9.2.3

## v1.0.2, Stable version

- NgzMaterialModule
  - GridModule
    - <ngz-grid /> component
      - <ngz-grid-actions /> component
      - <ngz-grid-action /> component
  - ModalModule
    - <ngz-modal /> component
  - A11nModule
    - [ngzFocus] directive
  - other:
    - EnTT validation messages
      - EnTTValidationMessagesService service
      - "enttValidationMessage" and "enttValidationMessages" pipes
