import { FileUpload } from "../FileUpload";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function FileUploadShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">FileUpload</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled dropzone-style wrapper around a native, visually hidden file input.
          </p>
        </div>

        <section>
          <SectionLabel sub="Click to browse — selected file names are listed below.">Default</SectionLabel>
          <div className="max-w-sm">
            <FileUpload onFilesSelected={(files) => console.log("selected files", files)} />
          </div>
          <CodeBlock code={`<FileUpload onFilesSelected={(files) => console.log(files)} />`} />
        </section>

        <section>
          <SectionLabel sub="Custom label text, restricted to images, allows multiple files.">Custom label & attributes</SectionLabel>
          <div className="max-w-sm">
            <FileUpload
              label="Upload product photos"
              accept="image/*"
              multiple
              onFilesSelected={(files) => console.log("selected files", files)}
            />
          </div>
          <CodeBlock
            code={`<FileUpload
  label="Upload product photos"
  accept="image/*"
  multiple
  onFilesSelected={(files) => console.log(files)}
/>`}
          />
        </section>
      </div>
    </div>
  );
}
