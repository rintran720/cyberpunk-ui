import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload label="Upload Files" />
    </div>
  ),
};

export const SingleFile: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload File"
        multiple={false}
        uploadButtonText="Choose File"
      />
    </div>
  ),
};

export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload
          label="Upload Files"
          multiple
          value={files}
          onChange={setFiles}
        />
        {files.length > 0 && (
          <div className="p-4 rounded-lg border border-surface-700 bg-surface-800">
            <p className="text-sm text-surface-400 mb-2">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithAccept: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload Images"
        accept="image/*"
        helperText="Only image files are allowed"
      />
    </div>
  ),
};

export const WithMaxSize: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload File"
        maxSize={5 * 1024 * 1024} // 5MB
        helperText="Maximum file size: 5MB"
      />
    </div>
  ),
};

export const WithMaxFiles: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload Files"
        multiple
        maxFiles={5}
        helperText="Maximum 5 files allowed"
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload File"
        error="Please select a valid file"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload File"
        helperText="Supported formats: PDF, DOC, DOCX"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload label="Upload File" disabled />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload label="Upload File" isRequired />
    </div>
  ),
};

export const WithoutDragDrop: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload label="Upload File" dragDrop={false} />
    </div>
  ),
};

export const WithoutFileList: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload label="Upload File" showFileList={false} />
    </div>
  ),
};

export const PDFOnly: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload
        label="Upload PDF"
        accept=".pdf"
        helperText="Only PDF files are allowed"
      />
    </div>
  ),
};

export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload
          label="Upload Images"
          accept="image/*"
          multiple
          value={files}
          onChange={setFiles}
        />
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border border-surface-700 bg-surface-800 overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

