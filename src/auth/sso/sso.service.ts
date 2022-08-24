import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { SsoAuthRequest } from './dto/ssoAuthRequestDto';
import { SsoAuthResponse } from './dto/ssoAuthResponseDto';
import * as https from 'https';

@Injectable()
export class SsoService {
    private readonly BASE_URL: string;

    constructor(private readonly httpService: HttpService) {
        this.BASE_URL = process.env.SSO_BASE_URL ?? "";
    }

    async auth(data: SsoAuthRequest): Promise<Observable<AxiosResponse<SsoAuthResponse>>> {
        const options = {
            url: `${this.BASE_URL}realms/careers/protocol/openid-connect/token`,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            data : data,
            
        }
        return this.httpService.post<SsoAuthResponse>(`${this.BASE_URL}realms/careers/protocol/openid-connect/token`, data, {
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': '6', 
                'Accept': '*/*',
                'Host': '201.17.225.94:3000',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            httpsAgent : new https.Agent({
                rejectUnauthorized: false
            }),
            method: 'POST',
            proxy: false
        });
    }
}
