const storage = [];

module.exports = ({ history, elementId, reset = true, limit = 20 }) => ({
    const $el = elementId ? document.getElementById(elementId) : window;
    
    start: () => {
        if(history.action === 'PUSH') {
            if($el) {
                if(elementId) {
                    storage.push([
                        $el.scrollLeft,
                        $el.scrollTop
                    ]);
                } else {
                    storage.push([
                        $el.scrollX,
                        $el.scrollY
                    ]);
                }
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
                
                $el && $el.scrollTo(...position);
                
                break;
            case 'PUSH':
                if(reset || (resetScroll && resetOnAction === 'PUSH')) {
                    $el && $el.scrollTo(...position);
                }
                
                break;
        }
    }
});
