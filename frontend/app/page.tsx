import NdaGenerator from "@/components/NdaGenerator";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Prelegal — Mutual NDA Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Fill in the form to generate, preview, and download your Mutual NDA
        </p>
      </header>
      <NdaGenerator />
    </main>
  );
}
