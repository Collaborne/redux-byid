# redux-byid [![Build Status](https://travis-ci.org/Collaborne/redux-byid.svg?branch=master)](https://travis-ci.org/Collaborne/redux-byid)

A helper for redux that allows to distribute an action to one specific part of a map of similar "things".

This [blog post](https://medium.com/collaborne-engineering/redux-pattern-byid-reducers-323a863fa64e?source=friends_link&sk=e48bad30e5d950abf98f366c001f03aa) details the background of this library.

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
            return {id: action.item_id, data: action.data};
        case 'item/updated':
            return {id: action.item_id, data: action.updated};
        case 'item/deleted':
            // Item is deleted, return undefined. byId will drop out the state.
            return undefined;
        default:
            return state;
    }
}

/**
 * Actual reducer, produces a map of item id -> item reducer.
 */
const reducer = byId(action => action.item_id, itemReducer);
```

## License

    This software is licensed under the Apache 2 license, quoted below.

    Copyright 2011-2019 Collaborne B.V. <http://github.com/Collaborne/>

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy of
    the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations under
    the License.
