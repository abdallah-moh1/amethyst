## Amethyst v0.5.7

### Fixed

- **Trash delete reliability:** Fixed `.trash` rename failures when deleting empty notebooks and nested notes on Windows.
- **Unique trash paths:** Deleted items now use unique `.trash` destinations to avoid collisions.

## Amethyst v0.5.6

### Added

- **Added Trash:** Deleted items are now moved to `.trash` folder inside the facet so on accidental delete the data can still be retrieved

### Known limitations

- **Deletion Confirmation:** Confirm on delete is still to be added
- **Manual trash retrieval:** Trash is just a folder and not supported for in app recovery to recover you will have to manually copy the file/folder from `$HOME/.amethyst/.trash`
