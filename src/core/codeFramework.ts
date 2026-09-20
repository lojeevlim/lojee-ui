// Global "which language/framework should code examples show" selection —
// backs the dropdown in Header.tsx and is read by every CodeBlock instance,
// so switching it once updates every showcase page's example at once.
import { createContext, useContext } from "react";

export type CodeFramework = "js" | "react" | "vue" | "angular";

export const CODE_FRAMEWORKS: { value: CodeFramework; label: string }[] = [
  { value: "js", label: "Plain JS/TS" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

export const CODE_FRAMEWORK_LABEL: Record<CodeFramework, string> = {
  js: "Plain JS/TS",
  react: "React",
  vue: "Vue",
  angular: "Angular",
};

export interface CodeFrameworkContextValue {
  framework: CodeFramework;
  setFramework: (framework: CodeFramework) => void;
}

export const CodeFrameworkContext = createContext<CodeFrameworkContextValue>({
  framework: "react",
  setFramework: () => {},
});

export function useCodeFramework(): CodeFrameworkContextValue {
  return useContext(CodeFrameworkContext);
}
