var JSONContentLoader = function(contentInfo,onDataSourceFail) {
  this.contentInfo = contentInfo;
  if (onDataSourceFail) {
      this.onDataSourceFail = onDataSourceFail;
  }

}

JSONContentLoader.prototype.runEngine = function(elements, data)
{
  $.each(elements, function (element, sourceDef) {

    console.log('Rendering '+element);
    console.log('  .type='+sourceDef.type);
    console.log('  .source='+sourceDef.source);

    // go out if key element does not exits
    if (!($(element).length)) {return}
    var content;
    if (sourceDef.source != '') {
      content = data[sourceDef.source];
    }

    if (sourceDef.select) {
      console.log('  .has select filter = '+sourceDef.select);
      switch (sourceDef.select) {
        case 'firstKey' :
          content = Object.keys(content)[0];
          console.log('  newcontent = '+content);
          break;
        case 'firstValue' :
          content = $(content)[0];
          console.log('  newcontent = '+content);
          break;
        default :
      }
    } //if (sourceDef.select)

    switch (sourceDef.type) {
      case 'text' :
        console.log('  Setting text of '+element+' to '+content);
        $(element).html(content);
        break;
      case 'list' :
        if ($(content).size()==0) {
          if (sourceDef.ifEmpty) {
            sourceDef.ifEmpty($(element));
          }
        } else {
          // not empty
          if (!!sourceDef.reverse) {
            content = $(content).get().reverse();
          }
          $.each(content, function(index,value){
            if (!!sourceDef.reverse) {
              $(element).prepend( $(sourceDef.listElement).html("<p>"+value+"</p>") )
            } else {
              $(element).append( $(sourceDef.listElement).html("<p>"+value+"</p>") )
            }
          });
        }
        break;
      case 'custom' :
        console.log('  Calling render("'+element+'",('+data[sourceDef.source]+'))');
        sourceDef.render( element, content);
      default:
    } // switch

    if(sourceDef.afterRender) {
      console.log('  Running afterRender');
      sourceDef.afterRender(element, content);
    }

  });
}
JSONContentLoader.prototype.onDataSourceFail = function(src) {
  console.log("onDataSourceFail triggered for "+src);
}
JSONContentLoader.prototype.render = function()
{
  var loader = this;
  $.each(this.contentInfo, function(idx, webpart) {
    console.log(webpart);
    if (webpart['data-source'] != '') {
      $.getJSON(webpart['data-source'], function(data) {
        loader.runEngine(webpart['elements'], data);
      })
      .fail(function() {
        console.log( "getJSON failed for "+webpart['data-source'] );
        if (loader.onDataSourceFail) {
          loader.onDataSourceFail(webpart['data-source']);
        }
      });
    } else {
      loader.runEngine(webpart['elements'], null);
    }
  });
}
