# 🚀 [ng.me](https://ngme-deploy.vercel.app/home)


A modern portfolio application built with **Angular 21**, **Tailwind CSS**, and **DaisyUI**.

## ✨ Features

- **Modern Angular Architecture** - Built with Angular 21 and standalone components
- **Responsive Design** - Tailored styling with Tailwind CSS and DaisyUI components
- **Icon Library** - Font Awesome icons for beautiful visual elements
- **Multi-page Portfolio** - Showcasing skills, projects, contributions, and personal information

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/        # Navigation component
│   │   └── contributions/ # Contributions component (not used)
│   ├── pages/
│   │   ├── home/          # Home page
│   │   ├── about/         # About page
│   │   ├── projects/      # Projects showcase
│   │   └── skills/        # Skills section
│   ├── app.ts             # Main app component
│   ├── app.routes.ts      # Routing configuration
│   └── app.config.ts      # App configuration
└── server.ts              # Express server setup
```

## 🛠️ Prerequisites

- **Node.js** 20.x or higher
- **npm** 11.9.0 or higher

## 📦 Install Dependencies

```bash
npm install
npm install -g @angular/cli
```

## 🚀 Development

Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

## 🏗️ Build

Build the project for production:

```bash
ng build
```

Build in watch mode (rebuilds on file changes):

```bash
npm run watch
```

## ✅ Testing

Run the test suite:

```bash
npm test
```

## 🔧 Tech Stack

- **Frontend Framework**: Angular 21
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Icons**: Font Awesome 7
- **Package Manager**: npm
- **TypeScript**: 5.9

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `ng serve` | Start development server |
| `ng build` | Build for production |
| `npm run watch` | Build in watch mode |
| `npm test` | Run tests |

## 🚀 Deployment

This project is configured for deployment on **Vercel**. The `vercel.json` configuration handles automatic builds and deployments.

Find it in https://ngme-deploy.vercel.app/home

## 📄 License

This project is private. All rights reserved.