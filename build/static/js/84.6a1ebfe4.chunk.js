(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[84],{1224:function(e,a,t){"use strict";t.r(a);var r=t(112),n=t(109),c=t.n(n),s=t(165),l=t(658),u=t(1),o=t.n(u),i=t(19),m=t(45),f=t.n(m),p=t(662),d=t.n(p),b=t(164),O=t(657),w=t(665),g=t(660),E=t.n(g);a.default=function(){var e=Object(u.useState)({staff:"",email:"",password:"",confirmPassword:""}),a=Object(l.a)(e,2),t=a[0],n=a[1],m=Object(i.g)(),p=Object(u.useState)([]),g=Object(l.a)(p,2),j=g[0],v=g[1],h=Object(u.useState)(""),k=Object(l.a)(h,2),S=k[0],C=(k[1],Object(u.useRef)(),Object(u.useState)([])),x=Object(l.a)(C,2),P=(x[0],x[1],Object(u.useState)([])),N=Object(l.a)(P,2),y=N[0],R=(N[1],Object(u.useState)([])),I=Object(l.a)(R,2),U=(I[0],I[1],Object(u.useState)("")),D=Object(l.a)(U,2),T=(D[0],D[1],Object(u.useState)(new Date)),W=Object(l.a)(T,2),X=(W[0],W[1],Object(u.useState)("")),q=Object(l.a)(X,2),A=(q[0],q[1]),H=d.a.object().keys({staffId:d.a.string().required().label("Staff ID"),email:d.a.string().email({minDomainSegments:2,tlds:{allow:["ugmc.ug.edu.gh"]}}),password:d.a.string().required().label("Password"),confirmPassword:d.a.string().required().label("confirm Password")}),J=function(){var e=d.a.validate(t,H);return e.error?e.error.details[0].message:(function(){for(var e="123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ",a="",t=0;t<=8;t++){var r=Math.floor(Math.random()*e.length);a+=e.substring(r,r+1)}A(a)}(),null)},L=function(){var e=Object(s.a)(c.a.mark((function e(a){var r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),console.log(t),t.password===t.confirmPassword){e.next=4;break}return e.abrupt("return",E.a.fire("Password Confirmation","Password Confirmation Failed","info"));case 4:if(null!==(r=J())){e.next=26;break}return e.next=8,f.a.get("https://ugmcservice.herokuapp.com/api/stafflist/"+t.staffId.toUpperCase()+"/"+t.email);case 8:if(!((s=e.sent).data.length>0)){e.next=23;break}return e.prev=10,e.next=13,f.a.post("https://ugmcservice.herokuapp.com/api/users",{staffId:t.staffId.toUpperCase(),email:t.email,fullName:s.data[0].fullName,password:t.password,confirmPassword:t.confirmPassword,grade:s.data[0].grade,isAdmin:!1,isHeadOfUnit:!1,isHeadOfDepartment:!1,isSupervisor:!1});case 13:return n({staffId:"",email:"",password:"",confirmPassword:""}),E.a.fire("Success","Registration successful","success"),e.abrupt("return",m.replace("/"));case 18:return e.prev=18,e.t0=e.catch(10),e.abrupt("return",E.a.fire("OOPS","Registration NOT successful. Account may already exists !","error"));case 21:e.next=24;break;case 23:return e.abrupt("return",E.a.fire("OOPS","Staff details NOT found, Please check and try again or contact HR Department","error"));case 24:e.next=27;break;case 26:return e.abrupt("return",E.a.fire("OOPS",r,"info"));case 27:case"end":return e.stop()}}),e,null,[[10,18]])})));return function(a){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){function e(){return(e=Object(s.a)(c.a.mark((function e(){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(b.apiUrl+"/setup/staff");case 2:a=e.sent,v(a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var M={grades:y.filter((function(e){return e.grade.toLowerCase().includes(S.toLowerCase())||e.grade.includes(S.toLowerCase())}))};S.length;return o.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},o.a.createElement(O.w,null,o.a.createElement(O.vb,{className:"justify-content-center"},o.a.createElement(O.u,{md:"9",lg:"7",xl:"6"},o.a.createElement(O.j,{className:"mx-4"},o.a.createElement(O.k,{className:"p-4"},o.a.createElement(O.J,null,o.a.createElement("h1",null,"Register"),o.a.createElement("p",{className:"text-muted"},"Create your account"),o.a.createElement(O.U,{className:"mt-3"},o.a.createElement(O.W,null,o.a.createElement(O.X,null,o.a.createElement(w.a,{name:"cil-user"}))),o.a.createElement(O.wb,{className:"form-select col-sm-10","aria-label":"Default select example",value:t.staff,onChange:function(e){return n(Object(r.a)(Object(r.a)({},t),{},{staff:e.currentTarget.value}))}},o.a.createElement("option",{value:""},"Staff *"),j.map((function(e){return o.a.createElement("option",{key:e.id,value:e.id,id:e.id},e.nameOfStaff)})))),o.a.createElement(O.U,{className:"mb-3"},o.a.createElement(O.W,null,o.a.createElement(O.X,null,o.a.createElement(w.a,{name:"cil-user"}))),o.a.createElement(O.R,{type:"text",placeholder:"Staff ID",autoComplete:"staffid",value:t.staffId,onChange:function(e){return n(Object(r.a)(Object(r.a)({},t),{},{staffId:e.currentTarget.value}))}})),o.a.createElement(O.U,{className:"mb-3"},o.a.createElement(O.W,null,o.a.createElement(O.X,null,"@")),o.a.createElement(O.R,{type:"text",placeholder:"Email",autoComplete:"email",value:t.email,onChange:function(e){return n(Object(r.a)(Object(r.a)({},t),{},{email:e.currentTarget.value}))}})),o.a.createElement(O.U,{className:"mb-3"},o.a.createElement(O.W,null,o.a.createElement(O.X,null,o.a.createElement(w.a,{name:"cil-lock-locked"}))),o.a.createElement(O.R,{type:"password",placeholder:"Password",autoComplete:"new-password",value:t.password,onChange:function(e){return n(Object(r.a)(Object(r.a)({},t),{},{password:e.currentTarget.value}))}})),o.a.createElement(O.U,{className:"mb-4"},o.a.createElement(O.W,null,o.a.createElement(O.X,null,o.a.createElement(w.a,{name:"cil-lock-locked"}))),o.a.createElement(O.R,{type:"password",placeholder:"Repeat password",autoComplete:"new-password",value:t.confirmPassword,onChange:function(e){return n(Object(r.a)(Object(r.a)({},t),{},{confirmPassword:e.currentTarget.value}))}})),o.a.createElement(O.f,{color:"success",block:!0,onClick:L},"Create Account"))),o.a.createElement(O.l,{className:"p-4"},o.a.createElement(O.vb,null)))))))}}}]);
//# sourceMappingURL=84.6a1ebfe4.chunk.js.map