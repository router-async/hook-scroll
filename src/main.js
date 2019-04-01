const storage = [];
const prevPathname = document.location.pathname; 

const scrollTo = ($el, top, left) => {
    if($el) {
        if($el.scrollTo) {
            $el.scrollTo(top, left);
        } else {
            $el.scrollTop = top;
            $el.scrollLeft = left;
        }
    }
};

module.exports = ({ history, elementId, reset = true, limit = 20 }) => {
    const $el = elementId ? document.getElementById(elementId) : window;
    
    return {
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
        render: ({ ctx }) => {
            if(ctx.get('scroll') !== false) {
                const { location } = history;
                const state = location.state || {};
                const { resetScroll,  resetOnAction = 'PUSH'} = state;
                if (window.location.pathname !== prevPathname) {
                    let position = [0, 0];
                }

                switch (history.action) {
                    case 'POP':
                        if(storage.length && !(resetScroll && resetOnAction === 'POP')) {
                            position = storage.pop();
                        }

                        scrollTo($el, ...position);

                        break;
                    case 'PUSH':
                        if(reset || (resetScroll && resetOnAction === 'PUSH')) {
                            scrollTo($el, ...position);
                        }

                        break;
                }
                prevPathname = location.pathname;
            }
        }
    };
};
