(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[63],{1296:function(e,t,a){"use strict";a.r(t);var n=a(112),c=a(109),r=a.n(c),l=a(165),u=a(658),s=a(1),o=a.n(s),m=a(45),i=a.n(m),p=(a(661),a(164)),b=(a(111),a(660)),f=a.n(b),E=a(664),h=a(657);t.default=function(){var e=Object(s.useState)({bank:"",branch:"",accountNumber:"",accountName:"",typeOfAccount:""}),t=Object(u.a)(e,2),a=t[0],c=t[1],m=Object(s.useState)([]),b=Object(u.a)(m,2),d=b[0],N=b[1],v=Object(s.useState)([]),O=Object(u.a)(v,2),k=O[0],y=O[1];Object(s.useEffect)((function(){function e(){return(e=Object(l.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(p.apiUrl+"/setup/bank");case 2:t=e.sent,N(t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[d]),Object(s.useEffect)((function(){function e(){return(e=Object(l.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(p.apiUrl+"/setup/bankaccount");case 2:t=e.sent,y(t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[k]);var j=function(){var e=Object(l.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,i.a.post(p.apiUrl+"/setup/bankaccount",a);case 4:if(n=e.sent,console.log(n.status),200===n.status){e.next=10;break}return e.abrupt("return",f.a.fire("OOPS","Submission Failed ! Check Entries and try again !","error"));case 10:f.a.fire("Success","Bank Account Details Saved Successfully","success"),c({bank:"",branch:"",accountNumber:"",accountName:"",typeOfAccount:"",contact:""});case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),f.a.fire("OOPS ! "+e.t0.message,"error");case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return o.a.createElement("div",{className:"container-fluid"},o.a.createElement("h1",{className:"centertext"},"Bank Account Details"),o.a.createElement("p",{className:"staffp"},"Giving your banks accounts details helps track your transactions with them."),o.a.createElement(h.U,{className:"mt-3"},o.a.createElement(h.bb,{for:"inputPassword",className:"col-sm-3"},"Bank"),o.a.createElement(h.wb,{className:"form-select col-sm-8","aria-label":"Default select example ",value:a.bank,onChange:function(e){return c(Object(n.a)(Object(n.a)({},a),{},{bank:e.currentTarget.value}))}},o.a.createElement("option",{defaultValue:""},"--Select Bank--"),d.map((function(e){return o.a.createElement("option",{key:e.id,value:e.id,id:e.id},e.bank)})))),o.a.createElement(h.U,{className:"mt-3"},o.a.createElement(h.bb,{htmlFor:"appdate",className:"col-sm-3"},"Branch"),o.a.createElement(h.R,{type:"text",className:"form-control  col-sm-8",id:"appdate",value:a.branch,onChange:function(e){return c(Object(n.a)(Object(n.a)({},a),{},{branch:e.currentTarget.value}))}})),o.a.createElement(h.U,{className:"mt-3"},o.a.createElement(h.bb,{htmlFor:"phoneofgurantor1",className:"col-sm-3"},"Account Name"),o.a.createElement(h.R,{type:"text",className:"form-control  col-sm-8",id:"phoneofgurantor1",value:a.accountName,onChange:function(e){return c(Object(n.a)(Object(n.a)({},a),{},{accountName:e.currentTarget.value}))}})),o.a.createElement(h.U,{className:"mt-3"},o.a.createElement(h.bb,{htmlFor:"phone",className:"col-sm-3"},"Account Number"),o.a.createElement(h.R,{type:"text",className:"form-control col-sm-8",id:"phone",value:a.accountNumber,onChange:function(e){return c(Object(n.a)(Object(n.a)({},a),{},{accountNumber:e.currentTarget.value}))}})),o.a.createElement(h.U,{className:"mt-3"},o.a.createElement(h.bb,{htmlFor:"qualification",className:"col-sm-3"},"Type of Account"),o.a.createElement(h.wb,{className:"form-select col-sm-8","aria-label":"Default select example",value:a.typeOfAccount,onChange:function(e){c(Object(n.a)(Object(n.a)({},a),{},{typeOfAccount:e.currentTarget.value}))}},o.a.createElement("option",{defaultValue:""},"--Select Account Type--"),o.a.createElement("option",{value:"Savings"},"Savings"),o.a.createElement("option",{value:"Current Account"},"Current"))),o.a.createElement("div",{className:"row justify-content-center"},o.a.createElement(h.f,{className:"btn btn-danger col-sm-3 mt-3",onClick:j},"Submit")),o.a.createElement(E.c,{className:"mt-3 sm"},o.a.createElement("thead",null,o.a.createElement("tr",{className:"fs-sm"},o.a.createElement("th",null),o.a.createElement("th",null,"Bank"),o.a.createElement("th",null,"Account Number"),o.a.createElement("th",null,"Branch"),o.a.createElement("th",null,"Type Of Account"),o.a.createElement("th",null,"Name of Account"))),o.a.createElement("tbody",null,k.map((function(e,t){return o.a.createElement("tr",{key:e._id,Style:"cursor: pointer;"},o.a.createElement("td",null,t+1),o.a.createElement("td",null,e.BankName),o.a.createElement("td",null,e.accountNumber),o.a.createElement("td",null,e.branch),o.a.createElement("td",null,e.typeOfAccount),o.a.createElement("td",null,e.accountName))})))))}}}]);
//# sourceMappingURL=63.b68323ed.chunk.js.map