class SearchController {}

const search = {
    controller: SearchController,
    template: require('./search.tpl.html'),
    bindings: {
        value: '<',
        onChange: '='
    }
};

export { search };