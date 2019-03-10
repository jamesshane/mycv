import { classes } from "./classes";

export class Register extends classes {
  protected submitBtn: any;

  constructor() {
    super();
    this.submitBtn = $("#submitregister");
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

    if (this.TestPhoneNotBlank()) {
      //console.log("this.TestPhoneNotBlank()");
      status = this.TestPhonePatt();
    } else {
      status = false;
    }
//console.log(this.TestRePasswordNotBlank());
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
      this.ClearVal();
      this.submitBtn.attr('disabled', true);
      var url = "/Users/CreateUser";
      var email = this.emailField.val();
      var password = this.passwordField.val();
      var phone = this.phoneField.val();
      $.post(url, { Email: email, Password: password, Phone: phone }, function (data) {
          //console.log(data);
           var dback = data.split(":");
           //console.log(dback[0]);
          if (dback[0].indexOf("USERMADE") > -1) {
              var emailf = $("#valemail");
              emailf.append("<p>This email is already registered</p>");
          }
          if (dback[0] === "ERROR") {
            //console.log(dback[1]);
              document.getElementById("bigerror").style.display = "";
          }
          if (dback[0] === "OK") {
              document.getElementById("success").style.display = "";
              document.getElementById("cform").style.display = "none";
          }
          var subm = $("#submitregiser");
          subm.removeAttr("disabled");
      });
    }
  }
}
