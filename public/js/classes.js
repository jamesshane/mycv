!function(){return function t(e,s,i){function a(l,o){if(!s[l]){if(!e[l]){var n="function"==typeof require&&require;if(!o&&n)return n(l,!0);if(r)return r(l,!0);var d=new Error("Cannot find module '"+l+"'");throw d.code="MODULE_NOT_FOUND",d}var h=s[l]={exports:{}};e[l][0].call(h.exports,function(t){return a(e[l][1][t]||t)},h,h.exports,t,e,s,i)}return s[l].exports}for(var r="function"==typeof require&&require,l=0;l<i.length;l++)a(i[l]);return a}}()({1:[function(t,e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});const i=t("./Validation");s.classes=class extends i.Validation{constructor(){super(),this.emailPatt=/[\w-]+@([\w-]+\.)+[\w-]+/,this.phonePatt=/^(1?)(-| ?)(\()?([0-9]{3})(\)|-| |\)-|\) )?([0-9]{3})(-| )?([0-9]{4}|[0-9]{4})$/,this.passwordPatt=/(?=.*\d)(?=.*[A-Z])(?=.*[~`!@#$%^&*()\-_+={};:\[\]\?\.\\\/,]).{8,}/,this.AttachElements(),this.HideFeedbackBoxes(),this.TestLogin()}TestLogin(){""!==window.getCookie("APIUser")?this.loggedin.show():this.loggedin.hide()}TestNameNotBlank(){return!this.TestBlank(this.nameField,"name","Name is required.")}TestMesgNotBlank(){return!this.TestBlank(this.mesgField,"mesg","Messege is required. At least say 'Hi.'")}TestEmailNotBlank(){return!this.TestBlank(this.emailField,"email","Email is required.")}TestPasswordNotBlank(){return!this.TestBlank(this.passwordField,"password","Password is required.")}TestRePasswordNotBlank(){return!this.TestBlank(this.rePasswordField,"repassword","Please re-enter password.")}TestPhoneNotBlank(){return!this.TestBlank(this.phoneField,"phone","Phone is required.")}TestEmailPatt(){return this.TestPatt(this.emailField,this.emailPatt,"email","Email is not formatted correctly.")}TestPasswordPatt(){return this.TestPatt(this.passwordField,this.passwordPatt,"password","Password does not match required format, see note bellow.")}TestPasswordsMatch(){return this.TestMatch(this.passwordField,this.rePasswordField,"repassword","Passwords do not match.")}TestPhonePatt(){return this.TestPatt(this.phoneField,this.phonePatt,"phone","Phone is not formatted correctly.")}AttachElements(){this.nameField=$("#name"),this.emailField=$("#email"),this.passwordField=$("#password"),this.rePasswordField=$("#repassword"),this.phoneField=$("#phone"),this.mesgField=$("#mesg"),this.submitBtn=$("#submit"),this.clearBtn=$("#clear")}HideFeedbackBoxes(){this.success=$("#success").hide(),this.loggedin=$("#loggedin").hide(),this.bigerror=$("#bigerror").hide(),this.userlocked=$("#locked").hide()}ResetButtonClick(){this.ClearVal(),this.emailField.val(""),this.passwordField.val(""),this.rePasswordField.val(""),this.phoneField.val(""),this.nameField.val(""),this.mesgField.val("")}}},{"./Validation":5}],2:[function(t,e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});const i=t("./Classes");s.Contact=class extends i.classes{constructor(){super(),this.submitBtn=$("#submitcontact"),this.submitBtn.on("click",t=>this.SubmitButtonClick()),this.clearBtn.on("click",t=>this.ResetButtonClick())}SubmitButtonClick(){this.ClearVal();let t=!0;if(t=!!this.TestNameNotBlank(),t=!!this.TestEmailNotBlank()&&this.TestEmailPatt(),t=!!this.TestMesgNotBlank()){this.ClearVal(),this.submitBtn.attr("disabled",!0);var e=this.emailField.val(),s=this.nameField.val(),i=this.mesgField.val();$.post("/sendgrid",{emailp:e,namep:s,mesgp:i},function(t){console.log(t);var e=t.split(":");e[0].indexOf("USERMADE")>-1&&$("#valemail").append("<p>This email is already registered</p>"),"ERROR"===e[0]&&(document.getElementById("bigerror").style.display=""),"OK"===e[0]&&(document.getElementById("success").style.display="",document.getElementById("cform").style.display="none"),$("#submitregiser").removeAttr("disabled")})}}}},{"./Classes":1}],3:[function(t,e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});const i=t("./Classes");s.LogVisits=class extends i.classes{constructor(){super(),this.SubmitButtonClick()}SubmitButtonClick(){$.getJSON("https://ipapi.co/json/",function(t){t.path=$(location).attr("pathname"),t.created=window.getActualFullDate(),$.post("/insertvisit",t,function(t){t.split(":")[0]})})}}},{"./Classes":1}],4:[function(t,e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});const i=t("./Contact"),a=t("./LogVisits");new i.Contact,new a.LogVisits},{"./Contact":2,"./LogVisits":3}],5:[function(t,e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.Validation=class{constructor(){}HideVal(){$("div[id^='val']").hide()}ClearVal(){$("div[id^='val']").html("")}ShowVal(t,e){let s="<p>"+e+"</p>";$("#val"+t).append(s)}TestBlank(t,e,s){return""===t.val()&&(this.ShowVal(e,s),!0)}TestPatt(t,e,s,i){return!!e.test(t.val())||(this.ShowVal(s,i),!1)}TestMatch(t,e,s,i){return t.val()===e.val()||(this.ShowVal(s,i),!1)}}},{}]},{},[4]);
//# sourceMappingURL=classes.js.map
