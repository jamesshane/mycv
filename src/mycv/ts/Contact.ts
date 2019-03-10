import { classes } from "./Classes";

export class Contact extends classes {
  protected submitBtn: any;

  constructor() {
    super();
    this.submitBtn = $("#submitcontact");
    this.submitBtn.on("click", (e: Event) => this.SubmitButtonClick());
    this.clearBtn.on("click", (e: Event) => this.ResetButtonClick());
  }

  SubmitButtonClick() {
    //console.log("Submit");

    this.ClearVal();

    let status: boolean = true;

    if (this.TestNameNotBlank()) {
      //console.log("this.TestNameNotBlank()");
      status = true;
    } else {
      status = false;
    }

    if (this.TestEmailNotBlank()) {
      //console.log("this.TestEmailNotBlank()");
      status = this.TestEmailPatt();
    } else {
      status = false;
    }

    if (this.TestMesgNotBlank()) {
      //console.log("this.TestMesgNotBlank()");
      status = true;
    } else {
      status = false;
    }

    if (status) {
      //console.log("good!");
      this.ClearVal();
      this.submitBtn.attr('disabled', true);
      var url = "/sendgrid";
      var email = this.emailField.val();
      var name = this.nameField.val();
      var mesg = this.mesgField.val();
      $.post(url, { emailp: email, namep: name, mesgp: mesg }, function (data) {
          console.log(data);
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
