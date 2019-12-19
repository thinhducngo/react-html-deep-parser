import {
    booleanAttributes,
    generalAttributes
} from '../constants/attributes';

const convertStyleAttributeValue = (style: Undefinedtable<string>) => {
    if (style) {
        return style
            .split(';')
            .reduce(
                (prevValue, curr) => {
                    let [name, value] = curr
                        .split(/^([^:]+):/)
                        .filter((_, i) => i > 0)
                        .map(item => item.trim().toLowerCase());

                    // -ms- prefix
                    name = name
                        .replace(/^-ms-/, 'ms-')
                        .replace(/-(.)/g, (_, character) => character.toUpperCase());

                    if (value) {
                        prevValue[name] = value;
                    }

                    return prevValue;
                },
                {} as Dictionary<string>
            );
    } else {
        return {};
    }
};

export const convertAttributesToProps = (attributes: NamedNodeMap) => {
    const props = {} as Dictionary<string | boolean | object>;

    // convert attributes
    for (let i = 0; i < attributes.length; i++) {
        const attributeName = attributes[i].name.toLowerCase();
        const propName = generalAttributes[attributeName] || attributeName;
        if (booleanAttributes.has(attributeName)) {
            props[propName] = true;
        } else {
            props[propName] = attributes[i].value;
        }
    }

    // convert style attribute
    if (typeof props.style === 'string' && props.style) {
        props.style = convertStyleAttributeValue(props.style);
    } else {
        props.style = {};
    }

    return props;
};
