import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  paymentMethods: string[];
}

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {
  therapists: Therapist[] = [
    {
      id: 'dr-ramirez',
      name: 'Dr. Alejandro Ramírez',
      specialty: 'Psicología Clínica y Terapia Familiar',
      bio: 'Con 15 años de experiencia, integra la psicoterapia basada en evidencia con una profunda cosmovisión cristiana, ayudando a familias a restaurar vínculos.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      paymentMethods: ['Zelle', 'Binance', 'Western Union']
    },
    {
      id: 'dra-castillo',
      name: 'Dra. Sofía Castillo',
      specialty: 'Gestión de Ansiedad y Depresión',
      bio: 'Especialista en intervención en crisis. Su abordaje cálido y empático busca ofrecer un refugio seguro para aquellos que están atravesando valles oscuros.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
      paymentMethods: ['Zelle', 'Transferencia Local']
    },
    {
      id: 'lic-martinez',
      name: 'Lic. David Martínez',
      specialty: 'Orientación Vocacional y Juvenil',
      bio: 'Apasionado por brindar dirección a la juventud en etapas de incertidumbre, fusionando el descubrimiento de propósito vital con herramientas psicológicas.',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      paymentMethods: ['Paypal', 'Binance']
    }
  ];
}
