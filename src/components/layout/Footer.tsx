// import YeoYeoBanner from "@temp/yeoyeo_banner.png";
import cn from "classnames";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("common");
  return (
    <div className={cn("footer-wrap")}>
      {/* <div className={cn('footer-img-container')}>
        <img src={YeoYeoBanner} alt="footer_banner" />
      </div> */}
      <span>010-0000-0000</span>
      <span>Email: test@gmail.com</span>
      <span>{t("address")}</span>
    </div>
  );
}

export default Footer;
