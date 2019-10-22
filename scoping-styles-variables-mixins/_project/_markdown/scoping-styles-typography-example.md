---
title: "Scoping Styles, Variables, and Mixins Example (Typography)"
type: bodymatter
---

::: chapter:scoping-styles-typography-example classes:"typography-example"

# Scoping Styles, Variables, and Mixins Example (Typography)

When viewing this project in the [Reader](https://github.com/triplecanopy/b-ber/wiki/Output-formats#reader) build, three adjustments have been made to the typography:

1. The font uses the **$mono** variable from the **_settings.sccs** file, which has the font-stack of **Menlo, Osaka, Monaco, monospace**;
2. The font size has been decreased by using the **@include type-settings(-2);** [mixin](https://github.com/triplecanopy/b-ber/wiki/serif#one-line-two-lines-);
3. The chapter header has the attributes of **font-weight: bold; padding-bottom: one-line(0); text-align: left;**, which makes the header bold, reduces the bottom padding with a [mixin](https://github.com/triplecanopy/b-ber/wiki/serif#one-line-two-lines-), and makes it left-aligned.

When viewing this project as an [EPUB](https://github.com/triplecanopy/b-ber/wiki/Output-formats#epub) build, two changes have been made to the typography:

1. The font uses the **$sans** variable from the **_settings.sccs** file, which has the font-stack of **Helvetica, Arial, sans-serif**;
2. The chapter header has the attributes of **text-transform: uppercase;
text-align: right;**, which makes the header uppercase and right-aligned.

You can find out more about scoping styles in the b-ber wiki [Adding custom styles](https://github.com/triplecanopy/b-ber/wiki/Adding-Custom-Styles) page.

::: exit:scoping-styles-typography-example
