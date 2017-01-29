import { combineReducers } from 'redux-seamless-immutable';
import Immutable from 'seamless-immutable';
import {
    SELECT_GITHUB,
    REQUEST_REPOS,
    RECEIVE_REPOS,
    INVALID_USER,
    API_DOWN
} from '../actions/_actions';

export function selectedGithub(state = 'goeuro', action) {
    switch (action.type) {
        case SELECT_GITHUB:
            return action.github;
        default:
            return state;
    }
}

function repos(state = Immutable({
    isFetching: false,
    didInvalidate: false,
    items: []
}), action) {
    switch (action.type) {
        case REQUEST_REPOS:
            return state.merge({
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_REPOS:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                items: action.repos
            });
        default:
            return state;
    }
}

export function reposByGithub(state = Immutable({}), action) {
    switch (action.type) {
        case RECEIVE_REPOS:
        case REQUEST_REPOS:
            return state.set(action.github, repos(state[action.github], action));
        default:
            return state;
    }
}

export function isInvalidUser(state = false, action) {
    switch (action.type) {
        case INVALID_USER:
            return true;
        default:
            return false;
    }
}

export function apiDown(state = false, action) {
    switch (action.type) {
        case API_DOWN:
            return true;
        default:
            return false;
    }
}

const rootReducer = combineReducers({
    reposByGithub,
    selectedGithub,
    isInvalidUser,
    apiDown
});

export default rootReducer;