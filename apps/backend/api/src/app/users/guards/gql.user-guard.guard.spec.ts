import { GqlUserGuard } from './gql.user-guard.guard';

describe('GqlUserGuard', () => {
  it('should be defined', () => {
    expect(new GqlUserGuard()).toBeDefined();
  });
});
