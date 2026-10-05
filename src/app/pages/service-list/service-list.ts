import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';
import { ServiceCard } from "../../components/service-card/service-card";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-service-list',
  imports: [ServiceCard, CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceList implements OnInit {
  services: Service[] = [];
  loading = true;
  search = '';
  selectedCategory = '';

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  get categories(): string[] {
    return [...new Set(this.services.map(s => s.category).filter(Boolean))].sort();
  }

  get filteredServices(): Service[] {
    const term = this.search.trim().toLowerCase();
    return this.services.filter(s =>
      (!this.selectedCategory || s.category === this.selectedCategory) &&
      (!term || `${s.title} ${s.description} ${s.category}`.toLowerCase().includes(term))
    );
  }
}
