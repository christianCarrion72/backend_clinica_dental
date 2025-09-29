import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    /*async register({correo, contraseña}: RegisterDto){
        const user = await this.usersService.findOneByEmail(correo);
        if (user) {
            throw new BadRequestException('Usuario ya existe');
        }
        return await this.usersService.create({
            correo, 
            contraseña: await bcryptjs.hash(contraseña, 10),
        });
    }*/
    
    async login({ correo, contraseña }: LoginDto ){
        const user = await this.usersService.findOneByEmail(correo);
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const isPasswordValid = await bcryptjs.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = { 
            correo: user.correo,
            id: user.id,
            rol: user.rol
        };
        
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            correo,
            rol: user.rol?.nombre
        };
    }
}
