import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const reverse = vscode.commands.registerCommand("flip.document", () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      activeEditor.edit(builder => {
        const lineCount = activeEditor.document.lineCount;
        const loopCount = Math.floor((lineCount - 1) / 2);
        for (let i = 0; i <= loopCount; i++) {
          const iLine = activeEditor.document.lineAt(i);
          const jLine = activeEditor.document.lineAt(lineCount - 1 - i);
          const iText = iLine.text;
          builder.replace(iLine.range, jLine.text);
          builder.replace(jLine.range, iText);
        }
      });
    }
  });

  const reverseSelection = vscode.commands.registerCommand(
    "flip.selection",
    () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor && activeEditor.selections) {
        activeEditor.edit(builder => {
          activeEditor.selections.forEach(selection => {
            const startLine = selection.start.line;
            const endLine = selection.end.line;
            const lineCount = endLine - startLine;
            const loopCount = Math.floor((lineCount - 1) / 2);
            for (let i = 0; i <= loopCount; i++) {
              const iLine = activeEditor.document.lineAt(startLine + i);
              const jLine = activeEditor.document.lineAt(endLine - i);
              const iText = iLine.text;
              builder.replace(iLine.range, jLine.text);
              builder.replace(jLine.range, iText);
            }
          });
        });
      }
    }
  );

  context.subscriptions.push(reverse);
  context.subscriptions.push(reverseSelection);
}

export function deactivate() {}
