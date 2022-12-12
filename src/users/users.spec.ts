import { expect } from 'chai';
import { mockUsers, mockResults, mockUsersWithoutBalance } from '../../mocks/mocks';
import { formatUserAccounts, updateUserBalance } from './users';

describe('Users', () => {
  describe('updateUserBalance', () => {
    it('mutates the given users object and updates balance for each user', () => {
      updateUserBalance(mockUsersWithoutBalance);
      expect(mockUsersWithoutBalance).to.deep.equal(mockUsers);
    });
  });

  describe('formatUserAccounts', () => {
    it('returns array of accounts with total payments, order and balance for users', () => {
      expect(formatUserAccounts(mockUsers)).to.deep.equal(mockResults);
    });
  });
});
