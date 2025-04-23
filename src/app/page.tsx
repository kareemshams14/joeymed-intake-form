// src/app/page.tsx
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">JoeyMed Healthcare Intake Form</h1>
      <p className="text-xl mb-8">Coming soon...</p>
      <div className="p-6 border rounded-lg bg-white shadow-md max-w-md">
        <p>Our healthcare intake form will include:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Florida residency verification</li>
          <li>Age verification (18+ only)</li>
          <li>Treatment selection</li>
          <li>Dynamic health questions</li>
          <li>Square checkout integration</li>
        </ul>
      </div>
    </div>
  );
}
