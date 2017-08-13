$(document).ready(function() {
    var $content = $("#jsonContent");
    var data = { rss_url: "https://medium.com/feed/@osmanzub" };
    $.get("https://api.rss2json.com/v1/api.json", data, function(response) {
        if (response.status == "ok") {
            var output = "";
            $.each(response.items, function(k, item) {
                var visibleSm;

                if (k < 3) {
                  visibleSm = "";
                } else {
                  visibleSm = " visible-sm";
                }

                output += '<div class="col-sm-6 col-md-4 cell' + visibleSm + '">';
                output += '<div class="blog-post"><header>';
    
                var tagIndex = item.description.indexOf("<img"); // Find where the img tag starts
                var srcIndex = item.description.substring(tagIndex).indexOf("src=") + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                var src = item.description.substring(srcStart, srcEnd); // Extract just the URL

                //TODO: enforce image sizing
                output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="200px"></div></header>';
                output += '<div class="blog-content"><h4><em><a href="' + item.link + '"style="color:black">' + item.title + "</a></em></h4>";
                output += '<div class="post-meta"><em><span>' + "</span></em></div>";

                var yourString = item.description.replace(/<img[^>]*>/g, "");
                var maxLength = 140; //show 120 char preview

                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                output += "<p>" + trimmedString + "...</p>";
                output += "</div></div></div>";
                return k < 3;
            });
            $content.html(output);
        }
    });
});