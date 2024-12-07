const buildMenuTree = require('../utils/lib');

const menuItems = [
    { id: 1, name: 'Home', route: '/', parent_id: null },
    { id: 2, name: 'File', route: '/file', parent_id: null },
    { id: 3, name: 'New', route: '/file/new', parent_id: 2 },
    { id: 4, name: 'Open', route: '/file/open', parent_id: 2 },
    { id: 5, name: 'Edit', route: '/edit', parent_id: null },
    { id: 6, name: 'Undo', route: '/edit/undo', parent_id: 5 },
    { id: 7, name: 'Redo', route: '/edit/redo', parent_id: 5 },

    { id: 9, name: 'Login', route: '/auth/login', parent_id: 1 },
    { id: 8, name: 'Logout', route: '/auth/logout', parent_id: 1 },

    { id: 500, name: 'Resources', route: '/resources', parent_id: null },
    { id: 510, name: 'Users', route: '/users', parent_id: 500 },
    { id: 520, name: 'Settings', route: '/settings', parent_id: 500 },
    { id: 530, name: 'Report', route: '/report', parent_id: 500 },

    { id: 200, name: 'Tệp', route: '/file', parent_id: 3 },
    { id: 201, name: 'Thư mục', route: '/folder', parent_id: 3 },
    { id: 203, name: 'Mở', route: '/folder', parent_id: 4 },

    { id: 301, name: 'Mở 1', route: '/folder', parent_id: 201 },
    { id: 302, name: 'Mở 2', route: '/folder', parent_id: 201 },
];

console.log(JSON.stringify(buildMenuTree(menuItems), null, 4));

module.exports = {
    menus: buildMenuTree(menuItems),
};