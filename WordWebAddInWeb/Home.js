﻿"use strict";
Office.onReady(function () {
  // Office is ready.
  $(document).ready(function () {
    // The document is ready.
    // Use this to check whether the API is supported in the Word client.
    if (Office.context.requirements.isSetSupported("WordApi", "1.1")) {
      // Do something that is only available via the new APIs.
      $("#emerson").click(function () {
        insertEmersonQuoteAtSelection();
      });
      $("#checkhov").click(function () {
        insertChekhovQuoteAtTheBeginning();
      });
      $("#proverb").click(function () {
        insertChineseProverbAtTheEnd();
      });
      $("#supportedVersion").html("This code is using Word 2016 or later.");
    } else {
      // Lets you know that this code will not work with your version of Word.
      $("#supportedVersion").html("This code requires Word 2016 or later.");
    }
  });
  function insertEmersonQuoteAtSelection() {
    Word.run(function (context) {
      // Create a proxy object for the document.
      var thisDocument = context.document;

      // Queue a command to get the current selection.
      // Create a proxy range object for the selection.
      var range = thisDocument.getSelection();

      // Queue a command to replace the selected text.
      range.insertText(
        '"Hitch your wagon to a star." - Ralph Waldo Emerson\n',
        Word.InsertLocation.replace
      );

      // Synchronize the document state by executing the queued commands,
      // and return a promise to indicate task completion.
      return context.sync().then(function () {
        console.log("Added a quote from Ralph Waldo Emerson.");
      });
    }).catch(function (error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }

  function insertChekhovQuoteAtTheBeginning() {
    Word.run(function (context) {
      // Create a proxy object for the document body.
      const body = context.document.body;

      // Queue a command to insert text at the start of the document body.
      body.insertText(
        '"Knowledge is of no value unless you put it into practice." - Anton Chekhov\n',
        Word.InsertLocation.start
      );

      // Synchronize the document state by executing the queued commands,
      // and return a promise to indicate task completion.
      context.sync();
      console.log("Added a quote from Anton Chekhov.");
    }).catch(function (error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }

  function insertChineseProverbAtTheEnd() {
    Word.run(function (context) {
      // Create a proxy object for the document body.
      const body = context.document.body;

      // Queue a command to insert text at the end of the document body.
      body.insertText(
        '"To know the road ahead, ask those coming back." - Chinese proverb\n',
        Word.InsertLocation.end
      );

      // Synchronize the document state by executing the queued commands,
      // and return a promise to indicate task completion.
      return context.sync().then(function () {
        console.log("Added a quote from a Chinese proverb.");
      });
    }).catch(function (error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }
})();
