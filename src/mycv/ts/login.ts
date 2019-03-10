import { classes } from "./classes";

export class Login extends classes {
  protected submitBtn: any;

  constructor() {
    super();
    this.submitBtn = $("#submitlogin");
    this.submitBtn.on("click", (e: Event) => this.SubmitButtonClick());
    this.clearBtn.on("click", (e: Event) => this.ResetButtonClick());
  }

  SubmitButtonClick() {
    //console.log("Submit");

    this.ClearVal();

    let status: boolean = true;

    if (this.TestEmailNotBlank()) {
      //console.log("this.TestEmailNotBlank()");
      status = this.TestEmailPatt();
    } else {
      status = false;
    }

    if (this.TestPasswordNotBlank()) {
        status = this.TestPasswordPatt();
    } else {
      status = false;
    }

    if (status) {
      console.log("good!");
      this.ClearVal();
      this.submitBtn.attr('disabled', true);
      var url = "/Users/Login";
      var email = this.emailField.val();
      var password = this.passwordField.val();
      $.post(url, { Email: email, Password: password}, function (data) {
          //console.log(data);
          var dback = data.split(":");
          //console.log(dback[0]);
          if (dback[0].indexOf("USERNO") > -1) {
              var emailf = $("#valemail");
              emailf.append("<p>This email does not exsit</p>");
          }
          if (dback[0] === "OK") {
              (window as any).setCookie("APIUser", dback[1], 1);
              document.getElementById("success").style.display = "";
              document.getElementById("cform").style.display = "none";
          }
          if (dback[0].indexOf("WRONGPW") > -1) {
              var emailf = $("#valemail");
              emailf.append("<p>Email/Password combination is wrong</p>");
          }
          if (dback[0].indexOf("USERLOCKED") > -1) {
            document.getElementById("userlocked").style.display = "";
          }
          if (dback[0] === "ERROR") {
              document.getElementById("bigerror").style.display = "";
          }
          var subm = $("#submitlogin");
          subm.removeAttr("disabled");
      });
    }
  }
}
