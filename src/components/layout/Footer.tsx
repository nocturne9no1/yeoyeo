import cn from "classnames";
import { useTranslation } from "react-i18next";

import instagram from '@icons/ico_instagram.png'
import airbnb from '@icons/ico_airbnb.png'
import naver from '@icons/ico_naver.png'

function Footer() {
  const { t } = useTranslation("common");
  return (
    <div className={cn("footer-wrap")}>
      <div className={cn("footer-wrap-link")}>
        <a type="button" href="https://www.instagram.com/yeoyeo9091/">
          <img src={instagram} alt="인스타그램 바로가기" />
        </a>
        <a type="button" href="https://airbnb.co.kr/h/yeoyeo1">
          <img src={airbnb} alt="에어비앤비 바로가기" />
        </a>
        <a type="button" href="https://naver.me/GTS3ZojS">
          <img src={naver} alt="네이버 바로가기" />
        </a>
      </div>
      <span>{t("owner")}</span>
      <span>010-8959-9091</span>
      <span>{t("address")}</span>
    </div>
  );
}

export default Footer;
