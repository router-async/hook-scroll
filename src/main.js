const storage = [];

module.exports = ({ history, elementId, reset = true, limit = 20 }) => ({
    start: () => {
        if(history.action === 'PUSH') {
            if(elementId) {
                const element = document.getElementById(elementId);
                element && storage.push([
                    element.scrollLeft,
                    element.scrollTop
                ]);
            }
            else {
                storage.push([
                    window.scrollX,
                    window.scrollY
                ]);
            }

            if(storage.length > limit) {
                delete storage.shift();
            }
        }
    },
    render: () => {
        const { location } = history;
        const state = location.state || {};
        const { resetScroll,  resetOnAction = 'PUSH'} = state;
        let position = [0, 0];

        switch (history.action) {
            case 'POP':
                if(storage.length && !(resetScroll && resetOnAction === 'POP')) {
                    position = storage.pop();
                }
                if(elementId) {
                    const element = document.getElementById(elementId);
                    element && element.scrollTo(...position);
                }
                else {
                    window.scrollTo(...position);
                }
                break;
            case 'PUSH':
                if(reset || (resetScroll && resetOnAction === 'PUSH')) {
                    if(elementId) {
                        const element = document.getElementById(elementId);
                        element && element.scrollTo(...position);
                    }
                    else {
                        window.scrollTo(...position);
                    }
                }
                break;
        }
    }
});
