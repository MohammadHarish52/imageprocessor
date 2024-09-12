"use client";

import { useState } from "react";
import { removeBg } from "../actions/removeBg";
import Image from "next/image";

export function ImageUploader() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      // Upload the file to a temporary storage and get the URL
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await response.json();

      setOriginalImage(url);

      // Call the server action to remove the background
      const processedImageUrl = await removeBg(url);
      setProcessedImage(processedImageUrl);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
          {isLoading && <p className="text-gray-600">Processing image...</p>}
          {originalImage && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Original Image</h3>
              <div className="relative w-full aspect-square">
                <Image
                  src={originalImage}
                  alt="Original"
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          {processedImage ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Processed Image (Background Removed)
              </h3>
              <div className="relative w-full aspect-square">
                <Image
                  src={processedImage}
                  alt="Processed"
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-500">Processed image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
