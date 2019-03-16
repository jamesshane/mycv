import { classes } from "./Classes";

export class LogVisits extends classes {
  constructor() {
    super();
    this.SubmitButtonClick();
    //console.log("LogVisits");
  }

  SubmitButtonClick() {
    let status: boolean = true;

    if (status) {
      $.getJSON("/getinfo", function(data) {
        //console.log(JSON.stringify(data, null, 2));
        //console.log(data.ip);
        // {
        //   "ip": "73.3.187.220",
        //   "hostname": "c-73-3-187-220.hsd1.co.comcast.net",
        //   "city": "Denver",
        //   "region": "Colorado",
        //   "country": "US",
        //   "loc": "39.7128,-105.0950",
        //   "postal": "80226",
        //   "org": "AS7922 Comcast Cable Communications, LLC"
        // }
        data.path=$(location).attr('pathname');
        data.created=(window as any).getActualFullDate();
        //console.log(data.path);
        var url = "/insertvisit";
        $.post(url, data, function(
          data
        ) {
          //console.log(data);
          var dback = data.split(":");
          //console.log(dback[0]);
          if (dback[0] === "OK") {
          }
        });
      });
    }
  }
}
