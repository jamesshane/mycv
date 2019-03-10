import { classes } from "./Classes";

export class PasswordRecovery extends classes {
  protected submitBtn: any;

  constructor() {
    super();
    this.submitBtn = $("#submipasswordrecovery");
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

    if (status) {
      console.log("good!");
      this.ClearVal();
      this.submitBtn.attr('disabled', true);
      var url = "/PasswordRecoveries/SendPasswordRecovery";
      var email = this.emailField.val();
      $.post(url, { Email: email }, function (data) {
          //console.log(data);
          var dback = data.split(":");
          //console.log(dback[0]);
         //  if (dback[0].indexOf("USERNO") > -1) {
         //      var emailf = $("#valEmail");
         //      emailf.append("<p>This email does not exsit</p>");
         //  }
          if (dback[0] === "OK") {
            //console.log(dback[1]);
            var message =
           '<h3>American Piping Inspection Reset Password</h3>'+
           '<br /><p>You are recieving this messege, because a password reset has been requested from our site. If you did not request a password reset, please ignore this email. To reset your password click the link below.</p>'+
           '<br /><br /><p><a href="#">Click here to reset your password</a>'+
           '<br /><br /><p>Thank you.</p><br />';

           //(window as any).sendResetMail(email, "API Website Reset Form", message);

           //console.log(dback[1]);
              document.getElementById("success").style.display = "";
              document.getElementById("success").innerHTML+=" DEBUG:<a href='/#!/passwordreset?"+dback[1]+"'>click</a>";
              document.getElementById("cform").style.display = "none";
          }
          if (dback[0] === "ERROR") {
              document.getElementById("bigerror").style.display = "";
          }
          var subm = $("#submitpasswordrecovery");
          subm.removeAttr("disabled");
      });
    }
  }
}
