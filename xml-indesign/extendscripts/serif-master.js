//Runs other scripts in order. 
//This script is only for the b-ber-serif-theme,
//as it runs the script 'serif-adjustments.js'

var f1 = File(app.activeScript.parent.relativeURI + "/pagebreak.js");
var f2 = File(app.activeScript.parent.relativeURI + "/img-resize.js");
var f3 = File(app.activeScript.parent.relativeURI + "/serif-adjustments.js");
var f4 = File(app.activeScript.parent.relativeURI + "/nested-style-override.js");

if (f1.exists)
{
	app.doScript(f1, ScriptLanguage.JAVASCRIPT);
}
if (f2.exists)
{
	app.doScript(f2, ScriptLanguage.JAVASCRIPT);
}
if (f3.exists)
{
	app.doScript(f3, ScriptLanguage.JAVASCRIPT);
}
if (f4.exists)
{
	app.doScript(f4, ScriptLanguage.JAVASCRIPT);
}