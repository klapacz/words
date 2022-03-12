import{c as D,a as h,b as M,d as b,j as W,e as F,C as E,s as l,W as U,r as t,L as B,u as m,f as x,g as T,S as A,R as g,h as I,F as N,P as O,B as P}from"./vendor.89d9793c.js";const _=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};_();var G=[{name:"German",items:[{name:"Zuerst",url:"/api/de/1.json"},{name:"8 Beruf und Arbeit",url:"/api/de/8-beruf-und-arbeit.json"},{name:"Test",url:"/api/de/t.json"}]},{name:"English",items:[{name:"Unit 1",url:"/api/en/1.json"},{name:"Unit 2",url:"/api/en/2.json"},{name:"Unit 6",url:"/api/en/6.json"},{name:"Bank s\u0142\xF3w",url:"/api/en/7.json"}]}];const f=e=>encodeURI(e.replace(/ /g,"-").toLowerCase()),y=e=>e.menu.menu,H=(e,r)=>D([y],n=>{for(const s of n)if(f(s.name)===e){for(const o of s.items)if(f(o.name)===r)return{category:s,wordSetMenuData:o};return null}return null}),J={menu:G},Z=h({name:"menu",initialState:J,reducers:{}});var q=Z.reducer;const k={BASE_URL:"/words/"},S=M("wordSets/fetch",async e=>{const n=await(await fetch(W(k.BASE_URL,e))).json();return[e,n.words]}),C=b("wordSets/setWordDone"),v=b("wordSets/setCurrentWordFailed "),K=e=>r=>r.wordSets.wordSets[e],Q=e=>r=>{const n=r.wordSets.wordSets[e].session;return n.words[n.current]},V=e=>r=>{const n=r.wordSets.wordSets[e];return[n.words.length-n.session.words.length,n.words.length]},X={wordSets:JSON.parse(window.localStorage.getItem("wordSets"))||{}},Y=h({name:"wordSets",initialState:X,reducers:{},extraReducers:e=>{e.addCase(C,(r,n)=>{const s=n.payload,o=r.wordSets[s].session,{failed:a}=o.words[o.current];if(!a||a===1){o.words=o.words.filter((u,d)=>d!==o.current);const c=r.wordSets[s].session.words.length-1,i=Math.floor(Math.random()*Math.floor(c));o.current=i;return}o.words[o.current].failed=o.words[o.current].failed-1}).addCase(v,(r,n)=>{const s=n.payload,o=r.wordSets[s].session;o.words[o.current].failed||(r.wordSets[s].session.words[o.current].failed=3)}).addCase(S.fulfilled,(r,n)=>{const[s,o]=n.payload,a=Object.entries(o).map(([u,d])=>({original:u,translation:d})),c=Math.floor(Math.random()*Math.floor(a.length-1)),i={words:a,session:{words:[...a],current:c}};r.wordSets[s]=i})}});var ee=Y.reducer;const w=F({reducer:{menu:q,wordSets:ee}});w.subscribe(()=>{window.localStorage.setItem("wordSets",JSON.stringify(w.getState().wordSets.wordSets))});const $=E`
	margin: 0;
	padding: 25px;
	list-style-type: none;
`,te=l.ul`
	${$}
`,re=l.li`
	font-size: 1.2rem;
`,oe=l.ol`
	${$}
`,ne=l.li`
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
`,se=U`
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
`,ae=({category:e})=>t.exports.createElement(re,null,e.name,t.exports.createElement(oe,null,e.items.map(r=>t.exports.createElement(ne,{key:r.name},t.exports.createElement(B,{to:f(`/${e.name}/${r.name}`)},r.name))))),le=()=>{const e=m(y);return t.exports.createElement("nav",null,t.exports.createElement(te,null,e.map(r=>t.exports.createElement(ae,{category:r,key:r.name}))))},ce=()=>t.exports.createElement(j,null,t.exports.createElement(le,null)),ie=l.nav`
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
`,de=l.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 5px solid ${({theme:e})=>e.backgroundDark};
`,ue=l.button`
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
`,z=l.div`
	text-align: center;

	input {
		width: 100%;
		text-align: center;
		font-size: 120%;
		border: 0;
		border-top: 5px solid ${({theme:e})=>e.backgroundDark};
		padding: 10px 0;
	}
`,me=l.div`
	text-align: center;
	background-color: #ef3038;
	color: #fff;
	padding: 10px 5px;
	border-top: 5px solid ${({theme:e})=>e.backgroundDark};
`,pe=l.span`
	display: block;
	font-size: 200%;
	font-weight: bold;
`,L=({url:e,full:r=!1})=>{const n=x();return t.exports.createElement(ue,{full:r,onClick:()=>n(S(e))},"Resetuj")},fe=({pageData:e})=>{const{wordSetMenuData:r,category:n}=e,{url:s}=r,o=x(),a=m(Q(s)),[c,i]=m(V(s)),[u,d]=t.exports.useState(""),R=p=>{p.preventDefault(),u.trim().toLowerCase()===a.original.trim().toLowerCase()?o(C(s)):o(v(s)),d("")};return t.exports.createElement("div",null,t.exports.createElement(de,null,t.exports.createElement(ie,null,t.exports.createElement("ol",null,t.exports.createElement("li",null,n.name),t.exports.createElement("li",null,r.name),t.exports.createElement("li",{title:`uko\u0144czono ${c}/${i}`},c,"/",i))),t.exports.createElement(L,{url:s})),t.exports.createElement(z,null,t.exports.createElement("h1",null,a.translation),a.failed&&t.exports.createElement(me,null,"B\u0142\u0105d! Poprawne t\u0142umaczenie to"," ",t.exports.createElement(pe,null,a.original)," Wpisz je jeszcze"," ",t.exports.createElement("b",null,a.failed)," razy."),t.exports.createElement("form",{onSubmit:R},t.exports.createElement("input",{id:"to-translate",value:u,placeholder:"Poprawne t\u0142umaczenie",autoFocus:!0,autoComplete:"off",onChange:({target:p})=>d(p.value)}))))},we=({pageData:e})=>{const{wordSetMenuData:r}=e,n=x(),s=m(K(r.url));return t.exports.useEffect(()=>{s||n(S(r.url))},[n,r,s]),t.exports.createElement(j,null,s?s.session.words.length?t.exports.createElement(fe,{pageData:e}):t.exports.createElement("div",null,t.exports.createElement(L,{full:!0,url:r.url}),t.exports.createElement(z,null,t.exports.createElement("p",null,"Zestaw s\u0142\xF3wek uko\u0144czony"))):"\u0141adowanie\u2026")},xe=()=>{const{category:e,wordSet:r}=T(),n=m(H(e,r));return n?t.exports.createElement(we,{pageData:n}):t.exports.createElement("main",null,"404")},Se=()=>t.exports.createElement(A,null,t.exports.createElement(g,{exact:!0,path:"/"},t.exports.createElement(ce,null)),t.exports.createElement(g,{path:"/:category/:wordSet"},t.exports.createElement(xe,null))),ge={backgroundDark:"#efefef",backgroundLight:"#fff",defaultForeground:"#333",colors:{blue:"#42a5f5"}};I.exports.render(t.exports.createElement(t.exports.StrictMode,null,t.exports.createElement(N,{theme:ge},t.exports.createElement(O,{store:w},t.exports.createElement(P,{basename:k.BASE_URL},t.exports.createElement(Se,null))),t.exports.createElement(se,null))),document.getElementById("root"));
