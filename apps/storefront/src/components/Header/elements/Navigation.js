import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import {TextBlock} from 'react-placeholder/lib/placeholders';
const Menu = ({ items, level = 0 })  => {
  level++;
  let ulClassName = null;
  let liClassName = null;
  switch(level) {
    case 2:
      ulClassName = 'sub-menu sub-menu--mega sub-menu--mega--column-5';
      liClassName = 'sub-menu--mega__title';
      break;
    case 3:
      ulClassName = 'sub-menu--mega__list';
      liClassName = null;
      break;
  }
  return (
    <ul className={ulClassName}>
      {items.map((item,index) =>
        <>
          <li key={item.id} className={liClassName}>
            <Link href={item.url} as={item.url}>
              <a>{item.name}</a>
            </Link>
            {level==1 ? <IoIosArrowDown /> : null}
            {item.children && item.children.length > 0
              ? <Menu
                  items={item.children}
                  level={level}
                />
              : null}
          </li>
          {level==2 && index == items.length -1 && item.parent.featuredAsset ? 
          <li key={item.parent.id+'img'}>
            <div className={'sub-menu--mega__image'}>
              <img
                src={item.parent.featuredAsset.preview + '?w=180&h=413'}
                className="img-fluid"
              alt=""/>
            </div>
          </li> : null
          }
        </>
      )}
    </ul>
  )
}
const Navigation = ({menu}) => {
  if(!menu) {
    return <TextBlock rows={10} color="#e2e2e2"/>
  }
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <Menu items={menu.children} />
    </nav>
  );
};

export default Navigation;
