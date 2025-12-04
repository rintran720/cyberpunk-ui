import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

// ============================================================================
// File Upload Variants
// ============================================================================

const fileUploadVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// File Upload Root
// ============================================================================

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof fileUploadVariants> {
  /** Selected files */
  value?: File[];
  /** Default files for uncontrolled */
  defaultValue?: File[];
  /** Callback when files change */
  onChange?: (files: File[]) => void;
  /** Accept file types (e.g., "image/*", ".pdf") */
  accept?: string;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Whether the upload is required */
  isRequired?: boolean;
  /** Whether to show file list */
  showFileList?: boolean;
  /** Custom upload button text */
  uploadButtonText?: string;
  /** Drag and drop enabled */
  dragDrop?: boolean;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = [],
      onChange,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      label,
      helperText,
      error,
      disabled,
      isRequired,
      size = "md",
      showFileList = true,
      uploadButtonText = "Choose Files",
      dragDrop = true,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<File[]>(
      defaultValue
    );
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const files = isControlled ? controlledValue : uncontrolledValue;

    // Handle file selection
    const handleFiles = React.useCallback(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        const newFiles = Array.from(fileList);
        let validFiles: File[] = [];

        // Check max files
        if (maxFiles && files.length + newFiles.length > maxFiles) {
          // Show error or limit files
          validFiles = newFiles.slice(0, maxFiles - files.length);
        } else {
          validFiles = newFiles;
        }

        // Check max size
        if (maxSize) {
          validFiles = validFiles.filter((file) => file.size <= maxSize);
        }

        const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;

        if (!isControlled) {
          setUncontrolledValue(updatedFiles);
        }
        onChange?.(updatedFiles);
      },
      [files, multiple, maxFiles, maxSize, isControlled, onChange]
    );

    // Handle input change
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // Reset input to allow selecting the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [handleFiles]
    );

    // Handle drag and drop
    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && dragDrop) {
        setIsDragging(true);
      }
    }, [disabled, dragDrop]);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;
        handleFiles(e.dataTransfer.files);
      },
      [disabled, handleFiles]
    );

    // Handle remove file
    const handleRemove = React.useCallback(
      (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        if (!isControlled) {
          setUncontrolledValue(updatedFiles);
        }
        onChange?.(updatedFiles);
      },
      [files, isControlled, onChange]
    );

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    return (
      <div
        ref={ref}
        className={cn(
          fileUploadVariants({ size }),
          "w-full",
          className
        )}
        {...props}
      >
        {label && (
          <label className="block text-sm font-medium text-surface-200 mb-2">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-colors",
            isDragging
              ? "border-primary-500 bg-primary-500/10"
              : "border-surface-600 bg-surface-900/50",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />

          <div className="p-6 text-center">
            <svg
              className={cn(
                "mx-auto h-12 w-12 mb-4",
                isDragging ? "text-primary-500" : "text-surface-500"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <p className="text-sm text-surface-300 mb-2">
              {dragDrop ? (
                <>
                  <span className="font-medium text-primary-400">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </>
              ) : (
                <span className="font-medium text-primary-400">
                  Click to upload
                </span>
              )}
            </p>

            {accept && (
              <p className="text-xs text-surface-500 mb-4">
                {accept.includes("*")
                  ? `Accepts: ${accept}`
                  : `Accepts: ${accept.split(",").join(", ")}`}
              </p>
            )}

            {maxSize && (
              <p className="text-xs text-surface-500 mb-4">
                Max size: {formatFileSize(maxSize)}
              </p>
            )}

            {maxFiles && (
              <p className="text-xs text-surface-500 mb-4">
                Max files: {maxFiles}
              </p>
            )}

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              {uploadButtonText}
            </Button>
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 rounded-lg border border-surface-700 bg-surface-800"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <svg
                    className="h-5 w-5 text-surface-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-surface-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                  className="ml-2 p-1 rounded hover:bg-surface-700 text-surface-400 hover:text-red-400 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {helperText && !error && (
          <p className="mt-2 text-xs text-surface-500">{helperText}</p>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload, fileUploadVariants };

