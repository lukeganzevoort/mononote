import Link from "next/link";
import {
  FileText,
  FolderOpen,
  Sparkles,
  Shield,
  Zap,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Alpha Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-500">
            ⚠️ Alpha Version - This application is currently in development and
            not ready for public use
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 pt-20 pb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Mononote
                </span>
              </h1>
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-500 ring-1 ring-inset ring-amber-500/20">
                Alpha
              </span>
            </div>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A modern, minimalist note-taking app for organizing your thoughts
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/app?demo=true"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try Demo
            </Link>
            {/* <Button
              disabled={true}
              // href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-8 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              Get Started
            </Button> */}
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-16 pb-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Rich Note Editor"
            description="Clean, distraction-free writing experience with automatic saving"
          />
          <FeatureCard
            icon={<FolderOpen className="h-8 w-8" />}
            title="Folder Organization"
            description="Organize notes into folders for better structure and navigation"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Private"
            description="Your notes are encrypted and stored securely with user authentication"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Real-time Sync"
            description="Notes are automatically saved and synced across your devices"
          />
          <FeatureCard
            icon={<Moon className="h-8 w-8" />}
            title="Beautiful Themes"
            description="Elegant light and dark modes to match your preference"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="Modern UI"
            description="Built with cutting-edge technology for a smooth, responsive experience"
          />
        </div>

        {/* Tech Stack Section */}
        <div className="max-w-4xl mx-auto pt-16 pb-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Built with Modern Technology
          </h2>
          <p className="text-muted-foreground">
            Powered by Next.js 15, React 19, PocketBase, and Tailwind CSS
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Mononote. A minimalist note-taking application.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
      <div className="flex flex-col space-y-3">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
