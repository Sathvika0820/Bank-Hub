import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Info, HelpCircle, Shield, Github } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ACCENTS, useAccent } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Bank Hub" },
      { name: "description", content: "Customize your Bank Hub experience." },
    ],
  }),
  component: () => (
    <AppShell>
      <SettingsPage />
    </AppShell>
  ),
});

function SettingsPage() {
  const [dark, setDark] = useState(false);
  const { accent, setAccent } = useAccent();

  useEffect(() => {
    const stored = localStorage.getItem("bankhub:theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("bankhub:theme", next ? "dark" : "light");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalize your hub.
        </p>
      </header>

      <section className="glass shadow-soft rounded-3xl p-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors"
        >
          <span className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
              {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </span>
            <span className="text-left">
              <p className="font-semibold text-sm">Appearance</p>
              <p className="text-xs text-muted-foreground">{dark ? "Dark mode" : "Light mode"}</p>
            </span>
          </span>
          <span
            className={`w-12 h-7 rounded-full transition-colors relative ${
              dark ? "bg-foreground" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-background shadow transition-transform ${
                dark ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>
      </section>

      <section className="glass shadow-soft rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-sm">Accent color</p>
            <p className="text-xs text-muted-foreground">Personalize highlights</p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAccent(a.id)}
              aria-label={a.label}
              className={`relative w-11 h-11 rounded-2xl shadow-soft transition-transform active:scale-90 ${
                accent === a.id ? "ring-2 ring-offset-2 ring-foreground ring-offset-background" : ""
              }`}
              style={{ backgroundColor: a.value }}
            />
          ))}
        </div>
      </section>

      <section className="glass shadow-soft rounded-3xl p-2">
        <SettingsRow icon={<Info className="w-5 h-5" />} title="About Bank Hub" subtitle="Version 1.0.0" />
        <SettingsRow icon={<Shield className="w-5 h-5" />} title="Privacy" subtitle="Your data stays on this device" />
        <SettingsRow icon={<HelpCircle className="w-5 h-5" />} title="Help & support" subtitle="FAQ and guides" />
        <SettingsRow icon={<Github className="w-5 h-5" />} title="Source" subtitle="Built with React + TanStack Start" />
      </section>

      <p className="text-center text-xs text-muted-foreground pt-4">
        Bank Hub does not store any banking credentials.
      </p>
    </div>
  );
}

function SettingsRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl">
      <span className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground">
        {icon}
      </span>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}