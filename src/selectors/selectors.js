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


export {
    getSelectedGithubObject,
    getIsFetching,
    getSelectedItems
}