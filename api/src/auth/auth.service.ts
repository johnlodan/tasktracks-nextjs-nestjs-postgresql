import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        const existingUser = await this.prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new HttpException('User with this email already exists', HttpStatus.CONFLICT); // 409
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const payload = { sub: newUser.id, email: newUser.email };
        const token = this.jwtService.sign(payload);

        return {
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        };
    }
}
