import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";
import log from "electron-log";

const logger = log.scope("image_generator");

export async function generateAndSaveImage({
    prompt,
    outputPath,
    apiKey,
}: {
    prompt: string;
    outputPath: string;
    apiKey: string;
}): Promise<string> {
    try {
        logger.info(`Generating image for prompt: "${prompt}" to ${outputPath}`);

        const openai = new OpenAI({ apiKey });

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const b64Data = response.data?.[0]?.b64_json;
        if (!b64Data) {
            throw new Error("No image data received from OpenAI");
        }

        const buffer = Buffer.from(b64Data, "base64");

        // Ensure directory exists
        const dirPath = path.dirname(outputPath);
        if (!fs.existsSync(dirPath)) {
            await fs.promises.mkdir(dirPath, { recursive: true });
        }

        await fs.promises.writeFile(outputPath, buffer);
        logger.info(`Successfully saved image to ${outputPath}`);

        return outputPath;
    } catch (error) {
        logger.error("Error generating image:", error);
        throw error;
    }
}
