
// Helper to convert Strapi Blocks (children) -> Tiptap (content)
export const strapiToTiptap = (strapiData) => {
    if (!strapiData || !Array.isArray(strapiData)) return { type: 'doc', content: [] };

    // Recursive mapper
    const mapNode = (node) => {
        if (!node) return null; // Safety check for bad DB data

        // Strapi "text" nodes
        if (node.type === 'text') {
            const marks = [];
            if (node.bold) marks.push({ type: 'bold' });
            if (node.italic) marks.push({ type: 'italic' });
            if (node.underline) marks.push({ type: 'underline' });
            if (node.strikethrough) marks.push({ type: 'strike' });
            if (node.code) marks.push({ type: 'code' });

            const output = {
                type: 'text',
                text: node.text || '',
            };
            if (marks.length > 0) output.marks = marks;
            return output;
        }

        // Strapi Link -> Tiptap Text with Link Mark (Handle incoming Strapi Link nodes)
        if (node.type === 'link') {
            const children = node.children ? node.children.map(mapNode).flat().filter(Boolean) : [];

            // Apply link mark to all text children
            return children.map(child => {
                if (child.type === 'text') {
                    const newMarks = child.marks ? [...child.marks] : [];
                    newMarks.push({
                        type: 'link',
                        attrs: { href: node.url }
                    });
                    return { ...child, marks: newMarks };
                }
                return child;
            });
        }

        // Strapi Quote -> Tiptap Blockquote
        if (node.type === 'quote') {
            return {
                type: 'blockquote',
                content: node.children ? node.children.map(mapNode).flat().filter(Boolean) : [],
            }
        }

        // Strapi Lists -> Tiptap Lists
        if (node.type === 'list') {
            const isOrdered = node.format === 'ordered';
            return {
                type: isOrdered ? 'orderedList' : 'bulletList',
                content: node.children ? node.children.map(mapNode).flat().filter(Boolean) : [],
            }
        }

        // Strapi List Items -> Tiptap List Items
        if (node.type === 'list-item') {
            return {
                type: 'listItem',
                content: [{
                    type: 'paragraph',
                    content: node.children ? node.children.map(mapNode).flat().filter(Boolean) : [],
                }]
            }
        }

        // Block nodes
        return {
            type: node.type, // paragraph, heading, list-item, etc.
            attrs: node.level ? { level: node.level } : undefined, // for headings
            content: node.children ? node.children.map(mapNode).flat().filter(Boolean) : [],
        };
    };

    return {
        type: 'doc',
        content: strapiData.map(mapNode).flat().filter(Boolean),
    };
};

// Helper to convert Tiptap (content) -> Strapi Blocks (children)
export const tiptapToStrapi = (tiptapNode) => {
    if (!tiptapNode) return [];

    // Recursive mapper
    const mapNode = (node) => {
        if (node.type === 'text') {
            let textNode = {
                type: 'text',
                text: node.text,
            };

            let linkMark = null;

            if (node.marks) {
                node.marks.forEach(m => {
                    if (m.type === 'bold') textNode.bold = true;
                    if (m.type === 'italic') textNode.italic = true;
                    if (m.type === 'underline') textNode.underline = true;
                    if (m.type === 'strike') textNode.strikethrough = true;
                    if (m.type === 'code') textNode.code = true;
                    if (m.type === 'link') linkMark = m;
                });
            }

            // If it's a link, wrap the text node in a Link Node
            if (linkMark) {
                return {
                    type: 'link',
                    url: linkMark.attrs?.href || '',
                    children: [textNode]
                };
            }

            return textNode;
        }

        // Handle Lists (Tiptap -> Strapi)
        if (node.type === 'bulletList' || node.type === 'orderedList') {
            return {
                type: 'list',
                format: node.type === 'orderedList' ? 'ordered' : 'unordered',
                children: node.content ? node.content.map(mapNode).flat() : [],
            };
        }

        // Handle List Items (Tiptap -> Strapi)
        if (node.type === 'listItem') {
            const children = [];
            if (node.content) {
                node.content.forEach(child => {
                    if (child.type === 'paragraph') {
                        // Unwrap paragraph children to avoid "Inline node" error
                        if (child.content) {
                            children.push(...child.content.map(mapNode).flat());
                        }
                    } else {
                        children.push(mapNode(child));
                    }
                });
            }
            return {
                type: 'list-item',
                children: children.length ? children : [{ type: 'text', text: '' }]
            };
        }

        // Handle Blockquote (Tiptap: blockquote -> Strapi: quote)
        if (node.type === 'blockquote') {
            return {
                type: 'quote',
                children: node.content ? node.content.map(child => {
                    // Flatten Headings/etc inside Quotes to Paragraphs
                    if (child.type === 'heading') {
                        return {
                            type: 'paragraph', // Downgrade heading to paragraph
                            children: child.content ? child.content.map(mapNode).flat().filter(Boolean) : [{ type: 'text', text: '' }]
                        }
                    }
                    return mapNode(child);
                }).flat().filter(Boolean) : [{ type: 'text', text: '' }]
            };
        }

        // Handle Horizontal Rule -> Strapi Paragraph with separator
        if (node.type === 'horizontalRule') {
            return {
                type: 'paragraph',
                children: [{ type: 'text', text: '---' }]
            };
        }

        // Handle Hard Break -> Newline text
        if (node.type === 'hardBreak') {
            return { type: 'text', text: '\n' };
        }

        if (node.type === 'text') return null; // Safety catch

        const output = {
            type: node.type,
            children: node.content ? node.content.map(mapNode).flat().filter(Boolean) : [{ type: 'text', text: '' }],
        };

        if (node.attrs?.level) output.level = node.attrs.level;
        return output;
    };

    return tiptapNode.content ? tiptapNode.content.map(mapNode).flat().filter(Boolean) : [];
};
