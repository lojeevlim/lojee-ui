import { CodeSnippet, type CodeSnippetProps } from "../components/ui/CodeSnippet/CodeSnippet";

// A `title` attribute would collide with the native global one (it shows a hover tooltip), so the element calls it `heading`.
export function CodeSnippetElement({ heading, ...rest }: Omit<CodeSnippetProps, "title"> & { heading?: string }) {
  return <CodeSnippet title={heading} {...rest} />;
}
