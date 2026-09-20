import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** e.g. "Click to upload or drag and drop" — has a sensible default if omitted. */
  label?: ReactNode;
  onFilesSelected?: (files: FileList | null) => void;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    dropzone?: string;
    icon?: string;
    label?: string;
    fileList?: string;
  };
}

export function FileUpload({
  label = "Click to upload or drag and drop",
  onFilesSelected,
  className,
  classNames,
  onChange,
  ...rest
}: FileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <label
      className={cx(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-slate-400 hover:bg-slate-100",
        className,
        classNames?.root
      )}
    >
      <input
        type="file"
        className="sr-only"
        onChange={(e) => {
          setFileNames(e.target.files ? Array.from(e.target.files).map((f) => f.name) : []);
          onFilesSelected?.(e.target.files);
          onChange?.(e);
        }}
        {...rest}
      />
      <div className={cx("flex flex-col items-center justify-center gap-2", classNames?.dropzone)}>
        <Icon name="upload" size={20} className={cx("text-slate-400", classNames?.icon)} />
        <span className={cx("text-sm text-slate-500", classNames?.label)}>{label}</span>
      </div>
      {fileNames.length > 0 && (
        <div className={cx("mt-1 w-full space-y-1", classNames?.fileList)}>
          {fileNames.map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
              <Icon name="file" size={12} />
              {name}
            </div>
          ))}
        </div>
      )}
    </label>
  );
}
