import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService
    ){}

    @Mutation(()=>LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context){
        return this.authService.login(context.user)
    }

    @Mutation(()=>User)
    signup(@Args('loginUserInput') loginUserInput: LoginUserInput){//to be changed
        return this.authService.signup(loginUserInput)
    }
}