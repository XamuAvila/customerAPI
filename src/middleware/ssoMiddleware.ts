import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { SsoService } from 'src/auth/sso/sso.service';

class ExtendedModuleInit implements OnModuleInit{
    onModuleInit() {
        throw new Error('Method not implemented.');
    }
}

@Injectable()
export class SsoMiddleware  extends ExtendedModuleInit implements NestMiddleware {
    private ssoService: SsoService
    constructor(
        private moduleRef: ModuleRef
        ) { 
        super();
    }

    async onModuleInit() {
        this.ssoService = await this.moduleRef.create(SsoService)
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const response = await this.ssoService.auth({
            "grant_type": "client_credentials",
            "client_id": "customers",
            "client_secret": "453000f7-47a0-4489-bc47-891c742650e2",
            "username": "samuel.avila250899@gmail.com",
            "password": "c2FtdWVsLmF2aWxhMjUwODk5QGdtYWlsLmNvbQ==",
            "scope": "openid"
        });
        response.subscribe(
            (success) => {
                next();
            },
            (error) => {
                res.status(400).json({
                    "message": "Falha ao autenticar na Vitta Seguros "
                })
            }
        )
    }
}
