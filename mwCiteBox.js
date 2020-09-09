// can be changed to a bookmarklet with a bookmarklet maker like e.g.:
// https://bookmarklets.org/maker/

function getTextSelection(){
    var nutzertextauswahl = "";
    if (window.getSelection) { 
        nutzertextauswahl = window.getSelection().toString();
        return (nutzertextauswahl);
    } else if (document.getSelection) { 
        nutzertextauswahl = document.getSelection().toString();
        return (nutzertextauswahl);
    } else if (document.selection) { 
        // Internet Explorer vor der Version 9
        nutzertextauswahl = document.selection.createRange().toString();
        return (nutzertextauswahl);
    }
}


$(function() {
    
    var content = getTextSelection();
    var url     = window.location.href; 
    url = url.toLocaleLowerCase();
    // check if on lesen.amazon.de ??? notebook

    // Amazon Notebook:
    var title = $('h3.kp-notebook-metadata').text();
    var author = $('p.a-spacing-top-micro.kp-notebook-metadata').text();


    if (url.indexOf("amazon.de") >0  & url.indexOf("notebook") >0) {
            //alert(booktitle);
        alert("Author: " + author);

    } else {
        alert("notAmazon");
    }

    var divBox = '<div style="border:1px solid #888;border-radius:5px;-moz-box-shadow:0 0 5px #888;-webkit-box-shadow:0 0 5px#888;box-shadow:0 0 5px #888;background:#eee;text-align:left;padding:1em;">' + 
                '<a href="#" onclick="document.body.removeChild(document.body.firstChild);return false">remove</a>' + content + '</div>'
    alert(content);
    $('body').prepend(divBox);
    
});
