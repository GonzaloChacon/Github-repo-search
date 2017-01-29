class ReposController {}

const repos = {
    controller: ReposController,
    template: require('./repos.tpl.html'),
    bindings: {
        repos: '<',
        test: '<'
    }
};

export { repos };