"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

function UniLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="size-10"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M50 15 L30 40 H70 L50 15Z" fill="currentColor" opacity="0.8" />
      <rect x="25" y="42" width="50" height="8" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="30" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="47" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="64" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export default function ComingSoonBlock() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted via-background to-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [background-size:64px_64px] opacity-[0.15]"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        <div className="flex items-center gap-2 text-foreground">
          <UniLogo />
          <span className="text-lg font-semibold tracking-tight">MPI</span>
        </div>

        <Badge variant="secondary" className="mt-8">
          UNIT 1
        </Badge>
        <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          MANAJEMEN PENDIDIKAN ISLAM
        </h1>
        <p className="mt-5 max-w-md text-lg text-pretty text-muted-foreground">
          UIN Sultanah Nahrasiyah Lhokseumawe
        </p>

        {submitted ? (
          <p className="mt-8 text-sm font-medium text-foreground">
            Terima kasih! Kami akan segera menghubungi Anda.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mt-8 flex w-full max-w-md items-center gap-2"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-11"
            />
            <Button type="submit" size="lg" className="h-11 shrink-0">
              Notify Me
              <ChevronRight
                className="size-4"
                data-icon="inline-end"
                aria-hidden="true"
              />
            </Button>
          </form>
        )}

        <div className="mt-10 flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Northwind on X">
            <XMark aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Northwind On GitHub"
          >
            <GithubMark aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}

type MarkProps = React.ComponentProps<"svg"> & { size?: number | string };

function GithubMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
    </svg>
  );
}

function XMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z" />
    </svg>
  );
}
