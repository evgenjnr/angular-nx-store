import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// В дополнение к расширению логики обработки ошибок и аутентификации по умолчанию, мы можем разрешить аутентификации проходить через цепочку стратегий.
// export class JwtAuthGuard extends AuthGuard(['strategy_jwt_1', 'strategy_jwt_2', '...']) { ... }

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // extends logic
  // canActivate(context: ExecutionContext) {
  // Add your custom authentication logic here
  // for example, call super.logIn(request) to establish a session.
  // return super.canActivate(context);
  //   }
  //   handleRequest(err, user, info) {
  // You can throw an exception based on either "info" or "err" arguments
  //     if (err || !user) {
  //       throw err || new UnauthorizedException();
  //     }
  //     return user;
  //   }
}
