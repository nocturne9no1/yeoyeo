import cn from "classnames";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("common");
  return (
    <div className={cn("footer-wrap")}>
      <span>010-0000-0000</span>
      <span>Email: dvlprjw@gmail.com</span>
      <span>{t("address")}</span>
    </div>
  );
}

export default Footer;
