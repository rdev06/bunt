// @bun
import{b as j} from"./common.js";import"./useDb.js";import"./chunk-dca050bf006c970a.js";function q(b){let w="";if(b.bsonType==="object")for(let u in b.properties){if(u==="_id")continue;let $=v[b.properties[u].bsonType];if($==="object")$=q(b.properties[u]);w+=` ${u}${!b.required.includes(u)?"?":""} : ${$}, \n`}return"{ \n"+w+"}"}function z(b,w){const d=`
//***** This is auto generated types ***//
import { ObjectId } from 'mongodb';

${[{name:"GeneralResponse",schema:j}].concat(b).map((g)=>`export interface I${g.name} ${q(g.schema)}`).join("\n")}
// *** Please do not touch unless you know what you are doing ***//
`;if(w)return Bun.write(w,d);return d}var v={string:"string",bool:"boolean",objectId:"string",int:"number",double:"number"};export{z as SchemaTypeGenerator,q as Generate};
