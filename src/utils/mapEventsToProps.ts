export const mapEventsToProps = (
    element: Element,
    events: BindEvent[]
) => events.reduce(
    (prevValue, curr) => {
        if (element.matches(curr.selector)) {
            return {
                ...prevValue,
                ...curr.event
            };
        }
        return prevValue;
    },
    {}
);
