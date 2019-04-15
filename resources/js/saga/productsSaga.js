import { takeLatest, call, put } from 'redux-saga/effects';
import { loadProducts as loadProductsApi} from "../components/api";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {PRODUCTS_WATCHER} from "../types/products";
import {loadProductsAction} from "../actions/products";

function* productsEffectSaga(action) {
    try {
        yield put(showLoading())

        let {data}  = yield call(loadProductsApi);

        yield put(loadProductsAction(data.data));

        action.resolve(data.data)
    } finally {
        yield put(hideLoading())
    }
}

export function* productsWatcherSaga() {
    yield takeLatest(PRODUCTS_WATCHER, productsEffectSaga);
}
