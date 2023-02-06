import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation("test");

  return (
    <div>
      Main
      <span>{t("test")}</span>
    </div>
  );
}

export default Main;
