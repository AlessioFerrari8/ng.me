import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Project interface defining the structure of project data
interface Project {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
  category: string;
  fullDescription: string;
  techStack: string[];
  keyFeatures: string[];
  demoLink: string;
  repoLink: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})


export class Projects {
  selectedProject: Project | null = null;
  isModalOpen = false;

  // Array of all available projects with full details
  projects: Project[] = [
    {
      id: 1,
      title: 'Pokemon Manager',
      shortDescription: 'A web application for Pokémon Pocket players. Browse the full card catalog, track your missing cards by expansion, build decks, and manage your profile.',
      image: 'Screenshot From 2026-03-26 18-11-26.png',
      category: 'Website',
      fullDescription: 'A web application for Pokémon Pocket players. Browse the full card catalog, track your missing cards by expansion, build decks, and manage your profile.',
      techStack: ['Angular', 'Firebase', 'Firestore', 'Tailwind'],
      keyFeatures: ['Homepage', 'Search', 'Deck building'],
      demoLink: 'https://pokemon-manager-deploy.vercel.app/home',
      repoLink: 'https://github.com/AlessioFerrari8/POKEMON-POCKET-API.git'
    },
    {
      id: 2,
      title: 'TO-READ',
      shortDescription: 'Simple extension that allows you to put some blogs, texts and so on in a list so you can access them easily when you have time.',
      image: 'Schermata da 2026-02-18 12-06-34.webp',
      category: 'Extension',
      fullDescription: 'Browser extension that allows you to save articles, blogs, and texts in a personal list. Access your saved content easily whenever you have time. Intuitive interface with cloud synchronization.',
      techStack: ['JavaScript', 'HTML', 'CSS', 'Browser API'],
      keyFeatures: ['Save Articles', 'Personal List', 'Synchronization', 'Intuitive Interface'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 3,
      title: 'VinylBot',
      shortDescription: 'A bot for discord. The bot plays 15 seconds of a song, and whoever writes the title first in chat wins points. Server leaderboard, streak, and badges.',
      image: 'Gemini_Generated_Image_4ha7gj4ha7gj4ha7.png',
      category: 'Bot',
      fullDescription: 'Discord bot that plays 15-second song snippets and rewards users who guess the title first. Features a scoring system, personal streaks, badges, and a server-wide leaderboard. Perfect for gaming and entertainment.',
      techStack: ['Python', 'Discord.py', 'SQLite', 'Spotify API'],
      keyFeatures: ['Song Playback', 'Score System', 'User Badges', 'Server Leaderboard'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 4,
      title: 'ng.me',
      shortDescription: 'Personal portfolio built with Angular showcasing skills, projects, and professional experience.',
      image: 'https://via.placeholder.com/500x300?text=ng.me+Portfolio',
      category: 'Website',
      fullDescription: 'Professional personal portfolio built with Angular 19 in SSR. Complete showcase of skills, projects, and experience. Modern design with smooth animations and fully responsive across all devices.',
      techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR'],
      keyFeatures: ['Responsive Design', 'Dark Mode', 'GitHub Integration', 'Smooth Animations'],
      demoLink: '#',
      repoLink: '#'
    }
  ];

  // Open project details modal
  openModal(project: Project) {
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close project details modal and restore scroll
  closeModal() {
    this.isModalOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
