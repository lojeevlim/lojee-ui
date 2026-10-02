import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { Video } from "../Video";
import { sampleImage } from "../../Image/samples";

const MP4 = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const WEBM = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
const YOUTUBE = "https://www.youtube.com/watch?v=aqz-KE-bpKQ";

export default function VideoShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Video</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          Plays a video file or a YouTube / Vimeo link in a frame of a fixed shape, with the controls, formats, poster and error handling taken care of.
        </p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Give it a file URL. The player controls are on by default; the frame is 16:9.">Basic</SectionLabel>
        <div className="max-w-xl">
          <Video src={MP4} label="A flower blooming" />
        </div>
        <CodeBlock
          variants={{
            react: `<Video src="/media/intro.mp4" label="Product intro" />`,
            js: `<l-Video src="/media/intro.mp4" label="Product intro"></l-Video>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-Video src="/media/intro.mp4" label="Product intro"></l-Video>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-Video src="/media/intro.mp4" label="Product intro"></l-Video>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`sources` lists several formats of the same video; the browser plays the first one it supports. `poster` is the picture shown before playback starts.">Formats and poster</SectionLabel>
        <div className="max-w-xl">
          <Video
            sources={[
              { src: WEBM, type: "video/webm" },
              { src: MP4, type: "video/mp4" },
            ]}
            poster={sampleImage(2, 1280, 720)}
            label="A flower blooming"
          />
        </div>
        <CodeBlock
          variants={{
            react: `<Video
  sources={[
    { src: "/media/intro.webm", type: "video/webm" },
    { src: "/media/intro.mp4", type: "video/mp4" },
  ]}
  poster="/media/intro.jpg"
  label="Product intro"
/>`,
            js: `<l-Video id="intro" poster="/media/intro.jpg" label="Product intro"></l-Video>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("intro").sources = [
    { src: "/media/intro.webm", type: "video/webm" },
    { src: "/media/intro.mp4", type: "video/mp4" },
  ];
</script>`,
            vue: `<template>
  <l-Video :sources="sources" poster="/media/intro.jpg" label="Product intro"></l-Video>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const sources = [
  { src: "/media/intro.webm", type: "video/webm" },
  { src: "/media/intro.mp4", type: "video/mp4" },
];
</script>`,
            angular: `<l-Video [sources]="sources" poster="/media/intro.jpg" label="Product intro"></l-Video>

// component class
sources = [
  { src: "/media/intro.webm", type: "video/webm" },
  { src: "/media/intro.mp4", type: "video/mp4" },
];`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="A YouTube or Vimeo page URL is recognised and shown in that service's player, in the same frame. `autoPlay`, `muted` and `loop` carry over.">YouTube and Vimeo</SectionLabel>
        <div className="max-w-xl">
          <Video src={YOUTUBE} label="Big Buck Bunny" />
        </div>
        <CodeBlock
          variants={{
            react: `<Video src="https://www.youtube.com/watch?v=aqz-KE-bpKQ" label="Big Buck Bunny" />
<Video src="https://vimeo.com/76979871" label="The New Vimeo Player" />`,
            js: `<l-Video src="https://www.youtube.com/watch?v=aqz-KE-bpKQ" label="Big Buck Bunny"></l-Video>
<l-Video src="https://vimeo.com/76979871" label="The New Vimeo Player"></l-Video>`,
            vue: `<template>
  <l-Video src="https://www.youtube.com/watch?v=aqz-KE-bpKQ" label="Big Buck Bunny"></l-Video>
  <l-Video src="https://vimeo.com/76979871" label="The New Vimeo Player"></l-Video>
</template>`,
            angular: `<l-Video src="https://www.youtube.com/watch?v=aqz-KE-bpKQ" label="Big Buck Bunny"></l-Video>
<l-Video src="https://vimeo.com/76979871" label="The New Vimeo Player"></l-Video>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`autoPlay` starts playback as soon as possible (browsers only allow it for a muted video, so `muted` is switched on with it), `loop` restarts at the end, and `controls={false}` hides the player controls — a good fit for a looping background clip.'}>
          Autoplay and loop
        </SectionLabel>
        <div className="max-w-sm">
          <Video src={MP4} autoPlay loop controls={false} ratio="4/3" fit="cover" label="Looping flower" />
        </div>
        <CodeBlock
          variants={{
            react: `<Video src="/media/loop.mp4" autoPlay loop controls={false} ratio="4/3" fit="cover" />`,
            js: `<l-Video src="/media/loop.mp4" auto-play="true" loop="true" controls="false" ratio="4/3" fit="cover"></l-Video>`,
            vue: `<template>
  <l-Video src="/media/loop.mp4" :auto-play="true" :loop="true" :controls="false" ratio="4/3" fit="cover"></l-Video>
</template>`,
            angular: `<l-Video src="/media/loop.mp4" [autoPlay]="true" [loop]="true" [controls]="false" ratio="4/3" fit="cover"></l-Video>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="If the video can't be loaded (or there is no `src`) a neutral placeholder appears; pass `fallback` to show your own content instead.">Fallback</SectionLabel>
        <div className="grid max-w-xl gap-4 sm:grid-cols-2">
          <Video src="/this-video-does-not-exist.mp4" ratio="4/3" label="Missing video" caption="Default fallback" />
          <Video
            src="/this-video-does-not-exist.mp4"
            ratio="4/3"
            label="Missing video"
            caption="Custom fallback"
            fallback={<span className="text-sm font-medium text-fg-muted">Video coming soon</span>}
          />
        </div>
        <CodeBlock
          variants={{
            react: `<Video src="/missing.mp4" ratio="4/3" label="Missing video" />
<Video src="/missing.mp4" ratio="4/3" label="Missing video" fallback={<span>Video coming soon</span>} />`,
            js: `<l-Video src="/missing.mp4" ratio="4/3" label="Missing video"></l-Video>

<l-Video src="/missing.mp4" ratio="4/3" label="Missing video">
  <span slot="fallback">Video coming soon</span>
</l-Video>`,
            vue: `<template>
  <l-Video src="/missing.mp4" ratio="4/3" label="Missing video"></l-Video>

  <l-Video src="/missing.mp4" ratio="4/3" label="Missing video">
    <span slot="fallback">Video coming soon</span>
  </l-Video>
</template>`,
            angular: `<l-Video src="/missing.mp4" ratio="4/3" label="Missing video"></l-Video>

<l-Video src="/missing.mp4" ratio="4/3" label="Missing video">
  <span slot="fallback">Video coming soon</span>
</l-Video>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`onPlay`, `onPause`, `onEnded`, `onLoad` (with the duration in seconds) and `onError` report what the player does. They apply to video files; embedded YouTube / Vimeo players run in their own frame.">Events</SectionLabel>
        <CodeBlock
          variants={{
            react: `<Video
  src="/media/intro.mp4"
  onPlay={() => console.log("playing")}
  onPause={() => console.log("paused")}
  onEnded={() => console.log("done")}
  onLoad={(duration) => console.log(duration, "seconds")}
/>`,
            js: `<l-Video id="intro" src="/media/intro.mp4"></l-Video>

<script type="module">
  import "lojee-ui/elements";

  const video = document.getElementById("intro");
  video.addEventListener("play", () => console.log("playing"));
  video.addEventListener("pause", () => console.log("paused"));
  video.addEventListener("ended", () => console.log("done"));
  video.addEventListener("load", (e) => console.log(e.detail, "seconds"));
</script>`,
            vue: `<template>
  <l-Video src="/media/intro.mp4" @play="onPlay" @pause="onPause" @ended="onEnded" @load="onLoad"></l-Video>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const onPlay = () => console.log("playing");
const onPause = () => console.log("paused");
const onEnded = () => console.log("done");
const onLoad = (e: CustomEvent<number>) => console.log(e.detail, "seconds");
</script>`,
            angular: `<l-Video src="/media/intro.mp4" (play)="onPlay()" (pause)="onPause()" (ended)="onEnded()" (load)="onLoad($event)"></l-Video>

// component class
onLoad(e: CustomEvent<number>) {
  console.log(e.detail, "seconds");
}`,
          }}
        />
      </section>
    </div>
  );
}
