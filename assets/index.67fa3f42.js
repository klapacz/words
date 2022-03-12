import{c as M,a as h,b as L,d as b,j as R,e as W,C as E,s as l,W as F,r as t,L as T,u as m,f as x,g as U,S as B,R as S,h as I,F as N,P as O,B as P}from"./vendor.89d9793c.js";const A=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};A();var G=[{name:"German",items:[{name:"Zuerst",url:"/api/de/1.json"},{name:"8 Beruf und Arbeit",url:"/api/de/8-beruf-und-arbeit.json"},{name:"Test",url:"/api/de/t.json"}]},{name:"English",items:[{name:"Unit 1",url:"/api/en/1.json"},{name:"Unit 2",url:"/api/en/2.json"},{name:"Unit 6",url:"/api/en/6.json"},{name:"Bank s\u0142\xF3w",url:"/api/en/7.json"}]}];const f=e=>encodeURI(e.replace(/ /g,"-").toLowerCase()),y=e=>e.menu.menu,H=(e,r)=>M([y],n=>{for(const s of n)if(f(s.name)===e){for(const o of s.items)if(f(o.name)===r)return{category:s,wordSetMenuData:o};return null}return null}),J={menu:G},Z=h({name:"menu",initialState:J,reducers:{}});var q=Z.reducer;const g=L("wordSets/fetch",async e=>{const n=await(await fetch(R("/",e))).json();return[e,n.words]}),k=b("wordSets/setWordDone"),C=b("wordSets/setCurrentWordFailed "),K=e=>r=>r.wordSets.wordSets[e],Q=e=>r=>{const n=r.wordSets.wordSets[e].session;return n.words[n.current]},V=e=>r=>{const n=r.wordSets.wordSets[e];return[n.words.length-n.session.words.length,n.words.length]},X={wordSets:JSON.parse(window.localStorage.getItem("wordSets"))||{}},Y=h({name:"wordSets",initialState:X,reducers:{},extraReducers:e=>{e.addCase(k,(r,n)=>{const s=n.payload,o=r.wordSets[s].session,{failed:a}=o.words[o.current];if(!a||a===1){o.words=o.words.filter((u,d)=>d!==o.current);const c=r.wordSets[s].session.words.length-1,i=Math.floor(Math.random()*Math.floor(c));o.current=i;return}o.words[o.current].failed=o.words[o.current].failed-1}).addCase(C,(r,n)=>{const s=n.payload,o=r.wordSets[s].session;o.words[o.current].failed||(r.wordSets[s].session.words[o.current].failed=3)}).addCase(g.fulfilled,(r,n)=>{const[s,o]=n.payload,a=Object.entries(o).map(([u,d])=>({original:u,translation:d})),c=Math.floor(Math.random()*Math.floor(a.length-1)),i={words:a,session:{words:[...a],current:c}};r.wordSets[s]=i})}});var _=Y.reducer;const w=W({reducer:{menu:q,wordSets:_}});w.subscribe(()=>{window.localStorage.setItem("wordSets",JSON.stringify(w.getState().wordSets.wordSets))});const $=E`
	margin: 0;
	padding: 25px;
	list-style-type: none;
`,ee=l.ul`
	${$}
`,te=l.li`
	font-size: 1.2rem;
`,re=l.ol`
	${$}
`,oe=l.li`
	font-size: 1.1rem;

	> a {
		color: ${({theme:e})=>e.colors.blue};
		text-decoration: none;
	}
`,j=l.main`
	width: 100%;
	max-width: 700px;
	border: 1px solid #efefef;
	background-color: ${({theme:e})=>e.backgroundLight};
	margin: 5px;
`,ne=F`
	* {
		box-sizing: border-box;
	}

	body {
		min-height: 100vh;
		margin: 0;

		font-family: sans-serif;
		color: ${({theme:e})=>e.defaultForeground}
	}

	#root {
		min-height: 100vh;
		background-color: ${({theme:e})=>e.backgroundDark};

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}
`,se=({category:e})=>t.exports.createElement(te,null,e.name,t.exports.createElement(re,null,e.items.map(r=>t.exports.createElement(oe,{key:r.name},t.exports.createElement(T,{to:f(`/${e.name}/${r.name}`)},r.name))))),ae=()=>{const e=m(y);return t.exports.createElement("nav",null,t.exports.createElement(ee,null,e.map(r=>t.exports.createElement(se,{category:r,key:r.name}))))},le=()=>t.exports.createElement(j,null,t.exports.createElement(ae,null)),ce=l.nav`
	> ol {
		list-style-type: none;
		padding: 0;

		> li {
			display: inline-block;

			&:not(:last-of-type)::after {
				display: inline-block;
				color: #000;
				content: '>';
				padding: 0 6px;
			}
		}
	}
`,ie=l.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 5px solid ${({theme:e})=>e.backgroundDark};
`,de=l.button`
	${e=>e.full&&E`
			width: 100%;
			font-size: 120%;
			border-bottom: 5px solid ${({theme:r})=>r.backgroundDark} !important;
		`}

	border: 0;
	padding: 10px;
	font-family: inherit;
	color: #fff;
	background-color: ${({theme:e})=>e.colors.blue};
