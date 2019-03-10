
import { Register } from "./Register";
import { Login } from "./login";
import { PasswordRecovery } from "./PasswordRecovery";
import { PasswordReset } from "./PasswordReset";

let register = new Register();
let login = new Login();
let passwordrecovery = new PasswordRecovery();
let passwordreset = new PasswordReset();

let headerr:any;
//headerr = $("header").hide();

interface Window {
    setCookie(cname: string, cvalue: any, exdays: number): void;
    getCookie(cname: string): string;
    sendResetMail(to:string, subject:string, message:string): void;
    getQuerystring(): string;
}
