!function(a){var e=/\\([^a-z()[\]]|[a-z\*]+)/i,n={"equation-command":{pattern:e,alias:"regex"}};a.languages.latex={comment:/%.*/m,cdata:{pattern:/(\\begin\{((?:verbatim|lstlisting)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,lookbehind:!0},equation:[{pattern:/\$(?:\\?[\w\W])*?\$|\\\((?:\\?[\w\W])*?\\\)|\\\[(?:\\?[\w\W])*?\\\]/,inside:n,alias:"string"},{pattern:/(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,lookbehind:!0,inside:n,alias:"string"}],keyword:{pattern:/(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,lookbehind:!0},url:{pattern:/(\\url\{)[^}]+(?=\})/,lookbehind:!0},headline:{pattern:/(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,lookbehind:!0,alias:"class-name"},function:{pattern:e,alias:"selector"},punctuation:/[[\]{}&]/}}(Prism);