import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      aria-label="language"
      value={i18n.language}
      onChange={(event) => i18n.changeLanguage(event.target.value)}
    >
      {LANGUAGES.map((language) => (
        <option key={language.code} value={language.code}>
          {language.label}
        </option>
      ))}
    </select>
  );
}

function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{t("appName")}</h1>
      <LanguageSwitcher />
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
