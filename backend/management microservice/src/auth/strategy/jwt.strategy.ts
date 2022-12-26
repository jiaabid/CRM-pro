import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "src/prisma/prisma.service";
import { customError } from "src/utils/helper.util";
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "crm"
        });
    }

    async validate(payload) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: payload.sub
            }
        })
        if (user) {
            if (!user.isActive) {
                throw new BadRequestException("Your account is deactivated!")
            }
            return user
        }
        throw new UnauthorizedException()

    }
}