function data_loader_engine(contentBlocks,xml) {

	/* Loop through each if the contentBlocks */
	$.each(contentBlocks, function (key,contentInfo){
		
		console.log('Processing '+key);
		console.log('  type= '+contentInfo.type);
		
		// go out if key element does not exits
		if (!($(key).length)) {return}
		
		switch(contentInfo.type) {
			case "text":
				var content = $(xml).find(contentInfo.source).text();
				$(key).html(content)
				break;
			case "link":
				console.log('  url= '+contentInfo.url);
				console.log('  text= '+contentInfo.text);

				var url = contentInfo.url;
				var params = [];
				if (contentInfo.params) {
					$.each(contentInfo.params, function(){
						this[1] = escape(this[1]);
						params[params.length] = this.join('=');
					});
				}
				url = url+'?'+params.join('&');
				$(key).append( $("<a></a>")
					.attr("href",url)
					.text(contentInfo.text)
				 );
				break;				
			case "list":
				var list = $(xml).find(contentInfo.source);
				
				
				if (list.size()==0) {
					if (contentInfo.emptyListCallback) {
						contentInfo.emptyListCallback($(key))
					}
				} else {
					if (!!contentInfo.reverseRender) {
						list = $(list).get().reverse();
					}
					$.each(list, function(index,value){
						var item = $(value).text()
						
						if (!!contentInfo.reverseRender) {
							$(key).prepend( $(contentInfo.paragraphElement).html("<p>"+item+"</p>") )
						} else {
							$(key).append( $(contentInfo.paragraphElement).html("<p>"+item+"</p>") )
						}
					});
				}
				break;
			case "articles":
				var articles = 	$(xml).find(contentInfo.source).children();
				var titleID = 0;
				$.each(articles,function(index,article){
					var articleTitle = $(article).find(contentInfo.titleSource).text()
					$(key).append( $(contentInfo.titleElement).html(articleTitle));
					var container = $(contentInfo.paragraphContainer).attr("id",++titleID);
					$(key).append($(container));
					$.each( $(article).find(contentInfo.paragraphSource), function(index,paragraph){
						$(container).append( $(contentInfo.paragraphElement).html("<p>"+$(paragraph).text()+"</p>") )
					}) //paragraph
				}) //article

				break;
			case "custom":
				if (!key) {return}
				contentInfo.render( $(key), $(xml).find(contentInfo.source) )
				break;
		}//switch
	}); //each
}