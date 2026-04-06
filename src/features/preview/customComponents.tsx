import { useWorkspaceStore } from '@/store';
import React from 'react';
import { Components } from 'react-markdown';

export const customComponents: Components = {
    h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
    h5: ({ children }) => <h5 className="md-h5">{children}</h5>,
    h6: ({ children }) => <h6 className="md-h6">{children}</h6>,
    p: ({ children }) => <p className="md-p">{children}</p>,
    ul: ({ children }) => <ul className="md-ul">{children}</ul>,
    ol: ({ children }) => <ol className="md-ol">{children}</ol>,
    li: ({ node, children, className }) => {
        if (className === 'task-list-item' && Array.isArray(children)) {
            const firstChild = children[0];

            if (React.isValidElement(firstChild)) {
                const checked = (firstChild.props as { checked?: boolean })?.checked;
                const offset = node?.position?.start?.offset;

                return (
                    <li className="md-li task-list-item">
                        <input
                            type="checkbox"
                            checked={checked ?? false}
                            onChange={() => {
                                const note = useWorkspaceStore.getState().noteContent;

                                if (offset == null) return;
                                // Find the exact "- [ ]" or "- [x]" at this position
                                const before = note.slice(0, offset);
                                const after = note.slice(offset);

                                const updated = after.replace(
                                    /^- \[( |x)\]/,
                                    checked ? '- [ ]' : '- [x]',
                                );

                                useWorkspaceStore.getState().setNoteContent(before + updated);
                            }}
                            className="task-list-checkbox"
                        />
                        <span>{children.slice(1)}</span>
                    </li>
                );
            }
        }

        return <li className="md-li">{children}</li>;
    },

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
