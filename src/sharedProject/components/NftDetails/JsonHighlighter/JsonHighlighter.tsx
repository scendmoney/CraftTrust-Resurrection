import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface JsonHighlighterProps {
  json: object;
}

const JsonHighlighter: React.FC<JsonHighlighterProps> = ({ json }) => {
  const jsonString = JSON.stringify(json, null, 2);

  return (
    <SyntaxHighlighter language="json" wrapLongLines customStyle={{ backgroundColor: 'white' }}>
      {jsonString}
    </SyntaxHighlighter>
  );
};

export default JsonHighlighter;
