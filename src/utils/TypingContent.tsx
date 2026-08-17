import React, { useEffect, useState } from 'react';

interface TypingContentProps {
  children: React.ReactNode;
  speed?: number;
}

interface TextNodeInfo {
  text: string;
  node: React.ReactNode;
  start: number;
  end: number;
}

export const TypingContent: React.FC<TypingContentProps> = ({ children, speed = 12 }) => {
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const [textNodes, setTextNodes] = useState<TextNodeInfo[]>([]);

  function processNode(node: React.ReactNode, textNodes: TextNodeInfo[] = [], currentLength = 0): [TextNodeInfo[], number] {
    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node);
      textNodes.push({
        text,
        node,
        start: currentLength,
        end: currentLength + text.length
      });
      return [textNodes, currentLength + text.length];
    }

    if (Array.isArray(node)) {
      let length = currentLength;
      node.forEach(child => {
        const [_, newLength] = processNode(child, textNodes, length);
        length = newLength;
      });
      return [textNodes, length];
    }

    if (React.isValidElement(node)) {
      const [childNodes, newLength] = processNode(node.props.children, [], currentLength);
      childNodes.forEach(childNode => {
        textNodes.push({
          ...childNode,
          node: React.cloneElement(node as React.ReactElement, {}, childNode.text)
        });
      });
      return [textNodes, newLength];
    }

    return [textNodes, currentLength];
  }

  useEffect(() => {
    const [nodes, totalLength] = processNode(children);
    setTextNodes(nodes);

    setCharCount(0);
    setDone(false);
    
    let cancelled = false;

    function revealNext(i: number) {
      if (cancelled) return;
      setCharCount(i);
      if (i < totalLength) {
        setTimeout(() => revealNext(i + 1), speed);
      } else {
        setDone(true);
      }
    }

    revealNext(0);
    return () => { cancelled = true; };
  }, [children, speed]);

  if (!done) {
    return (
      <div style={{ minHeight: 120 }}>
        {textNodes.map((node, index) => {
          if (charCount <= node.start) return null;
          
          if (charCount >= node.end) {
            return <React.Fragment key={index}>{node.node}</React.Fragment>;
          }
          
          const visibleText = node.text.slice(0, charCount - node.start);
          if (React.isValidElement(node.node)) {
            return React.cloneElement(node.node as React.ReactElement, 
              { key: index }, 
              visibleText
            );
          }
          
          return <React.Fragment key={index}>{visibleText}</React.Fragment>;
        })}
      </div>
    );
  }

  return <>{children}</>;
};