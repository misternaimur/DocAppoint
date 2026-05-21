/** @format */

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Spinner size="lg" color="success" />
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </main>
  );
}
