(this.webpackJsonpfontweb=this.webpackJsonpfontweb||[]).push([[6],{137:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return c}));var r=n(90);function a(e){return Object(r.a)({url:"/users/register",method:"post",data:e})}function s(e){return Object(r.a)({url:"/users/sendPhone",method:"post",data:{phone:e}})}function c(e){return Object(r.a)({url:"/users/login",method:"post",data:e})}},138:function(e,t,n){},284:function(e,t,n){},434:function(e,t,n){"use strict";n.r(t);n(195);var r=n(198),a=(n(101),n(75)),s=(n(58),n(284),n(231)),c=(n(234),n(96)),o=(n(196),n(72)),i=(n(197),n(199)),u=n(89),l=n.n(u),m=(n(121),n(117)),j=n(122),d=n(160),b=n(0),f=n(1),h=n(437),p=n(438),x=n(137),O=(n(138),n(3)),g=Object(f.g)((function(e){var t=Object(b.useState)(!1),n=Object(d.a)(t,2),u=n[0],f=n[1],g=function(){var t=Object(j.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Received values of form: ",n),t.next=3,Object(x.a)(n);case 3:if(r=t.sent,console.log(r),200!==r.status){t.next=13;break}if(f(!0),localStorage.setItem("token",r.token),null===localStorage.getItem("token")){t.next=11;break}return e.history.push("/"),t.abrupt("return");case 11:t.next=15;break;case 13:f(!0),m.b.error("\u8d26\u53f7\u6216\u5bc6\u7801\u9519\u8bef");case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(O.jsx)(r.a,{className:"login animated fadeIn",children:Object(O.jsx)("div",{className:"model",children:Object(O.jsxs)("div",{className:"login-form",children:[Object(O.jsx)("h3",{style:{textAlign:"center"},children:"\u864e\u9c7c\u76f4\u64ad"}),Object(O.jsx)(i.a,{}),Object(O.jsxs)(c.a,{name:"normal_login",initialValues:{remember:!0},onFinish:g,children:[Object(O.jsx)(c.a.Item,{name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}],children:Object(O.jsx)(o.a,{prefix:Object(O.jsx)(h.a,{className:"site-form-item-icon"}),placeholder:"\u7528\u6237\u540d"})}),Object(O.jsx)(c.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}],children:Object(O.jsx)(o.a,{prefix:Object(O.jsx)(p.a,{className:"site-form-item-icon"}),type:"password",placeholder:"\u5bc6\u7801"})}),Object(O.jsxs)(c.a.Item,{children:[Object(O.jsx)(c.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:Object(O.jsx)(s.a,{children:"\u8bb0\u4f4f\u6211"})}),Object(O.jsx)("a",{className:"login-form-forgot",href:"",children:"\u5fd8\u8bb0\u5bc6\u7801"})]}),Object(O.jsxs)(c.a.Item,{children:[Object(O.jsx)(a.a,{type:"primary",htmlType:"submit",className:"login-form-button",loading:u,children:"\u767b\u5f55"}),"\u6216\u8005 ",Object(O.jsx)("a",{href:"/#/register",children:"\u73b0\u5728\u6ce8\u518c!"})]})]})]})})})}));t.default=g},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(123),a=n.n(r);function s(e){var t=a.a.create({baseURL:"http://localhost:3002"});return t.interceptors.request.use((function(e){return e}),(function(e){})),t.interceptors.response.use((function(e){return e.data}),(function(e){})),t(e)}a.a.defaults.headers.common["th-auth"]=localStorage.getItem("token")}}]);
//# sourceMappingURL=login.3135c83d.chunk.js.map