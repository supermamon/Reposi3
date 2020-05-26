function getContentBlocks() {
    return {
        "#changeLogList" : {
            "type"              : "articles",
            "source"			: "changelog",
            "titleSource" 		: "version",
            "paragraphSource"	: "change",
            "titleElement"	    : "<h5>",
            "paragraphContainer": "<ul class='list-group'>",
            "paragraphElement"	: "<li class='list-group-item'>"
        }

    }
}

function populateContentBlocks(data, blocks, error, success) {
    $.ajax({
        type    : "GET",
        dataType: "xml",
        url     : data,
        success : function(xml){
            data_loader_engine(blocks,xml);
            success(xml);
        },
        cache   : false,
        error: function(jqXHR, textStatus) {
            $("#packageError").show();
            $("#packageInformation").hide();
            error(textStatus);
        }
    }); //ajax    
}