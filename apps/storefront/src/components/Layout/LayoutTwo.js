import { HeaderOne } from "../Header";
import { FooterTwo } from "@bavaan/storefront-base/src/components/Footer";

const LayoutTwo = ({ children, aboutOverlay }) => {
  return (
    <div>
      <HeaderOne aboutOverlay={aboutOverlay} />
      {children}
      <FooterTwo />
    </div>
  );
};

export default LayoutTwo;
