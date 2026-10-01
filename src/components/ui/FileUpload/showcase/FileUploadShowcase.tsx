import { FileUpload } from "../FileUpload";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function FileUploadShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
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
              js: `<l-FileUpload id="file-upload" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("file-upload")
    .addEventListener("filesselected", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-FileUpload @filesselected="(e) => console.log(e.detail)" />
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
              js: `<l-FileUpload transition="fade"></l-FileUpload>
<l-FileUpload transition="slide-up"></l-FileUpload>
<l-FileUpload transition="slide-right" transitionDelay="100"></l-FileUpload>
<l-FileUpload transition="zoom"></l-FileUpload>
<l-FileUpload transition="flip"></l-FileUpload>
<l-FileUpload transition="blur"></l-FileUpload>
<l-FileUpload transition="bounce"></l-FileUpload>
<l-FileUpload transition="drop" transitionDuration="700"></l-FileUpload>

<l-FileUpload hoverEffect="lift"></l-FileUpload>
<l-FileUpload hoverEffect="glow"></l-FileUpload>
<l-FileUpload hoverEffect="ring"></l-FileUpload>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-FileUpload transition="fade"></l-FileUpload>
  <l-FileUpload transition="slide-up"></l-FileUpload>
  <l-FileUpload transition="slide-right" transitionDelay="100"></l-FileUpload>
  <l-FileUpload transition="zoom"></l-FileUpload>
  <l-FileUpload transition="flip"></l-FileUpload>
  <l-FileUpload transition="blur"></l-FileUpload>
  <l-FileUpload transition="bounce"></l-FileUpload>
  <l-FileUpload transition="drop" transitionDuration="700"></l-FileUpload>

  <l-FileUpload hoverEffect="lift"></l-FileUpload>
  <l-FileUpload hoverEffect="glow"></l-FileUpload>
  <l-FileUpload hoverEffect="ring"></l-FileUpload>
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
    <l-FileUpload transition="fade"></l-FileUpload>
    <l-FileUpload transition="slide-up"></l-FileUpload>
    <l-FileUpload transition="slide-right" transitionDelay="100"></l-FileUpload>
    <l-FileUpload transition="zoom"></l-FileUpload>
    <l-FileUpload transition="flip"></l-FileUpload>
    <l-FileUpload transition="blur"></l-FileUpload>
    <l-FileUpload transition="bounce"></l-FileUpload>
    <l-FileUpload transition="drop" transitionDuration="700"></l-FileUpload>

    <l-FileUpload hoverEffect="lift"></l-FileUpload>
    <l-FileUpload hoverEffect="glow"></l-FileUpload>
    <l-FileUpload hoverEffect="ring"></l-FileUpload>
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
