var JSONContentLoader = function(contentInfo,onDataSourceFail) {
  this.verbose = false;
  this.contentInfo = contentInfo;
  if (onDataSourceFail) {
      this.onDataSourceFail = onDataSourceFail;
  }
}

JSONContentLoader.prototype.log = function(msg) {
  if (this.verbose) {
    console.log(msg);
  }
}

JSONContentLoader.prototype.runEngine = function(elements, data)
{
  var self = this;
  $.each(elements, function (element, sourceDef) {

    self.log('Rendering '+element);
    self.log('  .type='+sourceDef.type);
    self.log('  .source='+sourceDef.source);

    // go out if key element does not exits
    if (!($(element).length)) {return}
    var content;
    if (sourceDef.source != '') {
      content = data[sourceDef.source];
    }

    if (sourceDef.select) {
      self.log('  .has select filter = '+sourceDef.select);
      switch (sourceDef.select) {
        case 'firstKey' :
          content = Object.keys(content)[0];
          self.log('  newcontent = '+content);
          break;
        case 'firstValue' :
          content = $(content)[0];
          self.log('  newcontent = '+content);
          break;
        default :
      }
    } //if (sourceDef.select)

    switch (sourceDef.type) {
      case 'text' :
        self.log('  Setting text of '+element+' to '+content);
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
        self.log('  Calling render("'+element+'",('+content+'))');
        sourceDef.render( element, content);
      default:
    } // switch

    if(sourceDef.afterRender) {
      self.log('  Running afterRender');
      sourceDef.afterRender(element, content);
    }

  });
}
JSONContentLoader.prototype.onDataSourceFail = function(src) {
  self.log("onDataSourceFail triggered for "+src);
  return this
}

JSONContentLoader.prototype.render = function()
{
  var self = this;
  $.each(self.contentInfo, function(idx, webpart) {
    self.log(webpart);
    if (webpart['data-source'] != '') {
      $.getJSON(webpart['data-source'], function(data) {
        self.runEngine(webpart['elements'], data);
      })
      .fail(function() {
        self.log( "getJSON failed for "+webpart['data-source'] );
        if (self.onDataSourceFail) {
          self.onDataSourceFail(webpart['data-source']);
        }
      });
    } else {
      self.runEngine(webpart['elements'], null);
    }
  });
}
