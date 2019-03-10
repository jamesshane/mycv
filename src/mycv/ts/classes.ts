import { Validation } from "./Validation";

export class classes extends Validation {
  protected emailPatt = /[\w-]+@([\w-]+\.)+[\w-]+/;
  protected phonePatt = /^(1?)(-| ?)(\()?([0-9]{3})(\)|-| |\)-|\) )?([0-9]{3})(-| )?([0-9]{4}|[0-9]{4})$/;
  protected passwordPatt = /(?=.*\d)(?=.*[A-Z])(?=.*[~`!@#$%^&*()\-_+={};:\[\]\?\.\\/,]).{8,}/;

  protected submitBtn: any;
  protected clearBtn: any;
  protected emailField: any;
  protected passwordField: any;
  protected rePasswordField: any;
  protected phoneField: any;
  protected success: any;
  protected loggedin: any;
  protected bigerror: any;
  protected userlocked: any;

  constructor() {
    super();
    this.AttachElements();
    this.HideFeedbackBoxes();
    this.TestLogin();
  }

  TestLogin(): void {
    let c = (window as any).getCookie("APIUser");
    //console.log(c);
    if (c !== "") {
        this.loggedin.show();
    }
    else {
        this.loggedin.hide();
    }
}

  TestEmailNotBlank(): boolean {
    return !this.TestBlank(this.emailField, "email", "Email is required.");
  }

  TestPasswordNotBlank(): boolean {
    return !this.TestBlank(
      this.passwordField,
      "password",
      "Password is required."
    );
  }

  TestRePasswordNotBlank(): boolean {
    return !this.TestBlank(
      this.rePasswordField,
      "repassword",
      "Please re-enter password."
    );
  }

  TestPhoneNotBlank(): boolean {
    return !this.TestBlank(this.phoneField, "phone", "Phone is required.");
  }

  TestEmailPatt(): boolean {
    return this.TestPatt(
      this.emailField,
      this.emailPatt,
      "email",
      "Email is not formatted correctly."
    );
  }

  TestPasswordPatt(): boolean {
    return this.TestPatt(
      this.passwordField,
      this.passwordPatt,
      "password",
      "Password does not match required format, see note bellow."
    );
  }

  TestPasswordsMatch(): boolean {
    return this.TestMatch(
      this.passwordField,
      this.rePasswordField,
      "repassword",
      "Passwords do not match."
    );
  }

  TestPhonePatt(): boolean {
    return this.TestPatt(
      this.phoneField,
      this.phonePatt,
      "phone",
      "Phone is not formatted correctly."
    );
  }

  protected AttachElements() {
    this.emailField = $("#email");
    this.passwordField = $("#password");
    this.rePasswordField = $("#repassword");
    this.phoneField = $("#phone");
    this.submitBtn = $("#submit");
    this.clearBtn = $("#clear");
    //console.log("attached elelements");
  }

  protected HideFeedbackBoxes() {
    this.success = $("#success").hide();
    this.loggedin = $("#loggedin").hide();
    this.bigerror = $("#bigerror").hide();
    this.userlocked = $("#locked").hide();
    //console.log("HideFeedbackBoxes");
  }

  protected ResetButtonClick(): void {
    // button click handler
    this.ClearVal();
    this.emailField.val("");
    this.passwordField.val("");
    this.rePasswordField.val("");
    this.phoneField.val("");
  }
}
