// @bun
function C(u){return function(w){const b=Object.getOwnPropertyNames(w.prototype);for(let F of b){if(F==="constructor")continue;const $=w.prototype[F];w.prototype[F]=async function(...j){return await u.call(this),$.apply(this,j)}}}}var q={title:"This is general Response Schema",bsonType:"object",required:["message"],properties:{message:{bsonType:"string"},refId:{bsontype:"string"}}};class v extends Error{status;meta;constructor(u,w,b){super(u);this.status=w,this.meta=b}}class z extends v{constructor(u){super(u,404)}}function x(u){let w="";if(u.bsonType==="object")for(let b in u.properties){if(b==="_id")continue;let F=A[u.properties[b].bsonType];if(F==="object")F=x(u.properties[b]);w+=` ${b}${!u.required.includes(b)?"?":""} : ${F}, \n`}return"{ \n"+w+"}"}function J(u,w){const $=`
//***** This is auto generated types ***//
import { ObjectId } from 'mongodb';

${[{name:"GeneralResponse",schema:q}].concat(u).map((j)=>`export interface I${j.name} ${x(j.schema)}`).join("\n")}
// *** Please do not touch unless you know what you are doing ***//
`;if(w)return Bun.write(w,$);return $}var A={string:"string",bool:"boolean",objectId:"string",int:"number",double:"number"};export{J as SchemaTypeGenerator,x as Generate};