`,v=l.div`
	text-align: center;

	input {
		width: 100%;
		text-align: center;
		font-size: 120%;
		border: 0;
		border-top: 5px solid ${({theme:e})=>e.backgroundDark};
		padding: 10px 0;
	}
`,ue=l.div`
	text-align: center;
	background-color: #ef3038;
	color: #fff;
	padding: 10px 5px;
	border-top: 5px solid ${({theme:e})=>e.backgroundDark};
`,me=l.span`
	display: block;
	font-size: 200%;
	font-weight: bold;
`,z=({url:e,full:r=!1})=>{const n=x();return t.exports.createElement(de,{full:r,onClick:()=>n(g(e))},"Resetuj")},pe=({pageData:e})=>{const{wordSetMenuData:r,category:n}=e,{url:s}=r,o=x(),a=m(Q(s)),[c,i]=m(V(s)),[u,d]=t.exports.useState(""),D=p=>{p.preventDefault(),u.trim().toLowerCase()===a.original.trim().toLowerCase()?o(k(s)):o(C(s)),d("")};return t.exports.createElement("div",null,t.exports.createElement(ie,null,t.exports.createElement(ce,null,t.exports.createElement("ol",null,t.exports.createElement("li",null,n.name),t.exports.createElement("li",null,r.name),t.exports.createElement("li",{title:`uko\u0144czono ${c}/${i}`},c,"/",i))),t.exports.createElement(z,{url:s})),t.exports.createElement(v,null,t.exports.createElement("h1",null,a.translation),a.failed&&t.exports.createElement(ue,null,"B\u0142\u0105d! Poprawne t\u0142umaczenie to"," ",t.exports.createElement(me,null,a.original)," Wpisz je jeszcze"," ",t.exports.createElement("b",null,a.failed)," razy."),t.exports.createElement("form",{onSubmit:D},t.exports.createElement("input",{id:"to-translate",value:u,placeholder:"Poprawne t\u0142umaczenie",autoFocus:!0,autoComplete:"off",onChange:({target:p})=>d(p.value)}))))},fe=({pageData:e})=>{const{wordSetMenuData:r}=e,n=x(),s=m(K(r.url));return t.exports.useEffect(()=>{s||n(g(r.url))},[n,r,s]),t.exports.createElement(j,null,s?s.session.words.length?t.exports.createElement(pe,{pageData:e}):t.exports.createElement("div",null,t.exports.createElement(z,{full:!0,url:r.url}),t.exports.createElement(v,null,t.exports.createElement("p",null,"Zestaw s\u0142\xF3wek uko\u0144czony"))):"\u0141adowanie\u2026")},we=()=>{const{category:e,wordSet:r}=U(),n=m(H(e,r));return n?t.exports.createElement(fe,{pageData:n}):t.exports.createElement("main",null,"404")},xe=()=>t.exports.createElement(B,null,t.exports.createElement(S,{exact:!0,path:"/"},t.exports.createElement(le,null)),t.exports.createElement(S,{path:"/:category/:wordSet"},t.exports.createElement(we,null))),ge={backgroundDark:"#efefef",backgroundLight:"#fff",defaultForeground:"#333",colors:{blue:"#42a5f5"}};I.exports.render(t.exports.createElement(t.exports.StrictMode,null,t.exports.createElement(N,{theme:ge},t.exports.createElement(O,{store:w},t.exports.createElement(P,{basename:"/"},t.exports.createElement(xe,null))),t.exports.createElement(ne,null))),document.getElementById("root"));
