import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Day {
  date: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contributions.html',
  styleUrl: './contributions.css',
})
export class Contributions implements OnInit {
  weeks: Day[][] = [];
  totalContributions = 0;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContributions();
  }

  fetchContributions() {
    // Fetch GitHub user data
    const statsUrl = 'https://api.github.com/users/AlessioFerrari8';
    
    this.http.get<any>(statsUrl).subscribe(
      (data) => {
        this.totalContributions = data.public_repos;
        this.generateMockHeatmap();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching GitHub data:', error);
        this.generateMockHeatmap();
        this.loading = false;
      }
    );
  }

  // Generate contribution heatmap (one year)
  generateMockHeatmap() {
    const weeks: Day[][] = [];
    const today = new Date();
    
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const weekIndex = Math.floor(i / 7);
      
      if (!weeks[weekIndex]) {
        weeks[weekIndex] = [];
      }

      // Generate random contribution count
      const count = Math.random() < 0.7 ? Math.floor(Math.random() * 5) : 0;
      const color = this.getContributionColor(count);

      weeks[weekIndex][dayOfWeek] = {
        date: date.toISOString().split('T')[0],
        count,
        color,
      };
    }

    this.weeks = weeks.reverse();
  }

  // Get color based on contribution count
  getContributionColor(count: number): string {
    if (count === 0) return '#444c63';      // gray
    if (count === 1) return '#0e4429';      // dark green
    if (count === 2) return '#006d32';      // medium green
    if (count === 3) return '#26a641';      // green
    return '#39d353';                       // light green
  }
}
