
self.port.on('card-count', function(message) {
	console.log('1');

  setTimeout(initialize, 5000); //first count after 5s to give time trello to load data
  setInterval(cardcount, 30000); //recaunt cards every 30s for each list

  setTimeout(showIDs, 10000); //show #id of each card after 15s

});


self.port.on('card-link', function(message) {
  console.log('linking');

  setTimeout(linkcards, 5000); //first count after 5s to give time trello to load data

});

function showIDs() {
  console.log('show');
  $('.card-short-id').removeClass('hide');
}


function initialize() {

  console.log('init');
  $('div.list div.list-cards').each(function( index ) {         
      that=this;

      $('h2', $(that).parent()).after(
        '<div class="card-counter" ' +
        'style="float: right; background-color: white; border-color: white; border-radius: 4px; padding: 4px; color: #393939">'+
        $(that).children().size()+'</div>'
     );
  });   

}


function cardcount() {
  // console.log('message');
  if (! $('.card-counter').length) { //init did not go well, or board is changed 
    initialize();
  } else {
  	$('div.list div.list-cards').each(function( index ) {         
  	    that=this;
        $('.card-counter', $(that).parent()).html($(that).children().size());
    });		
  }
}


function linkcards() {
  console.log('inlink');
  var linked = new Array();
  $('.list-card-title').each(function( index ) {         
      that = $(this);
      tmpid = $('.card-short-id', $(this)).text();
      cardid = tmpid.substring(0, tmpid.length - 1);

      txt = that.text();

      matches = txt.match(/\[link#(\d+)\]/);
      if(matches != null) {
        arr = new Array();
        linked.push([cardid, '#'+matches[1]]);
      }
  });
  console.log(linked);
  console.log('message');
  for(i=0; i<linked.length; i++) {
    console.log(linked[i][0]);
    console.log(linked[i][1]);

    div1 = $('.card-short-id:contains("'+ linked[i][0] +' ")').parent().parent();
    div2 = $('.card-short-id:contains("'+ linked[i][1] +' ")').parent().parent();

console.log(div1);

    drawconnection(div1, div2, '#f00');
  }
}

function drawconnection(div1, div2, color) {
    var thickness = 2;
    var off1 = getOffset(div1);
    console.log(off1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left + off1.width;
    var y1 = off1.top + off1.height;
    // top right
    var x2 = off2.left + off2.width;
    var y2 = off2.top;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg); z-index:1;' />";
    //
    //alert(htmlLine);
    document.body.innerHTML += htmlLine; 
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    var _w = el.offsetWidth|0;
    var _h = el.offsetHeight|0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x, width: _w, height: _h };
}