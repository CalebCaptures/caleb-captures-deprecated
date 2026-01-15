function toggleNavigationMenu() {
    const classMenuShowing = "menu-showing";
    const idNavigationBarContent = "navigation-bar-content";
    const navigationMenu = document.getElementById(idNavigationBarContent);

    const isNavigationMenuShowing = navigationMenu.classList.contains(classMenuShowing);

    if (isNavigationMenuShowing) {
        console.log('1');
        navigationMenu.classList.remove(classMenuShowing);
    } else {
        console.log('2');
        navigationMenu.classList.add(classMenuShowing);
    }

    console.log("test");
}