import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import { PreviewProps } from './types/preview.type';

import './preview.css';

export function Preview({ content, show = true }: PreviewProps) {
    return (
        <div className={`preview ${!show ? 'hidden' : ''}`}>
            <div className="preview-inner">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
                    rehypePlugins={[rehypeRaw]}
                    components={customComponents}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}

const customComponents: Components = {
    h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
    h5: ({ children }) => <h5 className="md-h5">{children}</h5>,
    h6: ({ children }) => <h6 className="md-h6">{children}</h6>,
    p: ({ children }) => <p className="md-p">{children}</p>,
    ul: ({ children }) => <ul className="md-ul">{children}</ul>,
    ol: ({ children }) => <ol className="md-ol">{children}</ol>,
    li: ({ children }) => <li className="md-li">{children}</li>,
    em: ({ children }) => <em className="md-em">{children}</em>,
    strong: ({ children }) => <strong className="md-strong">{children}</strong>,
    del: ({ children }) => <del className="md-del">{children}</del>,
    a: ({ href = '', children, id }) => {
        const isInternal = href.startsWith('#');

        return (
            <a
                className="md-link"
                href={href}
                id={id}
                onClick={(e) => {
                    e.preventDefault();
                    if (isInternal) {
                        // 👉 Handle footnote scroll
                        const el = document.querySelector(href);
                        if (el) {
                            el.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            });
                        }
                    } else {
                        window.open(href, '_blank', 'noopener,noreferrer');
                    }
                }}
            >
                {children}
            </a>
        );
    },
    pre: ({ children }) => <pre className="md-pre">{children}</pre>,
    code: ({ children, className }) =>
        className ? (
            <code className={`md-code ${className}`}>{children}</code>
        ) : (
            <code className="md-inline-code">{children}</code>
        ),
    blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
    hr: () => <hr className="md-hr" />,
    table: ({ children }) => <table className="md-table">{children}</table>,
    tr: ({ children }) => <tr className="md-tr">{children}</tr>,
    th: ({ children }) => <th className="md-th">{children}</th>,
    td: ({ children }) => <td className="md-td">{children}</td>,
    img: ({ src, alt }) => <img src={src ?? ''} alt={alt ?? ''} className="md-img" />,
};
