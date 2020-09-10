// can be changed to a bookmarklet with a bookmarklet maker like e.g.:
// https://bookmarklets.org/maker/

// inspired by :
// https://www.javascript-kurs.de/javascript-getSelection.htm
// https://www.w3schools.com/howto/howto_css_modals.asp
// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings/50477423
//


function truncate(str, maxLen,truncateTo, lastNChars, useWordBoundary ){
    var lastChars="";
    if (str.length <= maxLen) { return str; }
    const subString = str.substr(0, truncateTo-1); // the original check
    if (lastNChars >0) {
        lastChars = str.substr(str.length-lastNChars-1,lastNChars);
    }
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;" + lastChars;
  };

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
    var url = url.toLocaleLowerCase();
    var title = "";
    var author = "";
    var isBook = false;
    // check if on lesen.amazon.de ??? notebook


    // Amazon Notebook:
    if (url.indexOf("amazon.de") >0  & url.indexOf("notebook") >0) {
        title = $('h3.kp-notebook-metadata').text();
        author = $('p.a-spacing-top-micro.kp-notebook-metadata').text();
        isBook=true;
    }

    // Get generic title and author 
    if (title ==""){
        title = $('title').text();
    }
    if (author ==""){
        author = $('meta[name=author]').attr("content");
    }

    if (title==undefined){
        title="";
    }
    if (author==undefined){
        author="";
    }


    title = truncate (title,100,80,0,true);
    url = truncate (url,100,80,4,false);

    var citeBox = '<div id="mwCiteBox" style="display: block; position: fixed; z-index: 1; padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);line-height: normal;">'+
                '<div id="mwCiteBoxContent" style="margin: auto;padding: 20px;border: 1px solid #888;width: 40%;border-radius:5px;-moz-box-shadow:0 0 5px #888;-webkit-box-shadow:0 0 5px#888;box-shadow:0 0 5px #888;background:#eee;">'+
                    '<div id="mwCiteBoxCite" style="color: #000; font-family: Times New Roman, Times, serif; font-size:20px;">»' + content + '«</div>';
    if (title!="") {
        citeBox+= '<div id="mwCiteBoxTitle" style="font-family: Arial, Helvetica, sans-serif;padding-top:10px;font-size:16px;">' + title + '</div>';
        
    }
    if (author!="") {  
        citeBox+='<div id="mwCiteBoxAuthor" style="font-family: Arial, Helvetica, sans-serif;padding-top:5px;color:#a49e99;font-size:14px;">' + author + '</div>';
    }
    if (!isBook){
        citeBox+='<div id="mwCiteBoxURL" style="font-family: Arial, Helvetica, sans-serif;padding-top:5px;color:#a49e99;font-size:10px;">' + url + '</div>';
    }

    citeBox +='</div></div>';

    $('body').prepend(citeBox);
    $('#mwCiteBox').click(function() {
        $("#mwCiteBox").remove();
    });
    
});
