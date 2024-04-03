// @bun
import{MongoClient as w,ServerApiVersion as y} from"mongodb";import{Container as z} from"typedi";async function H(f=process.env.MONGO_URI||"mongodb://localhost:27017",x=process.env.MONGO_DB||"bunt"){k=new w(f,{serverApi:{version:y.v1,strict:!0}}),await k.connect(),console.log("db connected"),j=k.db(x);const u=await j.listCollections({type:"collection"},{nameOnly:!0}).toArray();for(let q of u)h[q.name]=j.collection(q.name);return k}async function B(f,x){if(!j)throw new Error("Either client not connected or Database not found");if(!h[f])h[f]=await j.createCollection(f,{validator:x});return z.set(f,h[f]),h[f]}function I(f){f.forEach((x)=>B(x.name,x.validator))}var h={},k=null,j=null;export{I as registerModels,j as db,H as connect,k as client,B as Model};
