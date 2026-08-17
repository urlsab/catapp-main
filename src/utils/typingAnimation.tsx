import { useState, useEffect } from 'react';

export function useTypingAnimation(texts: string[], options = {
  typeSpeed: 80,
  deleteSpeed: 40,
  delayBeforeDelete: 1200,
  delayAfterDelete: 400
}) {
  const [currentText, setCurrentText] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const fullText = texts[textIdx];
    
    if (!isDeleting && charIdx < fullText.length) {
      typingTimeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, options.typeSpeed);
    } else if (isDeleting && charIdx > 0) {
      typingTimeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, options.deleteSpeed);
    } else if (!isDeleting && charIdx === fullText.length) {
      typingTimeout = setTimeout(() => setIsDeleting(true), options.delayBeforeDelete);
    } else if (isDeleting && charIdx === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIdx((textIdx + 1) % texts.length);
      }, options.delayAfterDelete);
    }

    return () => clearTimeout(typingTimeout);
  }, [charIdx, isDeleting, textIdx, texts, options]);

  return { currentText, isDeleting, charIdx, textIdx };
}