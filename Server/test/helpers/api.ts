import * as requestSupertest from 'supertest';
import { INestApplication } from '@nestjs/common';

export class Api {
  private token: string | null = null;

  constructor(private app: INestApplication) {}

  async login(id: string) {
    // This is temp solution where options go to token as is.
    // When auth will be implemented code will be changed
    this.token = JSON.stringify({ id });
  }

  logout() {
    this.token = null;
  }

  get request() {
    return {
      login: () => this.sendRequest('/auth/login', 'POST'),
      getPermissions: () => this.sendRequest('/api/v1/permissions', 'GET'),
    };
  }

  private sendRequest(url: string, method: HTTP_METHOD): requestSupertest.Test {
    const request = requestSupertest(this.app.getHttpServer());

    let instance: requestSupertest.Test;
    if (method === 'GET') instance = request.get(url);
    else if (method === 'POST') instance = request.post(url);
    else if (method === 'PATCH') instance = request.patch(url);
    else if (method === 'PUT') instance = request.put(url);
    else if (method === 'DELETE') instance = request.delete(url);
    else throw new Error(`Unexpected http method ${method}`);

    if (this.token) instance.set('Authorization', `Bearer ${this.token}`);

    return instance;
  }
}

type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
