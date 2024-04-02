// @bun
var o=Object.create;var{defineProperty:g,getPrototypeOf:s,getOwnPropertyNames:r}=Object;var t=Object.prototype.hasOwnProperty;var UL=(D,L,U)=>{U=D!=null?o(s(D)):{};const B=L||!D||!D.__esModule?g(U,"default",{value:D,enumerable:!0}):U;for(let z of r(D))if(!t.call(B,z))g(B,z,{get:()=>D[z],enumerable:!0});return B};var BL=(D,L)=>()=>(L||D((L={exports:{}}).exports,L),L.exports);import{validate as LL} from"class-validator";var J;(function(D){D[D.PLAIN_TO_CLASS=0]="PLAIN_TO_CLASS",D[D.CLASS_TO_PLAIN=1]="CLASS_TO_PLAIN",D[D.CLASS_TO_CLASS=2]="CLASS_TO_CLASS"})(J||(J={}));var d=function(){function D(){this._typeMetadatas=new Map,this._transformMetadatas=new Map,this._exposeMetadatas=new Map,this._excludeMetadatas=new Map,this._ancestorsMap=new Map}return D.prototype.addTypeMetadata=function(L){if(!this._typeMetadatas.has(L.target))this._typeMetadatas.set(L.target,new Map);this._typeMetadatas.get(L.target).set(L.propertyName,L)},D.prototype.addTransformMetadata=function(L){if(!this._transformMetadatas.has(L.target))this._transformMetadatas.set(L.target,new Map);if(!this._transformMetadatas.get(L.target).has(L.propertyName))this._transformMetadatas.get(L.target).set(L.propertyName,[]);this._transformMetadatas.get(L.target).get(L.propertyName).push(L)},D.prototype.addExposeMetadata=function(L){if(!this._exposeMetadatas.has(L.target))this._exposeMetadatas.set(L.target,new Map);this._exposeMetadatas.get(L.target).set(L.propertyName,L)},D.prototype.addExcludeMetadata=function(L){if(!this._excludeMetadatas.has(L.target))this._excludeMetadatas.set(L.target,new Map);this._excludeMetadatas.get(L.target).set(L.propertyName,L)},D.prototype.findTransformMetadatas=function(L,U,B){return this.findMetadatas(this._transformMetadatas,L,U).filter(function(z){if(!z.options)return!0;if(z.options.toClassOnly===!0&&z.options.toPlainOnly===!0)return!0;if(z.options.toClassOnly===!0)return B===J.CLASS_TO_CLASS||B===J.PLAIN_TO_CLASS;if(z.options.toPlainOnly===!0)return B===J.CLASS_TO_PLAIN;return!0})},D.prototype.findExcludeMetadata=function(L,U){return this.findMetadata(this._excludeMetadatas,L,U)},D.prototype.findExposeMetadata=function(L,U){return this.findMetadata(this._exposeMetadatas,L,U)},D.prototype.findExposeMetadataByCustomName=function(L,U){return this.getExposedMetadatas(L).find(function(B){return B.options&&B.options.name===U})},D.prototype.findTypeMetadata=function(L,U){return this.findMetadata(this._typeMetadatas,L,U)},D.prototype.getStrategy=function(L){var U=this._excludeMetadatas.get(L),B=U&&U.get(void 0),z=this._exposeMetadatas.get(L),R=z&&z.get(void 0);if(B&&R||!B&&!R)return"none";return B?"excludeAll":"exposeAll"},D.prototype.getExposedMetadatas=function(L){return this.getMetadata(this._exposeMetadatas,L)},D.prototype.getExcludedMetadatas=function(L){return this.getMetadata(this._excludeMetadatas,L)},D.prototype.getExposedProperties=function(L,U){return this.getExposedMetadatas(L).filter(function(B){if(!B.options)return!0;if(B.options.toClassOnly===!0&&B.options.toPlainOnly===!0)return!0;if(B.options.toClassOnly===!0)return U===J.CLASS_TO_CLASS||U===J.PLAIN_TO_CLASS;if(B.options.toPlainOnly===!0)return U===J.CLASS_TO_PLAIN;return!0}).map(function(B){return B.propertyName})},D.prototype.getExcludedProperties=function(L,U){return this.getExcludedMetadatas(L).filter(function(B){if(!B.options)return!0;if(B.options.toClassOnly===!0&&B.options.toPlainOnly===!0)return!0;if(B.options.toClassOnly===!0)return U===J.CLASS_TO_CLASS||U===J.PLAIN_TO_CLASS;if(B.options.toPlainOnly===!0)return U===J.CLASS_TO_PLAIN;return!0}).map(function(B){return B.propertyName})},D.prototype.clear=function(){this._typeMetadatas.clear(),this._exposeMetadatas.clear(),this._excludeMetadatas.clear(),this._ancestorsMap.clear()},D.prototype.getMetadata=function(L,U){var B=L.get(U),z;if(B)z=Array.from(B.values()).filter(function($){return $.propertyName!==void 0});var R=[];for(var H=0,Q=this.getAncestors(U);H<Q.length;H++){var W=Q[H],C=L.get(W);if(C){var X=Array.from(C.values()).filter(function($){return $.propertyName!==void 0});R.push.apply(R,X)}}return R.concat(z||[])},D.prototype.findMetadata=function(L,U,B){var z=L.get(U);if(z){var R=z.get(B);if(R)return R}for(var H=0,Q=this.getAncestors(U);H<Q.length;H++){var W=Q[H],C=L.get(W);if(C){var X=C.get(B);if(X)return X}}return},D.prototype.findMetadatas=function(L,U,B){var z=L.get(U),R;if(z)R=z.get(B);var H=[];for(var Q=0,W=this.getAncestors(U);Q<W.length;Q++){var C=W[Q],X=L.get(C);if(X){if(X.has(B))H.push.apply(H,X.get(B))}}return H.slice().reverse().concat((R||[]).slice().reverse())},D.prototype.getAncestors=function(L){if(!L)return[];if(!this._ancestorsMap.has(L)){var U=[];for(var B=Object.getPrototypeOf(L.prototype.constructor);typeof B.prototype!=="undefined";B=Object.getPrototypeOf(B.prototype.constructor))U.push(B);this._ancestorsMap.set(L,U)}return this._ancestorsMap.get(L)},D}();var E=new d;function T(){if(typeof globalThis!=="undefined")return globalThis;if(typeof global!=="undefined")return global;if(typeof window!=="undefined")return window;if(typeof self!=="undefined")return self}function y(D){return D!==null&&typeof D==="object"&&typeof D.then==="function"}var e=function(D){var L=new D;if(!(L instanceof Set)&&!("push"in L))return[];return L},m=function(D,L,U){if(U||arguments.length===2){for(var B=0,z=L.length,R;B<z;B++)if(R||!(B in L)){if(!R)R=Array.prototype.slice.call(L,0,B);R[B]=L[B]}}return D.concat(R||Array.prototype.slice.call(L))},w=function(){function D(L,U){this.transformationType=L,this.options=U,this.recursionStack=new Set}return D.prototype.transform=function(L,U,B,z,R,H){var Q=this;if(H===void 0)H=0;if(Array.isArray(U)||U instanceof Set){var W=z&&this.transformationType===J.PLAIN_TO_CLASS?e(z):[];return U.forEach(function(Z,N){var F=L?L[N]:void 0;if(!Q.options.enableCircularCheck||!Q.isCircular(Z)){var A=void 0;if(typeof B!=="function"&&B&&B.options&&B.options.discriminator&&B.options.discriminator.property&&B.options.discriminator.subTypes){if(Q.transformationType===J.PLAIN_TO_CLASS){A=B.options.discriminator.subTypes.find(function(S){return S.name===Z[B.options.discriminator.property]});var O={newObject:W,object:Z,property:void 0},Y=B.typeFunction(O);if(A===void 0?A=Y:A=A.value,!B.options.keepDiscriminatorProperty)delete Z[B.options.discriminator.property]}if(Q.transformationType===J.CLASS_TO_CLASS)A=Z.constructor;if(Q.transformationType===J.CLASS_TO_PLAIN)Z[B.options.discriminator.property]=B.options.discriminator.subTypes.find(function(S){return S.value===Z.constructor}).name}else A=B;var P=Q.transform(F,Z,A,void 0,Z instanceof Map,H+1);if(W instanceof Set)W.add(P);else W.push(P)}else if(Q.transformationType===J.CLASS_TO_CLASS)if(W instanceof Set)W.add(Z);else W.push(Z)}),W}else if(B===String&&!R){if(U===null||U===void 0)return U;return String(U)}else if(B===Number&&!R){if(U===null||U===void 0)return U;return Number(U)}else if(B===Boolean&&!R){if(U===null||U===void 0)return U;return Boolean(U)}else if((B===Date||U instanceof Date)&&!R){if(U instanceof Date)return new Date(U.valueOf());if(U===null||U===void 0)return U;return new Date(U)}else if(!!T().Buffer&&(B===Buffer||U instanceof Buffer)&&!R){if(U===null||U===void 0)return U;return Buffer.from(U)}else if(y(U)&&!R)return new Promise(function(Z,N){U.then(function(F){return Z(Q.transform(void 0,F,B,void 0,void 0,H+1))},N)});else if(!R&&U!==null&&typeof U==="object"&&typeof U.then==="function")return U;else if(typeof U==="object"&&U!==null){if(!B&&U.constructor!==Object)if(!Array.isArray(U)&&U.constructor===Array);else B=U.constructor;if(!B&&L)B=L.constructor;if(this.options.enableCircularCheck)this.recursionStack.add(U);var C=this.getKeys(B,U,R),X=L?L:{};if(!L&&(this.transformationType===J.PLAIN_TO_CLASS||this.transformationType===J.CLASS_TO_CLASS))if(R)X=new Map;else if(B)X=new B;else X={};var $=function(Z){if(Z==="__proto__"||Z==="constructor")return"continue";var N=Z,F=Z,A=Z;if(!I.options.ignoreDecorators&&B){if(I.transformationType===J.PLAIN_TO_CLASS){var O=E.findExposeMetadataByCustomName(B,Z);if(O)A=O.propertyName,F=O.propertyName}else if(I.transformationType===J.CLASS_TO_PLAIN||I.transformationType===J.CLASS_TO_CLASS){var O=E.findExposeMetadata(B,Z);if(O&&O.options&&O.options.name)F=O.options.name}}var Y=void 0;if(I.transformationType===J.PLAIN_TO_CLASS)Y=U[N];else if(U instanceof Map)Y=U.get(N);else if(U[N]instanceof Function)Y=U[N]();else Y=U[N];var P=void 0,S=Y instanceof Map;if(B&&R)P=B;else if(B){var q=E.findTypeMetadata(B,A);if(q){var p={newObject:X,object:U,property:A},V=q.typeFunction?q.typeFunction(p):q.reflectedType;if(q.options&&q.options.discriminator&&q.options.discriminator.property&&q.options.discriminator.subTypes)if(!(U[N]instanceof Array)){if(I.transformationType===J.PLAIN_TO_CLASS){if(P=q.options.discriminator.subTypes.find(function(j){if(Y&&Y instanceof Object&&q.options.discriminator.property in Y)return j.name===Y[q.options.discriminator.property]}),P===void 0?P=V:P=P.value,!q.options.keepDiscriminatorProperty){if(Y&&Y instanceof Object&&q.options.discriminator.property in Y)delete Y[q.options.discriminator.property]}}if(I.transformationType===J.CLASS_TO_CLASS)P=Y.constructor;if(I.transformationType===J.CLASS_TO_PLAIN){if(Y)Y[q.options.discriminator.property]=q.options.discriminator.subTypes.find(function(j){return j.value===Y.constructor}).name}}else P=q;else P=V;S=S||q.reflectedType===Map}else if(I.options.targetMaps)I.options.targetMaps.filter(function(j){return j.target===B&&!!j.properties[A]}).forEach(function(j){return P=j.properties[A]});else if(I.options.enableImplicitConversion&&I.transformationType===J.PLAIN_TO_CLASS){var v=Reflect.getMetadata("design:type",B.prototype,A);if(v)P=v}}var c=Array.isArray(U[N])?I.getReflectedType(B,A):void 0,f=L?L[N]:void 0;if(X.constructor.prototype){var _=Object.getOwnPropertyDescriptor(X.constructor.prototype,F);if((I.transformationType===J.PLAIN_TO_CLASS||I.transformationType===J.CLASS_TO_CLASS)&&(_&&!_.set||X[F]instanceof Function))return"continue"}if(!I.options.enableCircularCheck||!I.isCircular(Y)){var x=I.transformationType===J.PLAIN_TO_CLASS?F:Z,G=void 0;if(I.transformationType===J.CLASS_TO_PLAIN)G=U[x],G=I.applyCustomTransformations(G,B,x,U,I.transformationType),G=U[x]===G?Y:G,G=I.transform(f,G,P,c,S,H+1);else if(Y===void 0&&I.options.exposeDefaultValues)G=X[F];else G=I.transform(f,Y,P,c,S,H+1),G=I.applyCustomTransformations(G,B,x,U,I.transformationType);if(G!==void 0||I.options.exposeUnsetFields)if(X instanceof Map)X.set(F,G);else X[F]=G}else if(I.transformationType===J.CLASS_TO_CLASS){var G=Y;if(G=I.applyCustomTransformations(G,B,Z,U,I.transformationType),G!==void 0||I.options.exposeUnsetFields)if(X instanceof Map)X.set(F,G);else X[F]=G}},I=this;for(var b=0,M=C;b<M.length;b++){var l=M[b];$(l)}if(this.options.enableCircularCheck)this.recursionStack.delete(U);return X}else return U},D.prototype.applyCustomTransformations=function(L,U,B,z,R){var H=this,Q=E.findTransformMetadatas(U,B,this.transformationType);if(this.options.version!==void 0)Q=Q.filter(function(W){if(!W.options)return!0;return H.checkVersion(W.options.since,W.options.until)});if(this.options.groups&&this.options.groups.length)Q=Q.filter(function(W){if(!W.options)return!0;return H.checkGroups(W.options.groups)});else Q=Q.filter(function(W){return!W.options||!W.options.groups||!W.options.groups.length});return Q.forEach(function(W){L=W.transformFn({value:L,key:B,obj:z,type:R,options:H.options})}),L},D.prototype.isCircular=function(L){return this.recursionStack.has(L)},D.prototype.getReflectedType=function(L,U){if(!L)return;var B=E.findTypeMetadata(L,U);return B?B.reflectedType:void 0},D.prototype.getKeys=function(L,U,B){var z=this,R=E.getStrategy(L);if(R==="none")R=this.options.strategy||"exposeAll";var H=[];if(R==="exposeAll"||B)if(U instanceof Map)H=Array.from(U.keys());else H=Object.keys(U);if(B)return H;if(this.options.ignoreDecorators&&this.options.excludeExtraneousValues&&L){var Q=E.getExposedProperties(L,this.transformationType),W=E.getExcludedProperties(L,this.transformationType);H=m(m([],Q,!0),W,!0)}if(!this.options.ignoreDecorators&&L){var Q=E.getExposedProperties(L,this.transformationType);if(this.transformationType===J.PLAIN_TO_CLASS)Q=Q.map(function($){var I=E.findExposeMetadata(L,$);if(I&&I.options&&I.options.name)return I.options.name;return $});if(this.options.excludeExtraneousValues)H=Q;else H=H.concat(Q);var C=E.getExcludedProperties(L,this.transformationType);if(C.length>0)H=H.filter(function($){return!C.includes($)});if(this.options.version!==void 0)H=H.filter(function($){var I=E.findExposeMetadata(L,$);if(!I||!I.options)return!0;return z.checkVersion(I.options.since,I.options.until)});if(this.options.groups&&this.options.groups.length)H=H.filter(function($){var I=E.findExposeMetadata(L,$);if(!I||!I.options)return!0;return z.checkGroups(I.options.groups)});else H=H.filter(function($){var I=E.findExposeMetadata(L,$);return!I||!I.options||!I.options.groups||!I.options.groups.length})}if(this.options.excludePrefixes&&this.options.excludePrefixes.length)H=H.filter(function(X){return z.options.excludePrefixes.every(function($){return X.substr(0,$.length)!==$})});return H=H.filter(function(X,$,I){return I.indexOf(X)===$}),H},D.prototype.checkVersion=function(L,U){var B=!0;if(B&&L)B=this.options.version>=L;if(B&&U)B=this.options.version<U;return B},D.prototype.checkGroups=function(L){if(!L)return!0;return this.options.groups.some(function(U){return L.includes(U)})},D}();var h={enableCircularCheck:!1,enableImplicitConversion:!1,excludeExtraneousValues:!1,excludePrefixes:void 0,exposeDefaultValues:!1,exposeUnsetFields:!0,groups:void 0,ignoreDecorators:!1,strategy:void 0,targetMaps:void 0,version:void 0};var K=function(){return K=Object.assign||function(D){for(var L,U=1,B=arguments.length;U<B;U++){L=arguments[U];for(var z in L)if(Object.prototype.hasOwnProperty.call(L,z))D[z]=L[z]}return D},K.apply(this,arguments)},i=function(){function D(){}return D.prototype.instanceToPlain=function(L,U){var B=new w(J.CLASS_TO_PLAIN,K(K({},h),U));return B.transform(void 0,L,void 0,void 0,void 0,void 0)},D.prototype.classToPlainFromExist=function(L,U,B){var z=new w(J.CLASS_TO_PLAIN,K(K({},h),B));return z.transform(U,L,void 0,void 0,void 0,void 0)},D.prototype.plainToInstance=function(L,U,B){var z=new w(J.PLAIN_TO_CLASS,K(K({},h),B));return z.transform(void 0,U,L,void 0,void 0,void 0)},D.prototype.plainToClassFromExist=function(L,U,B){var z=new w(J.PLAIN_TO_CLASS,K(K({},h),B));return z.transform(L,U,void 0,void 0,void 0,void 0)},D.prototype.instanceToInstance=function(L,U){var B=new w(J.CLASS_TO_CLASS,K(K({},h),U));return B.transform(void 0,L,void 0,void 0,void 0,void 0)},D.prototype.classToClassFromExist=function(L,U,B){var z=new w(J.CLASS_TO_CLASS,K(K({},h),B));return z.transform(U,L,void 0,void 0,void 0,void 0)},D.prototype.serialize=function(L,U){return JSON.stringify(this.instanceToPlain(L,U))},D.prototype.deserialize=function(L,U,B){var z=JSON.parse(U);return this.plainToInstance(L,z,B)},D.prototype.deserializeArray=function(L,U,B){var z=JSON.parse(U);return this.plainToInstance(L,z,B)},D}();function u(D,L,U){return a.plainToInstance(D,L,U)}var a=new i;var n=function(D,L){return function(U,B,z){if(!k[U.constructor.name])k[U.constructor.name]={query:{},mutation:{},subscription:{}};k[U.constructor.name][D][B]={input:[],description:L.description,type:L.type};const R=Reflect.getOwnMetadata("design:paramtypes",U,B);for(let Q of R)k[U.constructor.name][D][B].input.push(Q.name);const H=z.value;z.value=async function(){for(let Q=0;Q<R.length;Q++){const W=R[Q];if(typeof W==="function"&&W.prototype!==void 0){const C=u(W,arguments[Q]),X=await LL(C);if(X.length>0)throw X}}return H.apply(this,arguments)}}},k={},wL=(D)=>n("query",D),hL=(D)=>n("mutation",D);export{wL as query,hL as mutation,k as Modules};
