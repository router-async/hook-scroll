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
        let position = [0, 0];

        if(history.action === 'POP' && storage.length) {
            position = storage.pop();
            
            window.scrollTo(...position);
        } else {
            const { location: { state } } = history;
            
            if(reset || (state && state.resetScroll)) {
                window.scrollTo(...position);
            }
        }
    }
});
