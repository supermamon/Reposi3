function getContentBlocks() {
    return {
        "#packageName" : {
            "type": "text",
            "source": "package>name"
        },
        "#packageHeader" : {
            "type":"custom",
            "source":"package>name",
            "render":function(element,source) {
                if (navigator.userAgent.search(/Cydia/) == -1) {
                    $(element).show();
                }
            }
        },
        "#packageVersion" : {
            "type": "text",
            "source": "package>version"
        },
        "#packageShortDesc" : {
            "type": "text",
            "source": "package>shortDescription"
        },
        "#compatibilityCheck" : {
            "type":"custom",
            "source":"package>compatibility>firmware",
            "render":function(element,source){
                var res = ios_version_check(
                    $(source).find("miniOS").text(),
                    $(source).find("maxiOS").text(),
                    $(source).find("otherVersions").text(),
                    function(message,isBad) {
                        $(element).html(message)
                        .addClass( (isBad?'alert-danger':'alert-success'));
                    }
                );
                if(res==0) {$(element).hide()}
            }
        },
        "#descriptionList"	: {
            "type": "list",
            "source":"package>descriptionlist>description",
            "paragraphElement": "<li class='list-group-item'>",
            "emptyListCallback": function(e){$("#descriptionPanel").hide()}
        },
        "#screenshotsLink"	: {
            "type":"custom",
            "source" :"package>screenshots>screenshot",
            "render":function(element, source){
                $("#screenshotsLink").remove();
                if ($(source).size() == 0) {
                        return
                }
                // create screenshots link
                $("#descriptionList").append(
                    $("<a class='link-item list-group-item'>")
                    .attr("href","screenshots.html?p="+bundleid)
                    .text("Screenshots")
                );
            }
        },
        "#versionBadge" : {"type":"text","source":"package>version"},
        "#changesList"	: {
            "type":"list"
            ,"source" :"package>changelog>change"
            ,"reverseRender"    : true
            ,"paragraphElement"	: "<li class='list-group-item'>"
            ,"emptyListCallback":function(e){$("#changesList").hide()}
        },
        "#changelogLink" : {
            "type":"custom",
            "source" :"package>changelog>change",
            "render":function(element, source){
                $("#changelogLink").remove();
                if ($(source).size() == 0) {
                    return
                }
                // create changelog link
                $("#changesList").append(
                    $("<a class='link-item list-group-item'>")
                    .attr("href","changelog.html?p="+bundleid)
                    .text("Full Changelog")
                );
            }
        },
        "#dependencyList" : {
            "type":"list",
            "source" :"package>dependencies>package",
            "paragraphElement"	: "<li class='list-group-item'>",
            "emptyListCallback":function(e){$("#dependenciesContainer").remove()}
        },
        "#externalLinksList" : {
            "type":"custom",
            "source" :"package>links>link",
            "paragraphElement"	: "<li class='list-group-item'>",
            "render":function(element,source){
                if ($(source).size()==0){
                    $('#externalLinksContainer').remove()
                }

                $.each(source, function(index,data) {
                    var a = $("<a class='link-item list-group-item'>");
                    a.attr("href",$(data).find('url').text());
                    if ($(data).find('iconclass')) {
                        var i =  $("<span>")
                        i.attr("class",$(data).find('iconclass').text());
                        console.log(i);
                        $(a).append(i);
                    }
                    $(a).append($(data).find('name').text());
                    $(element).append(a);
                }); //each

            }
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