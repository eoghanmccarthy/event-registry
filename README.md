# Event Registry

A minimal exploration into organizing browser CustomEvents. This provides a simple way to register, dispatch, and subscribe to events while keeping your code decoupled.

## Usage

Create your event registry:

```javascript
const events = createEventRegistry({
    logout: 'LOGOUT',
    notify: 'NOTIFY'
});
```
Dispatch events from anywhere:
```javascript
events.logout.dispatch({ reason: 'timeout' });

events.notify.dispatch({
    message: 'Hello',
    type: 'success'
});
```
Subscribe to events:
```javascript
const unsubscribe = events.logout.subscribe(data => {
    console.log('Logout:', data.reason);
});

// Remember to cleanup
unsubscribe();
```

React example:
```javascript
function NotificationsListener() {
    useEffect(() => {
        const unsubscribe = events.notify.subscribe(data => {
            console.log('New notification:', data);
        });
        return () => unsubscribe();
    }, []);

    return null;
}
```
