(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[59],{1285:function(e,t,a){"use strict";a.r(t);var r=a(112),n=a(109),l=a.n(n),s=a(165),i=a(658),c=a(1),u=a.n(c),o=(a(665),a(662)),m=a.n(o),d=a(660),f=a.n(d),p=a(661),E=a.n(p),b=a(45),g=a.n(b),v=a(657);a(667);t.default=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),a=t[0],n=t[1],o=Object(c.useState)({startDate:"",endDate:"",leaveYear:""}),d=Object(i.a)(o,2),p=d[0],b=d[1],h=Object(c.useState)(!0),M=Object(i.a)(h,2),y=(M[0],M[1],Object(c.useState)(!1)),A=Object(i.a)(y,2),D=(A[0],A[1]),S=Object(c.useState)([]),j=Object(i.a)(S,2),Y=j[0],k=j[1];Object(c.useEffect)((function(){function e(){return(e=Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("https://ugmcservice.herokuapp.com/api/leaveyear");case 2:t=e.sent,k(t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}(),console.log(Y)}),[Y]);m.a.object().keys({unit:m.a.string().required().label("Unit"),department:m.a.string().required().label("Department")});var O=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(!0),e.next=3,g.a.post("https://ugmcservice.herokuapp.com/api/leaveyear",p);case 3:200===e.sent.status?(f.a.fire({title:"Success",text:"Leave Year Successfully Added",icon:"success"}),D(!1)):(f.a.fire({title:"OOPS",text:"Leave Year Failed",icon:"error"}),D(!1)),D(!0),b({endDate:"",startDate:"",leaveYear:""});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(v.vb,null,u.a.createElement(v.u,null,u.a.createElement(v.j,null,u.a.createElement("div",null,u.a.createElement(v.ib,null,u.a.createElement(v.u,null,u.a.createElement(v.K,null,u.a.createElement(v.bb,{htmlFor:"appendedInputButtons"}),u.a.createElement("div",{className:"controls"},u.a.createElement(v.U,null,u.a.createElement(v.R,{id:"appendedInputButtons",size:"16",type:"text"}),u.a.createElement(v.V,null,u.a.createElement(v.u,null,u.a.createElement(v.f,{color:"primary"},"Search")),u.a.createElement(v.f,{color:"primary",onClick:function(){return n(!a)}},"+ New Leave Year")," ",u.a.createElement(v.f,{color:"success",onClick:function(){return n(!a)}},"Export Report")))))))),u.a.createElement(v.fb,{show:a,onClose:function(){return n(!a)},color:"primary",size:"lg"},u.a.createElement(v.ib,{closeButton:!0},u.a.createElement(v.jb,null,"Setup | Year Leave")),u.a.createElement(v.gb,null,u.a.createElement("form",null,u.a.createElement(v.vb,null,u.a.createElement(v.u,{xs:"12",md:"12"},u.a.createElement(v.j,null,u.a.createElement(v.n,null,"LEAVE YEAR MANAGEMENT"),u.a.createElement(v.k,null,u.a.createElement("label",{htmlFor:"LeaveYear",className:"form-label"},"Year"),u.a.createElement("input",{className:"form-control",type:"text",value:p.leaveYear,onChange:function(e){return b(Object(r.a)(Object(r.a)({},p),{},{leaveYear:e.target.value}))}}),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{htmlFor:"Unit",className:"form-label"},"Start Date")," ",u.a.createElement("input",{type:"date",className:"form-control myInput",dateFormat:"dd-MMMM-yyyy",value:p.startDate,onChange:function(e){return b(Object(r.a)(Object(r.a)({},p),{},{startDate:e.currentTarget.value}))},placeholder:"Start Date"}),u.a.createElement("p",null,u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{htmlFor:"Unit",className:"form-label"},"End Date")," ",u.a.createElement("input",{type:"date",placeholder:"Start Date",className:"form-control myInput",dateFormat:"dd-MMMM-yyyy",value:p.endDate,onChange:function(e){return b(Object(r.a)(Object(r.a)({},p),{},{endDate:e.currentTarget.value}))}})))))))))),u.a.createElement(v.hb,null,u.a.createElement(v.f,{color:"primary",onClick:O},"+ Save")," ",u.a.createElement(v.f,{color:"warning",onClick:function(){return n(!a)}},"Reset")," ",u.a.createElement(v.f,{color:"danger",onClick:function(){return n(!a)}},"Close"))),u.a.createElement(v.k,null,u.a.createElement("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table"},u.a.createElement("caption",null,"Leave Year"),u.a.createElement("thead",{className:"thead-light"},u.a.createElement("tr",null,u.a.createElement("th",null),u.a.createElement("th",null,"Current Leave Year"),u.a.createElement("th",null,"Start Date"),u.a.createElement("th",null,"End Date"))),u.a.createElement("tbody",{className:""},Y.map((function(e,t){return u.a.createElement("tr",{key:e._id},u.a.createElement("td",null,t+1),u.a.createElement("td",null,e.leaveYear),u.a.createElement("td",null,E()(e.startDate).format("DD,MMMM,YYYY")),u.a.createElement("td",null,E()(e.endDate).format("DD,MMMM,YYYY")))})))))))))}},667:function(e,t,a){"use strict";t.a=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending",ok:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:3,name:"Chetan Mohamed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:4,name:"Derick Maximinus",registered:"2018/03/01",role:"Member",status:"Pending"},{id:5,name:"Friderik D\xe1vid",registered:"2018/01/21",role:"Staff",status:"Active"},{id:6,name:"Yiorgos Avraamu",registered:"2018/01/01",role:"Member",status:"Active"},{id:7,name:"Avram Tarasios",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:8,name:"Quintin Ed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:9,name:"En\xe9as Kwadwo",registered:"2018/03/01",role:"Member",status:"Pending"},{id:10,name:"Agapetus Tade\xe1\u0161",registered:"2018/01/21",role:"Staff",status:"Active"},{id:11,name:"Carwyn Fachtna",registered:"2018/01/01",role:"Member",status:"Active"},{id:12,name:"Nehemiah Tatius",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:13,name:"Ebbe Gemariah",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:14,name:"Eustorgios Amulius",registered:"2018/03/01",role:"Member",status:"Pending"},{id:15,name:"Leopold G\xe1sp\xe1r",registered:"2018/01/21",role:"Staff",status:"Active"},{id:16,name:"Pompeius Ren\xe9",registered:"2018/01/01",role:"Member",status:"Active"},{id:17,name:"Pa\u0109jo Jadon",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:18,name:"Micheal Mercurius",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:19,name:"Ganesha Dubhghall",registered:"2018/03/01",role:"Member",status:"Pending"},{id:20,name:"Hiroto \u0160imun",registered:"2018/01/21",role:"Staff",status:"Active"},{id:21,name:"Vishnu Serghei",registered:"2018/01/01",role:"Member",status:"Active"},{id:22,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:23,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:42,name:"Ford Prefect",registered:"2001/05/25",role:"Alien",status:"Don't panic!"},{id:43,name:"Ford Correct",registered:"2001/05/25",role:"Alien",status:"Don't panic!"},{id:44,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:45,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:46,name:"Ford Good",registered:"2008/05/25",role:"Avata",status:"Don't panic!"},{id:47,name:"Ford Fine",registered:"2009/05/25",role:"Alien",status:"Don't panic!"}]}}]);
//# sourceMappingURL=59.556fbf0c.chunk.js.map