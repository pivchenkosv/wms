import {LOAD_CELLS, CELLS_WATCHER} from "../types/cells";

export const loadCellsWatcher = (resolve) => {
    return {
        type: CELLS_WATCHER,
        resolve: resolve
    }
}

export const loadCellsAction = (cells) => {
    return {
        type: LOAD_CELLS,
        payload: cells
    }
}