import { Query, Resolver } from '@nestjs/graphql';

@Resolver('app')
export class AppResolver {
  @Query()
  async getData() {
    return 'GraphQL test response';
  }
}
