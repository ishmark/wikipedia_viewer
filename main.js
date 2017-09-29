
function searchArticles(){
	var query = $("#search").val();
	var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + query + "&callback=?";

	$.ajax({
		type: "GET",
		url: wikiApi,
		dataType: 'jsonp',
		success: function(data){
			$("#results").empty();
			parseJSON(data);
		},
		error: function(error){
			console.log(error);
		}
	});
}

function parseJSON(data){
	var articlesData = data.query.search;
	for (var i=0; i<articlesData.length; i++){
		var article = new Article(
			articlesData[i].title,
			articlesData[i].snippet,
			articlesData[i].pageid
			);
		var pageUrl = "http://en.wikipedia.org/wiki?curid=" + article.pageID;
		var html = "<div class='col-md-12 result-cell'><b>" + article.title + "</b> <p>" + article.snippet + "</p><a href='"+ pageUrl +"' target='_blank' class='pull-right'>Read More</a></div><div class=col-md-12><br/></div>";
		$("#results").append(html);
			console.log(article);

	}
}

function Article(title, snippet, pageID){
	this.title = title;
	this.snippet = snippet;
	this.pageID = pageID;
}
