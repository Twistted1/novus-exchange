import React from 'react';

/**
 * Renders a string with simple markdown (**bold**) into React elements.
 * @param text The text to render.
 * @returns An array of React elements.
 */
export const renderMarkdown = (text: string = ''): React.ReactNode => {
    // Split by newlines first to create paragraphs
    return text.split('\n').map((paragraph, pIndex) => {
        if (paragraph.trim() === '') return null; // Don't render empty lines as paragraphs

        // Then, split by the bold delimiter to handle bold text
        const children = paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return React.createElement('strong', { key: i }, part.slice(2, -2));
            }
            return part;
        });

        return React.createElement('p', { key: pIndex, className: "mb-2 last:mb-0" }, ...children);
    });
};
