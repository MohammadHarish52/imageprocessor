"use server";

import * as fal from "@fal-ai/serverless-client";

export async function removeBg(imageUrl: string) {
  try {
    // Configure the Fal AI client
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // Call the Fal AI model to remove the background
    const result = await fal.subscribe("fal-ai/birefnet", {
      input: {
        image_url: imageUrl,
        model: "General Use (Light)",
        operating_resolution: "1024x1024",
        output_format: "png",
      },
    });

    // Return the URL of the processed image
    return result.image.url;
  } catch (error) {
    console.error("Error removing background:", error);
    throw new Error("Failed to remove background");
  }
}
