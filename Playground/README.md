# Legal Aid Intake System

This is a Full Stack Next.js application for managing legal aid cases.

## Prerequisites

- Node.js 18+
- PostgreSQL Database

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file in the root directory and add your database connection string:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/legalaid?schema=public"
    ```

3.  **Database Migration**:
    Push the Prisma schema to your database:
    ```bash
    npx prisma db push
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Lawyer Dashboard**: View and manage assigned cases.
- **Intake Form**: Public facing form for new applicants.
- **Admin Panel**: Manage users and organizations.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `prisma/`: Database schema.
- `lib/`: Utilities (Prisma client).
- `components/`: React components.
