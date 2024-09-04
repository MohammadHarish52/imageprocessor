"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      setProcessedUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real application, you would send the file to a server for processing
    // For this example, we'll just use the same image
    setProcessedUrl(previewUrl);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Image Processor</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Choose an image or drag and drop
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center justify-center">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={192}
                      height={192}
                      className="max-h-48 rounded-md object-contain"
                    />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="mt-2 flex justify-center">
                  <label
                    htmlFor="file"
                    className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Select Image
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={!file || isProcessing}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Process Image"}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
              {processedUrl ? (
                <img
                  src={processedUrl}
                  alt="Processed"
                  className="max-h-full max-w-full rounded-md"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>No processed image available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 Image Processor. All rights reserved.</p>
      </footer>
    </div>
  );
}
