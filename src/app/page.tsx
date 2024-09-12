import { ImageUploader } from "./components/ImageUploader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Image Processor</h1>
        <ImageUploader />
      </main>
      <Footer />
    </div>
  );
}
