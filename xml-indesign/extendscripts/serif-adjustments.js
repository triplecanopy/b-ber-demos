//Script to apply necessary styling changes to the b-ber-serif theme, which sepearates paragraphs
//with indents rather than line breaks (as in the b-ber-sans theme).
//This script does two things: 
//  1. Indents all paragraphs except for the first paragraph of a section
//  2. adds spacing between h1 headers and the following paragraph.

var myDoc = app.activeDocument;
var body = myDoc.xmlElements[0];
serifAdjustments(body);

function serifAdjustments(elm){
    //all p that follows a p or blockquote
    var pTags = elm.evaluateXPathExpression("//p/following-sibling::p");
    for (var i = 0; i < pTags.length; i++){
        pTags[i].applyParagraphStyle("p-indent", false);
    }

    var h1Tags = elm.evaluateXPathExpression("//h1");
    var h1TagsBeforeH2 = elm.evaluateXPathExpression("//h2/preceding-sibling::h1[1]");

    //selects all h1 tags and adds two line spaces after
    for (var i = 0; i < h1Tags.length; i++){
        h1Tags[i]
        var tempContent = h1Tags[i].contents;
        //deletes any already existing spacing to avoid accumulating whitespace
        //from running this script multiple times
        tempContent = tempContent.replace(/\n\n/g, "");
        h1Tags[i].contents = tempContent + "\n\n";
    }

    //selects all h1 tags that come before h2 tags and getting rid of any line spaces.
    for (var i = 0; i < h1TagsBeforeH2.length; i++){
        var tempContent = h1TagsBeforeH2[i].contents;
        tempContent = tempContent.replace(/\n\n/g, "");
        h1TagsBeforeH2[i].contents = tempContent;
    }    
}