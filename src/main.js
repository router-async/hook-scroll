const storage = [];

module.exports = ({ history, reset = true, limit = 20 }) => ({
    start: () => {
        if(history.action === 'PUSH') {
            storage.push([
                window.scrollX,
                window.scrollY
            ]);

            if(storage.length > limit) {
                delete storage.shift();
            }
        }
    },
    render: () => {
        const { location: { state = {} } } = history;
        const { resetScroll,  resetOnAction = 'PUSH'} = state;
        let position = [0, 0];

        switch (history.action) {
            case 'POP':
                if(storage.length && !(resetScroll && resetOnAction === 'POP')) {
                    position = storage.pop();
                }
                window.scrollTo(...position);
                break;
            case 'PUSH':
                if(reset || (resetScroll && resetOnAction === 'PUSH')) {
                    window.scrollTo(...position);
                }
                break;
        }
    }
});
