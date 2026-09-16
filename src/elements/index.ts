// Single side-effect import that registers every custom element:
//   import "lojee-ui/elements";
// After that, <l-button>, <l-split-button>, <l-button-group>,
// <l-segment-button>, and <l-modal> work in any HTML page — no
// framework, no React import, required from the consumer. (React itself
// still runs internally, inside each element's shadow root — see
// PLAN.md's "Web Components track" note for that tradeoff.)
import "./register";
