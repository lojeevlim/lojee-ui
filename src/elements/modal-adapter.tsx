import Modal, { type ModalProps } from "../components/ui/Modal";
import { AlertDialog, type AlertDialogProps } from "../components/ui/AlertDialog/AlertDialog";
import { Drawer, type DrawerProps } from "../components/ui/Drawer/Drawer";
import { Sheet, type SheetProps } from "../components/ui/Sheet/Sheet";
import { Alert, type AlertProps } from "../components/ui/Alert/Alert";
import { Toast, type ToastProps } from "../components/ui/Toast/Toast";
import { EmptyState, type EmptyStateProps } from "../components/ui/EmptyState/EmptyState";
import { ErrorState, type ErrorStateProps } from "../components/ui/ErrorState/ErrorState";
import { SuccessState, type SuccessStateProps } from "../components/ui/SuccessState/SuccessState";
import { LoadingState, type LoadingStateProps } from "../components/ui/LoadingState/LoadingState";

/**
 * r2wc derives a custom element's attribute name directly from the React
 * prop name (dashed-cased) — there's no way to rename it in the wrapper
 * config. Naming the attribute "title" would collide with the native
 * global `title` attribute every HTML element already has (triggers a
 * hover tooltip), so every Web Component with a `title` prop below uses
 * `heading` instead. The React components' own `title` prop is untouched.
 */
export function ModalElement({ heading, ...rest }: Omit<ModalProps, "title"> & { heading?: string }) {
  return <Modal title={heading} {...rest} />;
}

export function AlertDialogElement({
  heading,
  ...rest
}: Omit<AlertDialogProps, "title"> & { heading?: string }) {
  return <AlertDialog title={heading} {...rest} />;
}

export function DrawerElement({ heading, ...rest }: Omit<DrawerProps, "title"> & { heading?: string }) {
  return <Drawer title={heading} {...rest} />;
}

export function SheetElement({ heading, ...rest }: Omit<SheetProps, "title"> & { heading?: string }) {
  return <Sheet title={heading} {...rest} />;
}

export function AlertElement({ heading, ...rest }: Omit<AlertProps, "title"> & { heading?: string }) {
  return <Alert title={heading} {...rest} />;
}

export function ToastElement({ heading, ...rest }: Omit<ToastProps, "title"> & { heading?: string }) {
  return <Toast title={heading} {...rest} />;
}

export function EmptyStateElement({
  heading,
  ...rest
}: Omit<EmptyStateProps, "title"> & { heading?: string }) {
  return <EmptyState title={heading} {...rest} />;
}

export function ErrorStateElement({
  heading,
  ...rest
}: Omit<ErrorStateProps, "title"> & { heading?: string }) {
  return <ErrorState title={heading} {...rest} />;
}

export function SuccessStateElement({
  heading,
  ...rest
}: Omit<SuccessStateProps, "title"> & { heading?: string }) {
  return <SuccessState title={heading} {...rest} />;
}

export function LoadingStateElement({
  heading,
  ...rest
}: Omit<LoadingStateProps, "title"> & { heading?: string }) {
  return <LoadingState title={heading} {...rest} />;
}
