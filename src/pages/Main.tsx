import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation("test");

  return (
    <div className="main-wrap">
      Main
      <span>{t("test")}</span>
    </div>
  );
}

export default Main;
