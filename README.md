# Mononote

A modern, minimalist note-taking application built with Next.js and PocketBase. Mononote provides a clean, distraction-free interface for organizing your thoughts with support for folders, real-time syncing, and a beautiful dark mode.

## Features

- 📝 **Rich Note Editor** - Clean, distraction-free writing experience
- 📁 **Folder Organization** - Organize notes into folders for better structure
- 🔐 **User Authentication** - Secure login and signup with PocketBase
- 🌓 **Dark Mode** - Beautiful light and dark themes
- ⚡ **Real-time Sync** - Notes are automatically saved and synced
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with React 19
- **Backend**: [PocketBase](https://pocketbase.io/) (self-hosted)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)

## Prerequisites

- Node.js 20+ 
- Docker (for running PocketBase)
- npm, yarn, pnpm, or bun

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mononote
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start PocketBase

PocketBase runs in a Docker container. The database migrations are already configured and will be applied automatically.

```bash
cd pocketbase
./run_pocketbase.sh
```

PocketBase will be available at:
- **API**: http://localhost:8090
- **Admin UI**: http://localhost:8090/_/

### 4. Run the Development Server

In a new terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create an Account

Navigate to the signup page and create your first account to start taking notes!

## Project Structure

```
mononote/
├── app/                    # Next.js app directory
│   ├── app/               # Main application pages
│   │   ├── note/          # Note viewing/editing
│   │   └── note-list.tsx  # List of all notes
│   └── auth/              # Authentication pages
│       ├── login/
│       └── signup/
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and configs
│   ├── pocketbase.ts     # PocketBase client setup
│   └── utils.ts          # Helper functions
├── pocketbase/           # PocketBase backend
│   ├── pb_migrations/    # Database migrations
│   ├── pb_data/         # Database files (not in git)
│   └── run_pocketbase.sh # Docker startup script
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run pocketbase-gen` - Generate TypeScript types from PocketBase schema

## PocketBase Collections

The application uses the following PocketBase collections:

- **users** - User accounts with authentication
- **notes** - Individual notes with title, content, and folder reference
- **folders** - Folder organization for notes

## Environment Variables

For production deployment, you may want to use environment variables:

```bash
NEXT_PUBLIC_POCKETBASE_URL=http://localhost:8090
```

Update `lib/pocketbase.ts` to use this environment variable instead of the hardcoded URL.

## Deployment

### Deploy the Next.js Frontend

The easiest way to deploy the Next.js app is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy PocketBase Backend

PocketBase can be deployed on any server that supports Docker or as a standalone binary. See the [PocketBase documentation](https://pocketbase.io/docs/) for deployment options.

## Development Notes

- **Database**: The `pocketbase/pb_data/` directory contains the SQLite database and is excluded from git
- **Type Safety**: TypeScript types are generated from the PocketBase schema using `pocketbase-typegen`
- **Auto-save**: Notes are automatically saved using debounced updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [PocketBase](https://pocketbase.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
