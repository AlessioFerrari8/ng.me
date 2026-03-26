# GitHub Contributions Heatmap - Guida Avanzata

Questo documento spiega come implementare una versione **dinamica e customizzata** della heatmap delle contributions di GitHub usando Angular e l'API di GitHub.

## Soluzione Attuale (Semplice)
Attualmente usiamo:
```html
<img src="https://ghchart.rshah.org/10b981/AlessioFerrari8" alt="GitHub Contributions" />
```
✅ **Pregi:** Semplice, no dipendenze, fast  
❌ **Difetti:** Non customizzabile, immagine statica

---

## Soluzione Avanzata: Componente Angular + GitHub API

### Passo 1: Creare il Componente
```bash
ng g c pages/github-contributions --skip-tests
```

### Passo 2: Logica TypeScript (`github-contributions.ts`)

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Day {
  date: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-github-contributions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-contributions.html',
  styleUrl: './github-contributions.css',
})
export class GitHubContributions implements OnInit {
  weeks: Day[][] = [];
  totalContributions = 0;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContributions();
  }

  fetchContributions() {
    // Opzione 1: Usare github-readme-stats API (più facile)
    const statsUrl = 'https://api.github.com/users/AlessioFerrari8';
    
    this.http.get<any>(statsUrl).subscribe(
      (data) => {
        this.totalContributions = data.public_repos;
        this.generateMockHeatmap();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching GitHub data:', error);
        this.loading = false;
      }
    );
  }

  // Genera una heatmap di esempio (in futuro potrai usare l'API di GraphQL)
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

  getContributionColor(count: number): string {
    if (count === 0) return '#444c63';      // grigio
    if (count === 1) return '#0e4429';      // verde scuro
    if (count === 2) return '#006d32';      // verde medio
    if (count === 3) return '#26a641';      // verde
    return '#39d353';                       // verde chiaro
  }
}
```

### Passo 3: Template HTML (`github-contributions.html`)

```html
<div class="github-heatmap-container">
  <div class="heatmap-header">
    <h3>Contribution Activity</h3>
    <p *ngIf="!loading">{{ totalContributions }} contributions</p>
    <p *ngIf="loading">Loading...</p>
  </div>

  <div class="heatmap" *ngIf="!loading">
    <div class="year-row">
      <div *ngFor="let week of weeks" class="week">
        <div 
          *ngFor="let day of week" 
          class="day" 
          [style.backgroundColor]="day.color"
          [title]="day.date + ': ' + day.count + ' contributions'"
        ></div>
      </div>
    </div>
  </div>

  <div *ngIf="loading" class="loading">Loading contributions...</div>
</div>
```

### Passo 4: Stili CSS (`github-contributions.css`)

```css
.github-heatmap-container {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
}

.heatmap-header {
  margin-bottom: 20px;
}

.heatmap-header h3 {
  color: #e0e7ff;
  margin: 0 0 8px 0;
  font-size: 18px;
}

.heatmap-header p {
  color: #94a3b8;
  margin: 0;
  font-size: 14px;
}

.heatmap {
  overflow-x: auto;
  padding-bottom: 20px;
}

.year-row {
  display: flex;
  gap: 2px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.day:hover {
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.loading {
  text-align: center;
  color: #94a3b8;
  padding: 40px;
}
```

### Passo 5: Usare il Componente in About
Nel file `about.html`:

```html
<app-github-contributions></app-github-contributions>
```

Nel file `about.ts`:
```typescript
import { GitHubContributions } from '../github-contributions/github-contributions';

@Component({
  // ...
  imports: [GitHubContributions],
})
export class About {}
```

### Passo 6: Aggiungere HttpClientModule
Nel `app.config.ts`, aggiungi:

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ... altri provider
  ],
};
```

---

## Upgrade Futuro: GraphQL API di GitHub

Per una versione ancora più avanzata con dati REALI:

```typescript
// Sostituire fetch con GraphQL query
const query = `
  query {
    user(login: "AlessioFerrari8") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

// Require GitHub Personal Access Token
const headers = {
  'Authorization': `Bearer YOUR_GITHUB_TOKEN`
};
```

---

## Checklist per Implementare

- [ ] Generare il componente con `ng g c pages/github-contributions`
- [ ] Copiare il codice TypeScript da `github-contributions.ts`
- [ ] Copiare il template HTML
- [ ] Aggiungere i stili CSS
- [ ] Importare `HttpClientModule` in `app.config.ts`
- [ ] Importare il componente in `about.ts`
- [ ] Testare il rendering
- [ ] (Opzionale) Tradurre le label in italiano
- [ ] (Opzionale) Integrare GraphQL per dati REALI

---

## Risorse Utili

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Angular HttpClient](https://angular.io/guide/understanding-communicating-with-backends)
- [GitHub Contributions Calendar](https://github.com/24eme/github-contributions-api)

---

**Domande?** Contattami o consulta la documentazione ufficiale di GitHub API! 🚀
