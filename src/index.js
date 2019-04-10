import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';
import githubActions from './actions/github.actions';

/* Containers */
import {
    main,
    pureApp
} from './containers';

/* Components */
import {
    search,
    repos,
    aside
} from './components';

/* Styles */
import '../styles/main.scss';

angular.module('repoFinder', [
        ngRedux
    ])
    .config(($ngReduxProvider) => {
        // chrome extension:
        const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f;
        $ngReduxProvider.createStoreWith(rootReducer, [thunk, createLogger()], [devTools]);
    })
    .service('GithubActions', githubActions)
    .component('compApp', pureApp)
    .component('compMain', main)
    .component('compAside', aside)
    .component('compSearch', search)
    .component('compRepos', repos);
