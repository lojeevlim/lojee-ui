import { FileUpload } from "../FileUpload";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function FileUploadShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">FileUpload</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-file-upload id="file-upload"></l-file-upload>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("file-upload")
    .addEventListener("filesselected", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-file-upload @filesselected="(e) => console.log(e.detail)" />
</template>

<script setup lang="ts">
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
<l-file-upload (filesselected)="onFilesSelected($event)" />`,
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
              js: `<l-file-upload id="photo-upload" label="Upload product photos" accept="image/*" multiple></l-file-upload>

<script type="module">
  document.getElementById("photo-upload")
    .addEventListener("filesselected", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-file-upload
    label="Upload product photos"
    accept="image/*"
    multiple
    @filesselected="(e) => console.log(e.detail)"
  />
</template>`,
              angular: `<!-- app.component.html — reuses the onFilesSelected method from AppComponent above -->
<l-file-upload
  label="Upload product photos"
  accept="image/*"
  multiple
  (filesselected)="onFilesSelected($event)"
 />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-2xl"><TransitionPreview cols={2}>
            <FileUpload transition="fade" />
            <FileUpload transition="slide-up" />
            <FileUpload transition="slide-right" transitionDelay={100} />
            <FileUpload transition="zoom" />
            <FileUpload transition="flip" />
            <FileUpload transition="blur" />
            <FileUpload transition="bounce" />
            <FileUpload transition="drop" transitionDuration={700} />
            <FileUpload hoverEffect="lift" />
            <FileUpload hoverEffect="glow" />
            <FileUpload hoverEffect="ring" />
          </TransitionPreview></div>
          <CodeBlock
            variants={{
              react: `<FileUpload transition="fade" />
<FileUpload transition="slide-up" />
<FileUpload transition="slide-right" transitionDelay={100} />
<FileUpload transition="zoom" />
<FileUpload transition="flip" />
<FileUpload transition="blur" />
<FileUpload transition="bounce" />
<FileUpload transition="drop" transitionDuration={700} />

<FileUpload hoverEffect="lift" />
<FileUpload hoverEffect="glow" />
<FileUpload hoverEffect="ring" />`,
              js: `<l-file-upload transition="fade"></l-file-upload>
<l-file-upload transition="slide-up"></l-file-upload>
<l-file-upload transition="slide-right" transitionDelay="100"></l-file-upload>
<l-file-upload transition="zoom"></l-file-upload>
<l-file-upload transition="flip"></l-file-upload>
<l-file-upload transition="blur"></l-file-upload>
<l-file-upload transition="bounce"></l-file-upload>
<l-file-upload transition="drop" transitionDuration="700"></l-file-upload>

<l-file-upload hoverEffect="lift"></l-file-upload>
<l-file-upload hoverEffect="glow"></l-file-upload>
<l-file-upload hoverEffect="ring"></l-file-upload>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-file-upload transition="fade"></l-file-upload>
  <l-file-upload transition="slide-up"></l-file-upload>
  <l-file-upload transition="slide-right" transitionDelay="100"></l-file-upload>
  <l-file-upload transition="zoom"></l-file-upload>
  <l-file-upload transition="flip"></l-file-upload>
  <l-file-upload transition="blur"></l-file-upload>
  <l-file-upload transition="bounce"></l-file-upload>
  <l-file-upload transition="drop" transitionDuration="700"></l-file-upload>

  <l-file-upload hoverEffect="lift"></l-file-upload>
  <l-file-upload hoverEffect="glow"></l-file-upload>
  <l-file-upload hoverEffect="ring"></l-file-upload>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-file-upload transition="fade"></l-file-upload>
    <l-file-upload transition="slide-up"></l-file-upload>
    <l-file-upload transition="slide-right" transitionDelay="100"></l-file-upload>
    <l-file-upload transition="zoom"></l-file-upload>
    <l-file-upload transition="flip"></l-file-upload>
    <l-file-upload transition="blur"></l-file-upload>
    <l-file-upload transition="bounce"></l-file-upload>
    <l-file-upload transition="drop" transitionDuration="700"></l-file-upload>

    <l-file-upload hoverEffect="lift"></l-file-upload>
    <l-file-upload hoverEffect="glow"></l-file-upload>
    <l-file-upload hoverEffect="ring"></l-file-upload>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
