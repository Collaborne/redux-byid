import { expect } from 'chai';
import { AnyAction, Store, createStore } from 'redux';

import { byId } from '..';

interface ItemState {
	id: string;
	data: string;
}

function itemReducer(state: ItemState|undefined, action: AnyAction): ItemState|undefined {
	switch (action.type) {
	case 'item/added':
		return {id: action.id, data: action.data};
	case 'item/updated':
		return {id: action.id, data: action.updated};
	case 'item/deleted':
		return undefined;
	default:
		return state;
	}
}
function extractId(action: AnyAction) {
	const isActionForItem = action.type.startsWith('item/');
	if (!isActionForItem) {
		return undefined;
	}

	return action.id;
}
const reducer = byId(extractId, itemReducer);

describe('redux-byid', () => {
	describe('smoke', () => {
		let store: Store;
		beforeEach(() => {
			store = createStore(reducer);
		});
		it('adds element', () => {
			store.dispatch({type: 'item/added', id: 'item1', data: 'foo'});
			expect(store.getState()).to.have.property('item1');
		});
		it('removes element', () => {
			store.dispatch({type: 'item/added', id: 'item1', data: 'foo'});
			expect(store.getState()).to.have.property('item1');
			store.dispatch({type: 'item/deleted', id: 'item1'});
			expect(store.getState()).to.not.have.property('item1');
		});
	});
});
