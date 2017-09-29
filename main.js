
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
	var articles = [];
	var articlesData = data.query.search;
	for (var i=0; i<articlesData.length; i++){
		var article = new Article(
			articlesData[i].title,
			articlesData[i].snippet,
			articlesData[i].pageid
			);
		articles.push(article);
		var pageUrl = "http://en.wikipedia.org/wiki?curid=" + article.pageID;
		var html = "<li><div><em>" + article.title + "</em> <p>" + article.snippet + "</p><a href='"+ pageUrl +"' target='_blank'>Read More</a></div></li>";
		$("#results").append(html);
	}
	console.log(articles);
}

function Article(title, snippet, pageID){
	this.title = title;
	this.snippet = snippet;
	this.pageID = pageID;
}
