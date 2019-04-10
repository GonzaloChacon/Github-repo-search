class AppController {
    constructor($scope) {
        this.handleChange = this.handleChange.bind(this);
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

export const pureApp = {
    controllerAs: 'app',
    controller: AppController,
    template: require('./app.tpl.html'),
    bindings: {
        selectedGithub: '<',
        items: '<',
        isFetching: '<',
        isInvalidUser: '<',
        apiDown: '<',
        selectGithub: '<',
        fetchReposIfNeeded: '<'
    }
};
