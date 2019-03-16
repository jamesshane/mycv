function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function sendResetMail(to, subject, message) {
  var postUrl = "https://api.sendgrid.com/v3/mail/send";

  var successCallback = function(response) {
    console.log("send mail success");
    console.log(response);

    if (response.status === 202) {
      console.log("Send OK");
      //resolve(response.data);
    } else {
      console.log("Send FAILED");

      //resolve(response.data);
    }
  };

  var errorCallback = function(response) {
    console.log("send mail error");
    console.log(response);

    //resolve(response.data);
  };
  $.ajaxSetup({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      Authorization: "Bearer"
    }
  });
  var data = {};

  data = {
    personalizations: [
      {
        to: [
          {
            email: to,
            name: ""
          }
        ],
        subject: subject
      }
    ],
    from: {
      email: "no-reply@americanpipinginspection.com",
      name: "API Website"
    },
    content: [
      {
        type: "text/html",
        value: message
      }
    ]
  };

  $.post(postUrl, data)
    .then(successCallback)
    .catch(errorCallback);
}

function getQuerystring() {
  var queryString = window.location.hash;
  return queryString.split("?")[1];
}

function getActualFullDate() {
  var d = new Date();
  var day = addZero(d.getDate());
  var month = addZero(d.getMonth() + 1);
  var year = addZero(d.getFullYear());
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return month + "." + day + "." + year + " (" + h + ":" + m + ":" + s + ")";
}

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
