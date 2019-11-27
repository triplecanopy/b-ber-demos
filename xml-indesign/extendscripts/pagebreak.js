//Script to replace all 'pagebreak' and 'br' tags with special Indesign breaking characters.
//'pagebreak' tags are replaced with a frame break, so that the content flows to the next text frame 
//(next page, assuming one tet frame per page).
//'br' tags are replaced with a line break character.


var myDoc = app.activeDocument;
var body = myDoc.xmlElements[0];
pageBreakingXPath(body);
 

function pageBreakingXPath(elm){
    var pagebreaks = elm.evaluateXPathExpression("//pagebreak");
    var brs = elm.evaluateXPathExpression("//br");

    for (var i = 0; i < pagebreaks.length; i++) {
        try{
          var tag = pagebreaks[i]; //this is the current XML element
          tag.contents = SpecialCharacters.frameBreak;
        }catch(e){}
    }

    for (var i = 0; i < brs.length; i++) {
        try{
          var tag = brs[i]; //this is the current XML element
          tag.contents = "\n";
        }catch(e){}
    }
}