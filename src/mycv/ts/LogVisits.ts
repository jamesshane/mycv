import { classes } from "./Classes";

export class LogVisits extends classes {
  constructor() {
    super();
    this.SubmitButtonClick();
    console.log("LogVisits");
  }

  SubmitButtonClick() {
    let status: boolean = true;

    if (status) {
      var url = "/testdb";
      var email = "blah";
      var mesg = "blah";
      $.post(url, { emailp: email, namep: name, mesgp: mesg }, function(data) {
        console.log(data);
        var dback = data.split(":");
        //console.log(dback[0]);
        if (dback[0] === "OK") {
        }
      });
    }
  }
}
