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
    alert (getTextSelection());
});
