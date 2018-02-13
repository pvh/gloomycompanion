
class TinyCentralDispatch {

    constructor(){
        this.subscribers = {};
    }

    listen(event, predicate_or_source, callback){
        this.subscribers[event] = this.subscribers[event] || [];

        let pa = { callback: callback };

        if (typeof predicate_or_source === 'function')
            pa.predicate = predicate_or_source;
        else
            pa.source = predicate_or_source;

        this.subscribers[event].push(pa);
    }

    dispatch(events, invoked_by, parameters){
        parameters = parameters;
        events = [].concat(...[events]);

        events.forEach((event) => {

            if (!this.subscribers[event]){
                parameters["_event"] = event;
                return this.dispatch("default", invoked_by, parameters);
            }

            this.subscribers[event].filter((subscriber) => {
                if (subscriber.predicate) return subscriber.predicate(invoked_by, parameters);
                if (!subscriber.source) return true;
                if (invoked_by === subscriber.source) return true;
                return false;

            }).forEach((subscriber) => subscriber.callback(parameters));

        });
    }

    onclick(dom_element, event, invoked_by, parameters){
        if (!event) return;

        dom_element.addEventListener('click', () => {
            this.dispatch(event, invoked_by, parameters);
        });
    }

}

let eventbus = new TinyCentralDispatch();
eventbus.listen("default", undefined, console.log);

window.eventbus = eventbus;
export default eventbus;