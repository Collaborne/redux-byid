# redux-byid [![Build Status](https://travis-ci.org/Collaborne/redux-byid.svg?branch=master)](https://travis-ci.org/Collaborne/redux-byid)

A helper for redux that allows to distribute an action to one specific part of a map of similar "things".

## Usage

```sh
npm install --save redux-byid
```

You can then define a "by-id" state:
```js
const { byId } = require('redux-byid');

/**
 * Reducer for a single item
 */
function itemReducer(state, action) {
    switch (action.type) {
        case 'item/added':
            return {id: action.id, data: action.data};
        case 'item/updated':
            return {id: action.id, data: action.updated};
        case 'item/deleted':
            // Item is deleted, return undefined. byId will drop out the state.
            return undefined;
        default:
            return state;
    }
}

/**
 * Extract the item id for this reducer
 */
function extractId(action) {
    const isActionForItem = action.type.startsWith('item/');
    if (!isActionForItem) {
        // Not relevant, return undefined (alternatively an empty id)
        // The itemReducer will not be invoked.
        return undefined;
    }

    return action.id;
}

/**
 * Actual reducer, produces a map of item id -> item reducer.
 */
const reducer = byId(extractId, itemReducer);
```

## License

    This software is licensed under the Apache 2 license, quoted below.

    Copyright 2011-2018 Collaborne B.V. <http://github.com/Collaborne/>

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy of
    the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations under
    the License.
