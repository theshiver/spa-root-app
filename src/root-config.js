import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@polyglot-mf/account-settings",
  app: () => loadWithoutAmd("@polyglot-mf/account-settings"),
  activeWhen: function (location) {
    return location.pathname.startsWith('/page1')
  }
});

registerApplication({
  name: "@polyglot-mf/account-settings2",
  app: () => loadWithoutAmd("@polyglot-mf/account-settings2"),
  activeWhen: function (location) {
    return location.pathname.startsWith('/page2')
  }
});

start();

// A lot of angularjs libs are compiled to UMD, and if you don't process them with webpack
// the UMD calls to window.define() can be problematic.
function loadWithoutAmd(name) {
  return Promise.resolve().then(() => {
    let globalDefine = window.define;
    delete window.define;
    return System.import(name).then((module) => {
      window.define = globalDefine;
      return module;
    });
  });
}
