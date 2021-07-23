const { Notification } = require('electron');

exports.show = (title, body) => {
    const notif = new Notification({
        title,
        body
    });

    notif.show();
};
