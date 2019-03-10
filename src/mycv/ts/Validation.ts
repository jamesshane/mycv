export class Validation {
  constructor() {}

  protected HideVal(): void {
    let val: any = $("div[id^='val']");
    val.hide();
  }

  protected ClearVal(): void {
    let val: any = $("div[id^='val']");
    val.html("");
    //console.log("clear");
  }

  protected ShowVal(Tag: string, errorMesg: string): void {
    let val: any = $("#val" + Tag);
    let newval: string = "<p>" + errorMesg + "</p>";
    val.append(newval);
  }

  protected TestBlank(field: any, tag: string, error: string): boolean {
    if (field.val() === "") {
      this.ShowVal(tag, error);
      return true;
    } else {
      return false;
    }
  }

  protected TestPatt(
    field: any,
    pattern: any,
    tag: string,
    error: string
  ): boolean {
    //console.log(pattern);
    let pattTest: boolean = pattern.test(field.val());
    //console.log(pattTest);
    if (pattTest) {
      return true;
    } else {
      this.ShowVal(tag, error);
      return false;
    }
  }

  protected TestMatch(field1:any,field2:any,tag:string,error:string):boolean {
    if(field1.val()!==field2.val()) {
      this.ShowVal(tag, error);
      return false;
    } else {
      return true;
    }
  }
}
