function json_data_loader_engine(containersJSON,dataJSON) {
  $.each(containersJSON, function (containerName, srcJSON) {

    console.log('Rendering '+containerName);

    console.log('  .type='+srcJSON.type);
    console.log('  .source='+srcJSON.source);

    // go out if key element does not exits
    if (!($(containerName).length)) {return}

    switch (srcJSON.type) {
      case 'text' :
        console.log('  Setting text of '+containerName+' to '+dataJSON[srcJSON.source]);
        var content = dataJSON[srcJSON.source];
          $(containerName).html(content);
        break;
      case 'custom' :
        console.log('  Calling render("'+containerName+'",('+dataJSON[srcJSON.source]+'))');
        srcJSON.render( containerName, dataJSON[srcJSON.source]);
      default:
    } // switch

  });
}
