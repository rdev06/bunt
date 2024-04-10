import 'reflect-metadata';
import Container from 'typedi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Modules } from './decorators';
import { Ctx, outputSchema } from './common';

const _CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': '*'
};

interface IBuntOption {
  routes: Record<string, Record<string, Function>>;
  port?: number;
  CORS_HEADERS?: Record<string, string>;
}

interface IBody {
  e: string,
  m: string,
  args: any[]
}

export default function bunt(option: IBuntOption) {
  const CORS_HEADERS = option.CORS_HEADERS || _CORS_HEADERS;
  const schemas = validationMetadatasToSchemas();
  const server = Bun.serve({
    port: option.port,
    async fetch(req: Request) {
      if (req.method === 'OPTIONS') {
        return new Response('Departed', { headers: CORS_HEADERS });
      }
      if (req.method === 'PATCH') {
        const body: any = await req.json();
        if (!body.n) throw { status: 400, message: `Name is required is field name 'n'` };
        switch (body.t) {
          case 'i':
            return Response.json(schemas[body.n]);
          case 'o':
            return Response.json(outputSchema[body.n]);
          default:
            throw { status: 400, message: 'Unsupported type' };
        }
      }
      const url = new URL(req.url);
      const Module = option.routes[url.pathname];
      if (!Module) {
        throw { status: 404, message: `Can not found path ${url.pathname}` };
      }
      if (req.method === 'GET') {
        return Response.json(Modules);
      }
      if (!req.body || req.method !== 'POST') throw new Error('Invalid Request, either use client lib or follow Bunt way!');
      const body: IBody = await req.json() as IBody;
      const Controller = Module[body.e];
      if (!Controller) {
        throw { status: 404, message: body.e + ' controller not found' };
      }

      const ctx = {
        headers: req.headers,
        _headers: {},
        status: 200,
        set: function(headers) {
          this._headers = headers;
        }
      };
      Container.set(Ctx, ctx);
      const Entity = Container.get(Controller);
      const handler = Entity?.[body.m];
      if (!handler) {
        throw { status: 404, message: `Can not found handler under ${body.e}/${body.m}` };
      }
      const res = await handler.apply(Entity, body.args || []);
      const headersToSend = { ...CORS_HEADERS, ...ctx._headers };
      const status = ctx.status || 200;
      if (typeof res === 'string') {
        return Response.json({ message: res }, { status, headers: headersToSend });
      }
      return Response.json(res, { status, headers: headersToSend });
    },
    error(err: { message?: string; status?: number }) {
      return Response.json({ message: err.message || err, err }, { status: err.status || 400, headers: CORS_HEADERS });
    }
  });

  return server;
}
