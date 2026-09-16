import Modal, { type ModalProps } from "../components/ui/Modal";

/**
 * r2wc derives a custom element's attribute name directly from the React
 * prop name (dashed-cased) — there's no way to rename it in the wrapper
 * config. Naming the attribute "title" would collide with the native
 * global `title` attribute every HTML element already has (triggers a
 * hover tooltip), so the Web Component uses `heading` instead. The React
 * `Modal.title` prop itself is untouched.
 */
export function ModalElement({ heading, ...rest }: Omit<ModalProps, "title"> & { heading?: string }) {
  return <Modal title={heading} {...rest} />;
}
