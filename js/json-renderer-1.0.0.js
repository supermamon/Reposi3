var JSONRenderer = function(props) {
  console.log('JSONRenderer.constructor');
  this.props = props;
  console.log(' .props.verbose='+this.props.verbose);
  this.log = function(msg) {
    if (this.props.verbose) {
      console.log(msg);
    }
  }
}

JSONRenderer.prototype.onNoContentDefinition = function(obj) {
  if (obj) {
    obj.log("prototype.onNoContentDefinition");
  } else {
    console.log("prototype.onNoContentDefinition");
  }
}
JSONRenderer.prototype.onNoDataSourceProvided = function(definition,obj) {
  if (obj) {
    obj.log("prototype.onNoDataSourceProvided");
  } else {
    console.log("prototype.onNoDataSourceProvided");
  }
}
JSONRenderer.prototype.onDataFileError = function(file,obj) {
  if (obj) {
    obj.log("prototype.onDataFileError--" + file);
  } else {
    console.log("prototype.onDataFileError--" + file);
  }
}

JSONRenderer.prototype.raiseError = function(fnErrorName, args) {

  this.log("prototype.raiseError ("+fnErrorName+")");
  var fnError = this[fnErrorName];
  if (this.props[fnErrorName]) {
    this.log("  "+fnErrorName+" was overridden. Using it instead.");
    fnError = this.props[fnErrorName];
  }
  if (!!args) {
    return fnError(args,this);
  } else {
    return fnError(this);
  }
}

JSONRenderer.prototype.runEngine = function(elements, data)
{
  var self = this;
  $.each(elements, function (element, sourceDef) {

    self.log('Rendering '+element);
    self.log('  .type='+sourceDef.type);
    self.log('  .source='+sourceDef.source);
    self.log('  .element='+element);


    // go out if key element does not exits
    if (!$(element)) {return}
    var content;
    if (sourceDef.source != '') {
      self.log('  .loading data');
      content = data[sourceDef.source];
    }

    self.log('  .data='+content);

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

JSONRenderer.prototype.preRender = function() {
  this.log('JSONRenderer.preRender start');
  if (!this.props.contentDefinition) {
    this.raiseError('onNoContentDefinition');
    this.log('JSONRenderer.preRender exit(false)');
    return false;
  }
  this.log('JSONRenderer.preRender exit(true)');
  return true;
}
JSONRenderer.prototype.render = function()
{
  var self = this;
  self.log('JSONRenderer.render start');

  if (!self.preRender()) {return false}

  console.log(this.props.contentDefinition);

  // loop through each definition
  $.each(this.props.contentDefinition, function(idx, thisDefinition) {
    self.log("  reading definition["+idx+"]");
    self.log("  data-source = "+ thisDefinition['data-source']);
    var dataSource = thisDefinition['data-source'];
    if (!dataSource) {
      dataSource = '';
    }
    if (dataSource == 'NONE') {
      self.runEngine(thisDefinition['elements'], null);
    } else if (dataSource != '') {
      // try loading the data-source
      $.getJSON(dataSource, function(data) {
        self.runEngine(thisDefinition['elements'], data);
      })
      .fail(function() {
        self.log("  Failed loading " + dataSource );
        self.raiseError('onDataFileError', dataSource)
      });

    } else {
      self.log("  Encountered a definition without a data-source");
      self.raiseError('onNoDataSourceProvided', thisDefinition);
    }
  }); //.each

}
