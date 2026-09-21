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
          <CodeBlock
            variants={{
              react: `<FileUpload onFilesSelected={(files) => console.log(files)} />`,
              js: `<l-FileUpload id="file-upload" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("file-upload")
    .addEventListener("filesselected", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-FileUpload @filesselected="(e) => console.log(e.detail)" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  onFilesSelected(event: CustomEvent<FileList | null>) {
    console.log(event.detail);
  }
}

<!-- app.component.html -->
<l-FileUpload (filesselected)="onFilesSelected($event)" />`,
            }}
          />
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
            variants={{
              react: `<FileUpload
  label="Upload product photos"
  accept="image/*"
  multiple
  onFilesSelected={(files) => console.log(files)}
/>`,
              js: `<l-FileUpload id="photo-upload" label="Upload product photos" accept="image/*" multiple />

<script type="module">
  document.getElementById("photo-upload")
    .addEventListener("filesselected", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-FileUpload
    label="Upload product photos"
    accept="image/*"
    multiple
    @filesselected="(e) => console.log(e.detail)"
  />
</template>`,
              angular: `<!-- app.component.html — reuses the onFilesSelected method from AppComponent above -->
<l-FileUpload
  label="Upload product photos"
  accept="image/*"
  multiple
  (filesselected)="onFilesSelected($event)"
 />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
