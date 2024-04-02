// @bun
import{validate as I} from"class-validator";import{plainToInstance as A} from"class-transformer";var j=function(P,z){return function(w,U,f){if(!L[w.constructor.name])L[w.constructor.name]={query:{},mutation:{},subscription:{}};L[w.constructor.name][P][U]={input:[],description:z.description,type:z.type};const F=Reflect.getOwnMetadata("design:paramtypes",w,U);for(let B of F)L[w.constructor.name][P][U].input.push(B.name);const G=f.value;f.value=async function(){for(let B=0;B<F.length;B++){const J=F[B];if(typeof J==="function"&&J.prototype!==void 0){const x=A(J,arguments[B]),Q=await I(x);if(Q.length>0)throw Q}}return G.apply(this,arguments)}}},L={},C=(P)=>j("query",P),N=(P)=>j("mutation",P);import"reflect-metadata";import H from"typedi";import{validationMetadatasToSchemas as O} from"class-validator-jsonschema";var b={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"*","Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"*"};function D(P){const z=P.CORS_HEADERS||b,w=O();return Bun.serve({port:P.port,async fetch(f){if(f.method==="OPTIONS")return new Response("Departed",{headers:z});const F=new URL(f.url),G=P.routes[F.pathname];if(!G)throw{status:404,message:`Can not found path ${F.pathname}`};if(f.method==="GET"){const k={};for(let K in G){k[K]=L[G[K].name];for(let W in k[K])for(let Z in k[K][W])k[K][W][Z].input=k[K][W][Z].input.map(($)=>({name:$,...w[$]}))}return Response.json(k)}if(!f.body||f.method!=="POST")throw new Error("Invalid Request, either use client lib or follow Bunt way!");const B=await f.json(),J=G[B.e];if(!J)throw{status:404,message:B.e+" controller not found"};const x=H.get(J),Q=x?.[B.m];if(!Q)throw{status:404,message:`Can not found handler under ${B.e}/${B.m}`};x.ctx={headers:f.headers,_headers:{},status:200,set:function(k){this._headers=k}};const V=await Q.apply(x,B.args),X={...z,...x.ctx._headers},Y=x.ctx.status||200;if(typeof V==="string")return Response.json({message:V},{status:Y,headers:X});return Response.json(V,{status:Y,headers:X})},error(f){return Response.json({message:f.message||f,err:f},{status:f.status||400,headers:z})}})}export{D as default};