import {
    getSelectedItems,
    getIsFetching
} from '../selectors/selectors';

class MainController {

    constructor($ngRedux, $scope, GithubActions) {
        const unsubscribe = $ngRedux.connect(this.mapStateToThis, GithubActions)(this);
        $scope.$on('$destroy', unsubscribe);
    }

    mapStateToThis(state) {
        return {
            selectedGithub: state.selectedGithub,
            items: getSelectedItems(state),
            isFetching: getIsFetching(state),
            isInvalidUser: state.isInvalidUser,
            apiDown: state.apiDown
        };
    }
}

const main = {
    restrict: 'E',
    controllerAs: 'main',
    controller: MainController,
    template: require('./main.tpl.html'),
    bindings: {}
}

export { main }