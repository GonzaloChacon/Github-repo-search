import * as types from './_actions';

function selectGithub(github) {
    return {
        type: types.SELECT_GITHUB,
        github
    };
}

function requestRepos(github) {
    return {
        type: types.REQUEST_REPOS,
        github
    };
}

function isInvalidUser() {
    return {
        type: types.INVALID_USER
    };
}

function apiNotRespond(github) {
    return {
        type: types.API_DOWN,
    };
}

function receiveRepos(github, json) {
    return {
        type: types.RECEIVE_REPOS,
        github: github,
        repos: json
    };
}

export default function githubActions($http) {
    function fetchRepos(github) {
        return dispatch => {
            dispatch(requestRepos(github));
            return $http.get(`https://api.github.com/users/${github}/repos`)
                .then(response => {
                    return response.data
                })
                .catch(function(error) {
                    switch (error.status) {
                        case 404:
                            dispatch(isInvalidUser());
                            break;
                        default:
                            dispatch(apiNotRespond());
                    };
                    throw error;
                })
                .then(json => {
                    dispatch(receiveRepos(github, json))
                });
        };
    }

    function shouldFetchRepos(state, github) {
        const repos = state.reposByGithub[github];
        if (!repos) {
            return true;
        }
        if (repos.isFetching) {
            return false;
        }
        return repos.didInvalidate;
    }

    function fetchReposIfNeeded(github) {
        return (dispatch, getState) => {
            if (shouldFetchRepos(getState(), github)) {
                return dispatch(fetchRepos(github));
            }
        };
    }

    return {
        selectGithub,
        fetchReposIfNeeded
    };
}
