"use client";

import { useState } from "react";
import { removeBg } from "../actions/removeBg";

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
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {isLoading && <p>Processing image...</p>}
      {originalImage && (
        <div>
          <h3>Original Image</h3>
          <img
            src={originalImage}
            alt="Original"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
      {processedImage && (
        <div>
          <h3>Processed Image (Background Removed)</h3>
          <img
            src={processedImage}
            alt="Processed"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
