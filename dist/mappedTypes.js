// @bun
import"./chunk-dca050bf006c970a.js";import{IsOptional as F} from"class-validator";import{getMetadataStorage as D} from"class-validator";function H(b){class E extends b{constructor(){super(...arguments)}}const x=D().getTargetValidationMetadatas(E,E.name,!0,!1),j=new Set(x?.map((q)=>q.propertyName));return{class:E,keys:j}}function u(b,E,x){const j=D();j.getTargetValidationMetadatas(b,b.name,!0,!1).forEach((z)=>{if(x(z.propertyName))j.addValidationMetadata({...z,target:E})})}function L(b){const E=H(b);return E.keys.forEach((x)=>{F()(E.class.prototype,x)}),E.class}function N(b,E){class x{}return u(b,x,(q)=>{return E.includes(q)}),x}function Q(b,E){class x{}return u(b,x,(q)=>{return!E.includes(q)}),x}function U(b,E){class x extends b{constructor(){super(...arguments)}}return u(E,x,()=>!0),x}export{u as inheritMetaValidators,N as PickType,L as PartialType,Q as OmitType,U as IntersectionType,H as GetShallowClass};
