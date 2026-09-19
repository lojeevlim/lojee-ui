import { useState, type ReactNode } from "react";
import { CodeFrameworkContext, type CodeFramework } from "../../core/codeFramework";

const STORAGE_KEY = "lojee-ui:code-framework";

function readStored(): CodeFramework {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "js" || stored === "react" || stored === "vue" || stored === "angular") {
      return stored;
    }
  } catch {
    /* localStorage unavailable (private mode, SSR, etc.) — fall through to default */
  }
  return "react";
}

export default function CodeFrameworkProvider({ children }: { children: ReactNode }) {
  const [framework, setFrameworkState] = useState<CodeFramework>(readStored);

  const setFramework = (next: CodeFramework) => {
    setFrameworkState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* selection just won't persist across reloads */
    }
  };

  return (
    <CodeFrameworkContext.Provider value={{ framework, setFramework }}>{children}</CodeFrameworkContext.Provider>
  );
}
