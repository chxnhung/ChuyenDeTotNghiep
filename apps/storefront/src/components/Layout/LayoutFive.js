import { HeaderFive } from "../Header";
import { FooterTwo } from "@bavaan/storefront-base/src/components/Footer";

const LayoutFive = ({ children }) => {
  return (
    <div>
      <HeaderFive />
      {children}
      <FooterTwo />
    </div>
  );
};

export default LayoutFive;
