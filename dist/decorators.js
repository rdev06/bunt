// @bun
import{validate as G} from"class-validator";import{plainToInstance as H} from"class-transformer";var D=function(b,A){return function(j,w,B){if(!k[j.constructor.name])k[j.constructor.name]={query:{},mutation:{},subscription:{}};k[j.constructor.name][b][w]={input:[],description:A.description,type:A.type};const x=Reflect.getOwnMetadata("design:paramtypes",j,w);for(let f of x)k[j.constructor.name][b][w].input.push(f.name);const E=B.value;B.value=async function(){for(let f=0;f<x.length;f++){const z=x[f];if(typeof z==="function"&&z.prototype!==void 0){const F=H(z,arguments[f]),C=await G(F);if(C.length>0)throw C}}return E.apply(this,arguments)}}},k={},L=(b)=>D("query",b),O=(b)=>D("mutation",b);export{L as query,O as mutation,k as Modules};
export{k as a};