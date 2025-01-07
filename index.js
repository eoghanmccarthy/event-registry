/**
 * Creates an event registry to manage custom events.
 * This is a utility to help organize your application's events in one place.
 *
 * @param {Object} eventsConfig - An object mapping event names to their types
 * Example: { logout: 'LOGOUT', notify: 'NOTIFY' }
 */
const createEventRegistry = (eventsConfig) => {
    /**
     * Creates a dispatcher function for a specific event type.
     * The dispatcher will create and dispatch a CustomEvent with your data.
     *
     * @param {string} eventType - The type of event to dispatch
     * @returns {Function} A function that takes event detail and dispatches the event
     */
    const createDispatcher = (eventType) => (detail) => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(eventType, { detail }));
        }
    };

    /**
     * Creates a subscriber function for a specific event type.
     * The subscriber sets up an event listener and returns a cleanup function.
     *
     * @param {string} eventType - The type of event to listen for
     * @returns {Function} A function that takes a callback and returns an unsubscribe function
     */
    const createSubscriber = (eventType) => (callback) => {
        if (typeof window !== 'undefined') {
            // Create handler that extracts detail and passes to callback
            const handler = (e) => callback(e.detail);

            // Set up the event listener
            window.addEventListener(eventType, handler);

            // Return cleanup function to remove listener
            return () => window.removeEventListener(eventType, handler);
        }
    };

    /**
     * Transform the config into an event registry.
     * For each event in the config, creates an object with:
     * - type: the event type string
     * - dispatch: function to dispatch this event
     * - subscribe: function to subscribe to this event
     */
    return Object.fromEntries(
        Object.entries(eventsConfig).map(([name, type]) => [
            name,
            {
                type,
                dispatch: createDispatcher(type),
                subscribe: createSubscriber(type)
            }
        ])
    );
};
