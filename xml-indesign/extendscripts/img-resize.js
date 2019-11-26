//this function resizes images based on whether they should be
//figure thumbnails or inline figures.
//Calulate width of document, and set number of columns
var activeDocument = app.activeDocument;

var documentWidth = activeDocument.documentPreferences.pageWidth;
var documentHeight = activeDocument.documentPreferences.pageHeight;

var marginTop = activeDocument.marginPreferences.top;
var marginLeft = activeDocument.marginPreferences.left;
var marginRight = activeDocument.marginPreferences.right;
var marginBottom = activeDocument.marginPreferences.bottom;

var textFrameWidth = documentWidth - (marginLeft + marginRight);
var textFrameHeight = documentHeight - (marginTop + marginBottom);

var smallImageXPath =
  "//div[contains(concat(' ', normalize-space(@class), ' '), ' figure__small ')]/*/img";

var largeImageXPath =
  "//div[contains(concat(' ', normalize-space(@class), ' '), ' figure__large ')]/*/img";

// var largeMediaXPath =
//   "//*[contains(concat(' ', normalize-space(@class), ' '), ' figure__large ')]/source";

var objectStyles = {
  autoSize: activeDocument.objectStyles.item("autoSize"),
  imgFit: activeDocument.objectStyles.item("imgFit"),
  figureInline: activeDocument.objectStyles.item("figureInline")
};

var COLUMN_SIZE_MAX_SMALL = 10;
var COLUMN_SIZE_MAX_LARGE = 300;
var COLUMN_SIZE_DEFAULT_SMALL = 20;
var COLUMN_SIZE_DEFAULT_LARGE = 100;

var SIZES = { small: "small", large: "large" };

var columnSizes = {
  small: COLUMN_SIZE_DEFAULT_SMALL,
  large: COLUMN_SIZE_DEFAULT_LARGE
};

function resizeImages() {
  var body = activeDocument.xmlElements[0];

  //make sure dialog is interactable
  app.scriptPreferences.userInteractionLevel =
    UserInteractionLevels.interactWithAll;
  //pop up a dialog that gets the user-defined number of columns the image width should be.
  var userInputs = showDialog();
  if (!userInputs) return;

  //safeguarding against extreme user inputs
  userInputs.largeImageWidthPercentage = clamp(
    userInputs.largeImageWidthPercentage,
    COLUMN_SIZE_MAX_SMALL,
    COLUMN_SIZE_MAX_LARGE
  );

  userInputs.smallImageWidthPercentage = clamp(
    userInputs.smallImageWidthPercentage,
    COLUMN_SIZE_MAX_SMALL,
    COLUMN_SIZE_MAX_LARGE
  );

  columnSizes = {
    small: userInputs.smallImageWidthPercentage,
    large: userInputs.largeImageWidthPercentage
  };

  var transforms = [
    {
      xPath: smallImageXPath,
      size: SIZES.small
    },
    {
      xPath: largeImageXPath,
      size: SIZES.large
    }
    // {
    //   xPath: largeMediaXPath,
    //   size: SIZES.large
    // }
  ];

  applyStyles(transforms, body);
}

//Iterate over directives obj and eval xPath
function applyStyles(transforms, rootElement) {
  for (var i = 0; i < transforms.length; i++) {
    var transform = transforms[i];

    var expr = transform.xPath;
    var size = transform.size;
    var nodes = rootElement.evaluateXPathExpression(expr);

    parseTags(nodes, size);
  }
}

//If evaluated tag is an img, pass to image reformatting process
//If anything else, insert contents into inline text frame at new column width and 1px height
//Apply autoSize object style to inline frame to scale height to contents
function parseTags(nodes, size) {
  //Locate Object Styles defined in document

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var figureWidth = String(textFrameWidth * (columnSizes[size] / 100)) + "in"; //width of inline figure calculated based on column width
    //targeting figure thumbnails
    if (size === SIZES.small) {
      //places image into an inline frame (anchored to text and flows with text flow)
      //and applies the appropriate object style
      node
        .placeIntoInlineFrame([figureWidth, textFrameHeight])
        .applyObjectStyle(objectStyles.imgFit);

      //resize image to proportionally fit into the frame
      node.graphics[0].fit(FitOptions.PROPORTIONALLY);
      //resize frame to fit to the image.
      node.graphics[0].fit(FitOptions.FRAME_TO_CONTENT);
    }

    //targeting inline figures
    else if (size === SIZES.large) {
      //places image into an inline frame (anchored to text and flows with text flow)
      //and applies the appropriate object style
      //note that the image is originally placed in a square frame
      node
        .placeIntoInlineFrame([figureWidth, figureWidth])
        .applyObjectStyle(objectStyles.figureInline);

      //resize image to proportionally fit into the square frame
      node.graphics[0].fit(FitOptions.PROPORTIONALLY);
      //resize frame to fit to the image.
      node.graphics[0].fit(FitOptions.FRAME_TO_CONTENT);

      //calculate width of this frame
      //places the parent of the image into a frame
      //this in necessary because this parent frame contains a figcaption, which we want to be anchored to the figure.
      //also sets the width of the parent frame to be the same width of the figure.

      var bounds = node.graphics[0].visibleBounds;
      var figureFrameWidth = String(bounds[3] - bounds[1]) + "in";

      node.parent
        .placeIntoInlineFrame([figureFrameWidth, textFrameHeight])
        .applyObjectStyle(objectStyles.autoSize);
    }
  }
}

//function to create and display dialog
function showDialog() {
  var dialog = app.dialogs.add({ name: "Set Width of Figures" });

  with (dialog.dialogColumns.add()) {
    with (dialogRows.add()) {
      staticTexts.add({
        staticLabel:
          "Set the widths of each figure type based on percentage of the width of the text frame."
      });
    }
    with (dialogRows.add()) {
      with (dialogColumns.add()) {
        staticTexts.add({ staticLabel: "Inline Figures: " });
      }

      with (dialogColumns.add()) {
        var largeImageWidthPercentageField = percentEditboxes.add({
          editValue: COLUMN_SIZE_DEFAULT_LARGE
        });
      }
    }
    with (dialogRows.add()) {
      with (dialogColumns.add()) {
        staticTexts.add({ staticLabel: "Figure Thumbnails: " });
      }

      with (dialogColumns.add()) {
        var smallImageWidthPercentageField = percentEditboxes.add({
          editValue: COLUMN_SIZE_DEFAULT_SMALL
        });
      }
    }
  }

  if (!dialog.show()) return; // TODO why 0?

  return {
    largeImageWidthPercentage: largeImageWidthPercentageField.editValue,
    smallImageWidthPercentage: smallImageWidthPercentageField.editValue
  };
}

function clamp(num, min, max) {
  return num < min ? min : num > max ? max : num;
}

resizeImages();
