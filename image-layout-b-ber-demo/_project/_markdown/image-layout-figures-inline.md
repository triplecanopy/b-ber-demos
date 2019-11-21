---
title: Figures Inline Example
type: bodymatter
---

::: chapter:image-layout-figures-inline

When viewing this project in a two-column layout, like in the [Reader](https://github.com/triplecanopy/b-ber/wiki/Output-formats#reader) build or as an [EPUB](https://github.com/triplecanopy/b-ber/wiki/Output-formats#epub) on a desktop computer, the image following this text, *Begrüssung* by Paul Klee, will be in its own column to the right. When viewing on mobile or a tablet, the image will be beneath this text.

b-ber also detects the dimensions of a figure and adds a class, in this case **figure__inline--landscape** so it will be positioned properly in its column irrespective of device or OS.

::: figure-inline:begruessung source:Begruessung_by_Paul_Klee_1922.jpg alt:"Begrüssung by Paul Klee, 1922, watercolor, pen and ink on paper, 22.5 x 31 cm., Wadsworth Atheneum Museum of Art, Hartfort"
:: *Begrüssung* by Paul Klee, 1922, watercolor, pen and ink on paper, 22.5 x 31 cm., Wadsworth Atheneum Museum of Art, Hartfort.
::

::: figure-inline:monuments source:Monuments_at_G._MET_DT7818.jpg alt:"Monuments at G. by Paul Klee, 1929, gypsum and watercolor on canvas, 69.5 × 50.5 × 3.2 cm., The Berggruen Klee Collection."
:: *Monuments at G.* by Paul Klee, 1929, gypsum and watercolor on canvas, 69.5 × 50.5 × 3.2 cm., The Berggruen Klee Collection.
::

When viewing this project in a two-column layout, like in the Reader build or as an EPUB on a desktop computer, the image following this text, *Monuments at G.* by Paul Klee, will be in its own column to the left of this text. When viewing on mobile or a tablet, the image will be above this text.

As mentioned above, b-ber also detects the dimensions of a figure and adds a class, in this case **figure__inline--portrait** so it will be positioned properly in its column irrespective of device or OS. In this example you can see that the image is centered, caption properly aligned on the left with the correct width.

::: exit:image-layout-figures-inline
