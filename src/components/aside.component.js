class AsideController {
    constructor($ngRedux, $scope, GithubActions) {
        const unsubscribe = $ngRedux.connect(this.mapStateToThis, GithubActions)(this);
        this.handleChange = this.handleChange.bind(this);
        $scope.$on('$destroy', unsubscribe);
    }

    mapStateToThis(state) {
        return {
            selectedGithub: state.selectedGithub
        };
    }

    $onChanges(changes) {
        const { selectedGithub } = changes;
        if (selectedGithub && selectedGithub.currentValue !== selectedGithub.previousValue) {
            this.fetchReposIfNeeded(selectedGithub.currentValue);
        }
    }

    handleChange(nextGithub) {
        this.selectGithub(nextGithub);
    }
}

export const aside = {
    restrict: 'E',
    controller: AsideController,
    template: require('./aside.tpl.html')
}