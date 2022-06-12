let fetchedVersion, isUpToDate, updateCheckTime;

function filter(s) {
  const children = document.getElementById("widgets").children;
  for (let element of children) {
    if (s.length > 0) {
      if (
        element.getAttribute("name").toLowerCase().includes(s.toLowerCase())
      ) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
    } else {
      element.style.display = "flex";
    }
  }
}

function changeText(id, text) {
  document.getElementById(id).innerHTML = text;
}

function changeTab(element) {
  const dashboard = document.getElementById("dashboard");
  const settings = document.getElementById("settings");
  const update = document.getElementById("update");
  dashboard.style.fill = "var(--gray)";
  settings.style.fill = "var(--gray)";
  update.style.fill = "var(--gray)";
  element.style.fill = "var(--black)";

  switch (element.getAttribute("tab")) {
    case "dashboard":
      document.getElementById("updates").style.display = "none";
      document.getElementById("widgets").style.display = "flex";
      document.getElementById("options").style.display = "none";
      document.getElementById("searchcontainer").style.display = "flex";
      document.getElementById("nextwindowtitle").style.display = "block";
      document.getElementById("windowtitle").innerHTML = "Installed Widgets";
      break;

    case "update":
      document.getElementById("updates").style.display = "flex";
      document.getElementById("widgets").style.display = "none";
      document.getElementById("options").style.display = "none";
      document.getElementById("searchcontainer").style.display = "none";
      document.getElementById("nextwindowtitle").style.display = "none";
      document.getElementById("windowtitle").innerHTML = "Check for updates";

      if (isUpToDate) {
        document.getElementById("outdated").style.display = "none";
        document.getElementById("uptodate").style.display = "flex";
        document.getElementById(
          "updatetime"
        ).innerText = `Last checked on the ${updateCheckTime}`;
      } else {
        document.getElementById("outdated").style.display = "flex";
        document.getElementById("uptodate").style.display = "none";
        document.getElementById(
          "newversion"
        ).innerText = `Update to new version ${
          fetchedVersion ? fetchedVersion : "click below or check the website"
        }`;
      }
      break;

    case "settings":
      document.getElementById("updates").style.display = "none";
      document.getElementById("widgets").style.display = "none";
      document.getElementById("options").style.display = "flex";
      document.getElementById("searchcontainer").style.display = "none";
      document.getElementById("nextwindowtitle").style.display = "none";
      document.getElementById("windowtitle").innerHTML = "Settings";
      break;
  }
}

function changeSwitch(element) {
  if (element.classList.contains("switchon")) {
    element.classList.remove("switchon");
  } else {
    element.classList.add("switchon");
  }

  CefSharp.PostMessage(element.getAttribute("setting"));
}

window.onload = () => {
  const searchWidget = document.getElementById("searchwidget");

  searchWidget.onchange = function () {
    if (searchWidget.value.length > 0) {
      changeText("windowtitle", "Browse Widgets");
      changeText("nextwindowtitle", "Installed Widgets");
    } else {
      changeText("windowtitle", "Installed Widgets");
      changeText("nextwindowtitle", "Browse Widgets");
    }
    filter(searchWidget.value);
  };
};
