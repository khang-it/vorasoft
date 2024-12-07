function buildMenuTree(menuItems) {
    const menuMap = new Map();
    const rootMenus = [];

    // Tạo map của menu
    menuItems.forEach(item => {
        item.submenus = [];
        menuMap.set(item.id, item);

        if (item.parent_id === null) {
            rootMenus.push(item);
        } else {
            const parent = menuMap.get(item.parent_id);
            if (parent) {
                parent.submenus.push(item);
            }
        }
    });

    return rootMenus;
}

module.exports = buildMenuTree;