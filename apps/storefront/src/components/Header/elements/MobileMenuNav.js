import { useEffect } from "react";
import Link from "next/link";

const Menu = ({ items, level = 0 })  => {
  level++;
  let ulClassName = 'mobile-sub-menu';
  let liClassName = 'menu-item-has-children';
  if(level==1){
    ulClassName = null;
  }
  return (
    <ul className={ulClassName}>
      {items.map(item =>
        <li key={item.id} className={liClassName}>
          <Link href={item.url} as={item.url}>
            <a>{item.name}</a>
          </Link>
          {item.children && item.children.length > 0
            ? <Menu
                items={item.children}
                level={level}
              />
            : null}
        </li>
      )}
    </ul>
  )
}

const MobileMenuNav = ({ menu, getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <Menu items={menu.children} />
    </nav>
  );
};

export default MobileMenuNav;
