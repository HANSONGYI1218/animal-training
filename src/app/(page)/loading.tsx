'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin" />
    </section>
  );
}
