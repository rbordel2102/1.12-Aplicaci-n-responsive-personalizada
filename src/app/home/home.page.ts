import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  futbolistas: any[] = [];
  filteredFutbolistas: any[] = [];
  filtro: string = '';

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any[]>('https://raw.githubusercontent.com/rbordel2102/JSON/refs/heads/master/json.json')
      .subscribe(data => {
        this.futbolistas = data;
        this.filteredFutbolistas = data; // Inicialmente mostrar todos los futbolistas
      });
  }

  // Método para filtrar futbolistas
  applyFilter() {
    const filterText = this.filtro.toLowerCase();

    this.filteredFutbolistas = this.futbolistas.filter(futbolista => {
      // Buscar el texto en cualquier propiedad relevante del futbolista
      return Object.values(futbolista).some(value => {
        if (value === null || value === undefined) {
          return false; // Ignorar valores nulos o indefinidos
        }
        return value.toString().toLowerCase().includes(filterText);
      });
    });
  }
}
