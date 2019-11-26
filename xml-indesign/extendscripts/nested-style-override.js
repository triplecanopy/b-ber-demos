//This script generically applies any paragraph styles that are otherwise unable to be 
//automatically applied by InDesign when importing the XML file, as well as allows for 
//specific targeting and styling of XML elements. The script works by iterates through 
//every XML element and checks if there are any styles for the element, and applies the
//most specific one.

//For example, if one wanted to style a 'figcaption' element, this figcaption will most 
//likely have a 'p' element within it that will have a mapped style associated with it. 
//To solve this problem, when this script encounters a 'figcaption' element, it will 
//apply a paragraph of the same name to the 'figcaption' and all of it's descendents. 

//Additional styling can be added just by creating an paragraph style within InDesign that 
//is named to match the relevant XML hierarchy. For example, a style called 'section pullquote'
//will be applied only to 'pullquote' elements whose parent is a 'section' element, and not
//to other 'pullquote' elements that do not meet this criteria.

overrideStyles();

function overrideStyles(){
    var myDoc = app.activeDocument;
    //relies on assumption that everything in the XML document is within the parent tag 'body'
    var body = myDoc.xmlElements[0];
    var parentString = "body";

    parse(body, parentString);
    reverseItalics(body);
}

//'parentString' is basically a string that records the nested heirarchy that the current element is a part of.
function parse(elm, parentString){
    for (var i = 0; i < elm.xmlElements.length; i++){
            //current element
            var tag = elm.xmlElements[i];
            var tagName = getName(tag);
            tag.select();
            //convert list of parents  into an array
            var parent_arr = parentString.split(" ");

            var style = tagName;
            //if there is a paragraph style of the same name as the current element, try applying that first.
            try{
                tag.applyParagraphStyle(style, false);
            } catch(e){}
            
            //iteratively attempt to style current element using higher levels of specificity
            //ex: try to style with the paragraph style "<parent-name> <element-name>", then "<grandparent-name> <parent-name> <element-name>" etc.
            //until we reach the root XML element.
            for(var j = parent_arr.length - 1; j >= 0; j--){
                style = parent_arr[j] + " " + style;
                try {
                    tag.applyParagraphStyle(style, false);
                } catch(e){}                
            }
            
        //recurse down further descendents, adding the current element name to the end of the list of parents. 
        parse(tag, parentString + " " + tagName);
    }
}

//function to reverse italics. 
//In contexts where a paragraph is in italics, 'em' elements should not be italic.
function reverseItalics(elm){
    var ems = elm.evaluateXPathExpression("//em");
    for (var i = 0; i < ems.length; i++){
        try{
            var tag = ems[i];
            var parentStyle = tag.parent.paragraphs[0].fontStyle;
            if(parentStyle == "Italic"){
                tag.applyCharacterStyle("em-reverse");
            }
        } catch(e){}
    }
}

//helper function to get the name of an xml element
function getName(elm){
    return elm.markupTag.name.toString();
}

//an attempt to parse the xml file using xpaths, but doesnt work because doesnt apply styles from
//general to specific. This might be a case where recursing down the XML file might
//actually be necessary.

// function parse(elm){
//     var pStyles = app.activeDocument.paragraphStyles;
//     var xPaths = [];
//     for(var i = 0; i < pStyles.length; i++){
//         var styleName = pStyles[i].name;
//         var styleNameSplit = styleName.split(" ");
        
//         var xPath = "//";
//         for(var j =0; j < styleNameSplit.length; j++){
//             if(j == styleNameSplit.length - 1){
//                 xPath += styleNameSplit[j];
//             } else {
//                 xPath += (styleNameSplit[j] + "/");
//             }
           
//         }

//         try{
//             var tags = elm.evaluateXPathExpression(xPath);
//             for(var j = 0; j < tags.length; j++){
//                 tags[j].applyParagraphStyle(styleName, false);
//             }
//         }catch(e){}
//     }
// }


