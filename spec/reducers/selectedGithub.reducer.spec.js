import {
    selectedGithub,
    isInvalidUser,
    apiDown
} from '../../src/reducers/reducers';

import {
    REQUEST_REPOS,
    RECEIVE_REPOS,
    SELECT_GITHUB,
    INVALID_USER,
    API_DOWN
} from '../../src/actions/_actions';

describe('selectedGithub reducer', function() {
    it('should set initial state to redux', function() {
        selectedGithub(undefined, {}).should.equal('redux')
    });

    it('should ignore unknown action', function() {
        const state = {};
        selectedGithub(state, { type: 'UNKOWN_ACTION' }).should.equal(state);
    });

    it('should set selected github', function() {
        const state = 'redux';
        const action = { type: SELECT_GITHUB, github: 'newuser' };
        selectedGithub(state, action).should.equal('newuser');
    });

    it('should flag when user is invalid', function() {
        const state = false;
        isInvalidUser(state, { type: 'INVALID_USER' }).should.be.true;
        isInvalidUser(state, { type: 'UNKOWN_ACTION' }).should.be.false;
    });

    it('should flag when api is down', function() {
        const state = false;
        apiDown(state, { type: 'API_DOWN' }).should.be.true;
        apiDown(state, { type: 'UNKOWN_ACTION' }).should.be.false;
    });
});
