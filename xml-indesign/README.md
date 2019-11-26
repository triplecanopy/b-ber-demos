# b-ber XML/IDML

The XML build produces an Adobe InDesign optimized XML file. The xml command will create a new project-epub directory with the compiled contents, and then creates an <project-id>.xml file in the project's root directory. b-ber removes any HTML that will cause issues during import to Adobe InDesign, and inserts pagebreak XML elements into the document where they occur in the original flow of the project.
