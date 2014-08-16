var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
// var tmr = require('sdk/timers');

require("sdk/preferences/service").set("javascript.options.strict", false);

pageMod.PageMod({
  include: "*.trello.com",
  contentScriptWhen: 'end',
  contentScriptFile: [self.data.url("jquery.1.11.min.js"), self.data.url("script.js")],
  onAttach: startListening
});

function startListening(worker) {
  worker.port.emit('card-count', 'count cards');
  worker.port.emit('card-link', 'link cards');
  
  console.log('sent');
}


