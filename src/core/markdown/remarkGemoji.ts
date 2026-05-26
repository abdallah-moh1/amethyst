import { findAndReplace } from 'mdast-util-find-and-replace';
import { nameToEmoji } from 'gemoji';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

const EMOJI_REGEX = /:([a-zA-Z0-9_+-]+):/g;

export const remarkGemoji: Plugin<[], Root> = () => (tree) => {
    findAndReplace(tree, [[EMOJI_REGEX, (_, name: string) => nameToEmoji[name] || false]]);
};
