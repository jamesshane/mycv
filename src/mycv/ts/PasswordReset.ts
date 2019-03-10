import { classes } from "./Classes";

export class PasswordReset extends classes {
  protected submitBtn: any;
  protected badlink: any;

  constructor() {
    super();
    this.badlink = $("#badlink");
    this.badlink.hide();
    this.submitBtn = $("#submitpasswordreset");
    this.submitBtn.on("click", (e: Event) => this.SubmitButtonClick());
    this.clearBtn.on("click", (e: Event) => this.ResetButtonClick());
  }

  SubmitButtonClick() {
    //console.log("Submit");

    this.ClearVal();

    let status: boolean = true;

    if (this.TestPasswordNotBlank()) {
      if (this.TestRePasswordNotBlank()) {
        status = (this.TestPasswordPatt() && this.TestPasswordsMatch());
      } else {
        status = false;
      }
    } else {
      status = false;
    }

    if (status) {
      console.log("good!");
      //alert("good!");
      this.ClearVal();
      this.submitBtn.attr('disabled', true);
      var url = "/PasswordRecoveries/ResetPassword";
      var password = this.passwordField.val();
      var guid = (window as any).getQuerystring();
      $.post(url, { Guid: guid, Password: password}, function (data) {
       //console.log(data);
       var dback = data.split(":");
       //console.log(dback[0]);
       if (dback[0] === "OK") {
           (window as any).setCookie("APIUser", dback[1], 1);
           document.getElementById("success").style.display = "";
           document.getElementById("cform").style.display = "none";
       }
       if (dback[0] === "GUIDUSED" || dback[0] === "GUIDNO") {
           document.getElementById("badlink").style.display = "";
           document.getElementById("cform").style.display = "none";
       }
       if (dback[0] === "ERROR") {
           document.getElementById("bigerror").style.display = "";
       }
       var subm = $("#submitpasswordreset");
       subm.removeAttr("disabled");
   });
    }
  }
}
