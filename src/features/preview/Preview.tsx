import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import { PreviewProps } from './types/preview.type';
import { customComponents } from './customComponents';
import rehypeHighlight from 'rehype-highlight';

import './preview.css';

export function Preview({ content, show = true }: PreviewProps) {
    return (
        <div className={`preview ${!show ? 'hidden' : ''}`}>
            <div className="preview-inner">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={customComponents}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
