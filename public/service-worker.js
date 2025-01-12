self.addEventListener('push', function(event) {
    const data = event.data.json();
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: '/badge-icon.png',  // Optional
            vibrate: [200, 100, 200]   // Optional vibration pattern
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Optionally handle notification clicks
    event.waitUntil(
        clients.openWindow('/')
    );
});