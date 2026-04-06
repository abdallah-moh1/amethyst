import { visit } from 'unist-util-visit';
import type { Root, Content, FootnoteDefinition, FootnoteReference, Parent } from 'mdast';

type FootnoteNode = FootnoteDefinition | FootnoteReference;

function isFootnoteNode(node: Content): node is FootnoteNode {
    return node.type === 'footnoteDefinition' || node.type === 'footnoteReference';
}

export function remarkRemoveFootnotes() {
    return (tree: Root) => {
        visit(tree, (node, index, parent) => {
            if (typeof index !== 'number' || !parent) return;

            const typedParent = parent as Parent;

            if (!('children' in typedParent)) return;

            const child = typedParent.children[index];

            if (child && isFootnoteNode(child as Content)) {
                typedParent.children.splice(index, 1);
                return index;
            }
        });
    };
}
