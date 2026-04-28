// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { memo } from 'react';
import { Components } from 'react-markdown';

type CustomComponentsProps = {
    onCheckboxChecked?: (props: { offset: number; checked: boolean }) => void;
};

export const useCustomComponents = ({ onCheckboxChecked }: CustomComponentsProps) => {
    const customComponents: Components = {
        h1: memo(({ node: _node, ...props }) => <h1 className="md-h1" {...props} />),
        h2: memo(({ node: _node, ...props }) => <h2 className="md-h2" {...props} />),
        h3: memo(({ node: _node, ...props }) => <h3 className="md-h3" {...props} />),
        h4: memo(({ node: _node, ...props }) => <h4 className="md-h4" {...props} />),
        h5: memo(({ node: _node, ...props }) => <h5 className="md-h5" {...props} />),
        h6: memo(({ node: _node, ...props }) => <h6 className="md-h6" {...props} />),
        p: memo(({ node: _node, ...props }) => <p className="md-p" {...props} />),
        ul: memo(({ node: _node, ...props }) => <ul className="md-ul" {...props} />),
        ol: memo(({ node: _node, ...props }) => <ol className="md-ol" {...props} />),

        li: memo(({ node, children, className, ...props }) => {
            if (className === 'task-list-item' && Array.isArray(children)) {
                const firstChild = children[0];

                if (React.isValidElement(firstChild)) {
                    const checked = (firstChild.props as { checked?: boolean })?.checked;
                    const offset = node?.position?.start?.offset;

                    return (
                        <li className="md-li task-list-item" {...props}>
                            <input
                                type="checkbox"
                                checked={checked ?? false}
                                onChange={() => {
                                    if (!offset || !onCheckboxChecked) return;

                                    onCheckboxChecked({
                                        offset,
                                        checked: checked ?? false,
                                    });
                                }}
                                className="task-list-checkbox"
                            />
                            <span>{children.slice(1)}</span>
                        </li>
                    );
                }
            }
            return (
                <li className="md-li" {...props}>
                    {children}
                </li>
            );
        }),

        em: memo(({ node: _node, ...props }) => <em className="md-em" {...props} />),
        strong: memo(({ node: _node, ...props }) => <strong className="md-strong" {...props} />),
        del: memo(({ node: _node, ...props }) => <del className="md-del" {...props} />),

        a: memo(({ href = '', children, id, ...props }) => {
            const isInternal = href.startsWith('#');

            return (
                <a
                    className="md-link"
                    href={href}
                    id={id}
                    {...props}
                    onClick={(e) => {
                        e.preventDefault();
                        if (isInternal) {
                            const el = document.querySelector(href);
                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            window.open(href, '_blank', 'noopener,noreferrer');
                        }
                    }}
                >
                    {children}
                </a>
            );
        }),

        pre: memo(({ node: _node, ...props }) => <pre className="md-pre" {...props} />),
        code: memo(({ children, className, ...props }) =>
            className ? (
                <code className={`md-code ${className}`} {...props}>
                    {children}
                </code>
            ) : (
                <code className="md-inline-code" {...props}>
                    {children}
                </code>
            ),
        ),

        blockquote: memo(({ node: _node, ...props }) => (
            <blockquote className="md-blockquote" {...props} />
        )),
        hr: memo(({ node: _node, ...props }) => <hr className="md-hr" {...props} />),

        table: memo(({ children, ...props }) => (
            <div className="md-table-scroll">
                <table className="md-table" {...props}>
                    {children}
                </table>
            </div>
        )),

        tr: memo(({ node: _node, ...props }) => <tr className="md-tr" {...props} />),
        th: memo(({ node: _node, ...props }) => <th className="md-th" {...props} />),
        td: memo(({ node: _node, ...props }) => <td className="md-td" {...props} />),
        img: memo(({ src, alt, ...props }) => (
            <img src={src ?? ''} alt={alt ?? ''} className="md-img" {...props} />
        )),
    };

    return {
        customComponents,
    };
};
