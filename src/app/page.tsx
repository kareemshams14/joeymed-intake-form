import React from 'react';
import IntakeForm from '../components/IntakeForm';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <IntakeForm />
    </main>
  );
}
