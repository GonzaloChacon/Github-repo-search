import {
    getIsFetching,
    getSelectedItems,
    getSelectedGithubObject
} from '../../src/selectors/selectors';

const state = {
    reposByGithub: {
        repotest: {
            isFetching: false,
            items: [{
                    title: 'repo1'
                },
                {
                    title: 'repo2'
                },
                {
                    title: 'repo3'
                }
            ]
        }
    },
    selectedGithub: 'repotest'
}

const expectedResult = [{
        title: 'repo1'
    },
    {
        title: 'repo2'
    },
    {
        title: 'repo3'
    }
];

const expectedRepotest = {
    isFetching: false,
    items: [{
            title: 'repo1'
        },
        {
            title: 'repo2'
        },
        {
            title: 'repo3'
        }
    ]
};


describe('getSelectedItems', function() {
    it('should return items', function() {
        getSelectedItems(state).should.eql(expectedResult);
    });

    it('should return empty array for unexisting filter', function() {
        const newState = Object.assign({}, state, { selectedGithub: 'anotherRepoTest' });
        getSelectedItems(newState).should.eql([]);
    });

    it('should cache response for the same state', function() {
        getSelectedItems(state).should.equal(getSelectedItems(state));
    });

    it('should select github object', function() {
        getSelectedGithubObject(state).should.eql(expectedRepotest);
    });

    it('should flag when it is fetching', function() {
        let newState = Object.assign({}, state, {});
        getIsFetching(newState).should.be.false;
        newState.reposByGithub.repotest.isFetching = true;
        getIsFetching(newState).should.be.true;
    });
});