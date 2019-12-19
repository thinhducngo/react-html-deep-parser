/// <reference path="./react-html-deep-parser.d.ts" />

import React from 'react';
import { convertAttributesToProps } from './utils';

/**
 * 
 * @param html html string
 */
export const htmlParse = (html: Undefinedtable<string>): React.ReactNode => {
    if (html) {
        const pureHtml = html.replace(/\n|\r/g, "");
        const dom = new DOMParser().parseFromString(pureHtml, 'text/html');
        const processed = processHtml(dom.body.childNodes);
        return (
            <React.Fragment>{processed}</React.Fragment>
        );
    } else {
        return null;
    }
};

const processHtml = (elements: NodeListOf<ChildNode>) => {
    const result = [] as JSX.Element[];
    for (let i = 0; i < elements.length; i++) {
        const element = elements.item(i);
        if (element) {
            const processedElement = processElement(i, element as Element);
            if (processedElement) {
                result.push(processedElement);
            }
        }
    }
    return result;
};

/**
 * node type 1: element node, node type 2: attribute node, node type 3: text node, node type 8: comment node
 * @param index index of element in collection
 * @param element dom element
 */
const processElement = (index: number, element: Element) => {
    if (element.nodeType === 1) {
        return React.createElement(
            element.nodeName.toLowerCase(),
            {
                key: index,
                ...convertAttributesToProps(element.attributes)
            },
            element.childNodes.length > 0 ? processHtml(element.childNodes) : null
        );
    } else if (element.nodeType === 3) {
        return (
            <React.Fragment key={index}>{element.nodeValue}</React.Fragment>
        );
    } else if (element.nodeType === 8) {
        return null;
    }

    return (
        <span
            key={index}
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
        />
    );
};
