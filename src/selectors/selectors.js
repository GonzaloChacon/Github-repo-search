import { createSelector } from 'reselect'

const EMPTY_ITEMS = {
    items: [],
    isFetching: true,
    isInvalidUser: false
};

const getSelectedGithubObject = (state) => {
    return state.reposByGithub[state.selectedGithub] || EMPTY_ITEMS;
}

const getIsFetching = (state) => {
    return getSelectedGithubObject(state).isFetching;
}

const getSelectedItems = (state) => {
    return getSelectedGithubObject(state).items;
}

const getItemsCount = createSelector(
    getSelectedItems,
    (items) => items.length
);


export {
    getSelectedGithubObject,
    getIsFetching,
    getSelectedItems,
    getItemsCount
}