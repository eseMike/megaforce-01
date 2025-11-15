import { Component, inject } from '@angular/core';
import { TranslationService } from '../translation.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  readonly i18n = inject(TranslationService);

  disabledDates = [
    { month: 11, day: 24 }, // 24 diciembre
    { month: 11, day: 31 }, // 31 diciembre
    { month: 8,  day: 15 }  // 15 septiembre
  ];

  eventLat: number | null = null;
  eventLng: number | null = null;
  eventAddress: string = '';

  initCalendar() {
    const picker = new (window as any).Pikaday({
          disableDayFn: (date: Date) => {
            return this.disabledDates.some(d =>
              date.getDate() === d.day && date.getMonth() === d.month
            );
          },
      field: document.getElementById('eventDatePicker') as HTMLInputElement,
      trigger: document.getElementById('eventDatePicker') as HTMLInputElement,
      container: document.querySelector('.date-input-container') as HTMLElement,
      bound: true,
      onSelect: (date: Date) => {
        const statusDiv = document.getElementById('dateStatusMessage') as HTMLDivElement;
        if (!statusDiv) return;

        statusDiv.textContent = '';
        statusDiv.className = 'date-status-message';

        const isDisabled = this.disabledDates.some(d =>
          date.getDate() === d.day && date.getMonth() === d.month
        );

        if (isDisabled) {
          statusDiv.textContent = '😢 Esa fecha ya está apartada. ¡Intenta con otra!';
          statusDiv.className = 'date-status-message error';
          return;
        }

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;
        if (eventDateInput) {
          eventDateInput.value = `${yyyy}-${mm}-${dd}`;
        }

        statusDiv.textContent = '🎉 ¡Perfecto! Esa fecha está disponible.';
        statusDiv.className = 'date-status-message success';

        const submitBtn = document.querySelector('.contact__submit') as HTMLButtonElement;
        if (submitBtn) submitBtn.disabled = false;
      }
    });
    const dateInput = document.getElementById('eventDatePicker') as HTMLInputElement;
    if (dateInput && picker) {
      dateInput.addEventListener('click', () => {
        picker.show();
      });
    }

    const dateInputVisible = document.getElementById('eventDatePicker') as HTMLInputElement;

    dateInputVisible.addEventListener('input', () => {
      const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;
      if (eventDateInput) {
        eventDateInput.value = dateInputVisible.value;
      }

      const eventDateObj = new Date(dateInputVisible.value);
      const isDateBlockedInput = this.disabledDates.some(d =>
        eventDateObj.getDate() === d.day && eventDateObj.getMonth() === d.month
      );

      const submitBtn = document.querySelector('.contact__submit') as HTMLButtonElement;
      const statusDiv2 = document.getElementById('dateStatusMessage') as HTMLDivElement;

      if (isDateBlockedInput) {
        if (submitBtn) submitBtn.disabled = true;
        if (statusDiv2) {
          statusDiv2.textContent = '❌ Esa fecha ya está apartada. ¡Elige otra!';
          statusDiv2.className = 'date-status-message error';
        }
      } else {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const map = L.map('eventMap').setView([lat, lng], 16);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
          // Cuando el usuario toca el pin, hacer zoom suave
          marker.on('click', () => {
            map.setView(marker.getLatLng(), 17, { animate: true });
          });

          const input = document.getElementById('eventLocation') as HTMLInputElement;
          this.eventLat = lat;
          this.eventLng = lng;

          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then(res => res.json())
            .then(data => {
              this.eventAddress = data.display_name || '';
            })
            .catch(err => console.error('Error al obtener la dirección:', err));

          marker.on('dragend', () => {
            const { lat: newLat, lng: newLng } = marker.getLatLng();
            this.eventLat = newLat;
            this.eventLng = newLng;

            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`)
              .then(res => res.json())
              .then(data => {
                this.eventAddress = data.display_name || '';
              })
              .catch(err => console.error('Error al obtener la dirección:', err));
          });
        },
        (err) => {
          console.error('No se pudo obtener la ubicación:', err);
        }
      );
    }
    this.initCalendar();
  }

  sendWhatsApp(event: Event) {
    event.preventDefault();

    const eventType = (document.getElementById('eventType') as HTMLInputElement)?.value || '';
    const eventDate = (document.getElementById('eventDatePicker') as HTMLInputElement)?.value || '';

    const guestCount = (document.getElementById('guestCount') as HTMLInputElement)?.value.trim() || '';
    const venueSize = (document.getElementById('venueSize') as HTMLInputElement)?.value.trim() || '';
    const contactName = (document.getElementById('contactName') as HTMLInputElement)?.value.trim() || '';

    const eventDateObj = new Date(eventDate);
    const isDateBlocked = this.disabledDates.some(d =>
      eventDateObj.getDate() === d.day && eventDateObj.getMonth() === d.month
    );

    const statusDiv = document.getElementById('dateStatusMessage') as HTMLDivElement;

    if (isDateBlocked) {
      if (statusDiv) {
        statusDiv.textContent = '❌ Esa fecha está apartada. ¡Elige otra!';
        statusDiv.className = 'date-status-message error';
      }
      const submitBtn = document.querySelector('.contact__submit') as HTMLButtonElement;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (statusDiv) {
      statusDiv.textContent = '🎉 ¡Perfecto! Esa fecha está disponible.';
      statusDiv.className = 'date-status-message success';
      const submitBtn = document.querySelector('.contact__submit') as HTMLButtonElement;
      if (submitBtn) submitBtn.disabled = false;
    }

    const requiredIds = ['contactName', 'eventType', 'eventDatePicker', 'guestCount', 'venueSize'];
    let hasError = false;

    requiredIds.forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement;
      if (el) {
        el.classList.remove('invalid');
        const errDiv = document.getElementById(`error-${id}`) as HTMLDivElement;
        if (errDiv) errDiv.textContent = '';
      }
      if (!el?.value.trim()) {
        if (el) el.classList.add('invalid');
        const errDiv = document.getElementById(`error-${id}`) as HTMLDivElement;
        if (errDiv) errDiv.textContent = '⚠️ Campo obligatorio';
        hasError = true;
      }
    });

    const formStatus = document.getElementById('formStatusMessage') as HTMLDivElement;
    if (hasError) {
      if (formStatus) {
        formStatus.textContent = '⚠️ Por favor completa los campos faltantes para continuar 🙂';
        formStatus.className = 'form-status-message visible error';
      }

      // Scroll to first invalid field and apply shake effect
      const firstInvalid = requiredIds
        .map(id => document.getElementById(id) as HTMLInputElement)
        .find(el => el && !el.value.trim());

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.classList.add('shake');

        setTimeout(() => {
          firstInvalid.classList.remove('shake');
        }, 1000);
      }

      return;
    } else {
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status-message visible';
      }
    }

    const formattedDate = eventDate.split('-').reverse().join('/');
    const eventLocation = (document.getElementById('eventLocation') as HTMLInputElement)?.value.trim().replace(/\s+/g, '') || '';

    // Reset all invalid states
    ['contactName', 'eventType', 'eventDatePicker'].forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement;
      if (el) el.classList.remove('invalid');
    });

    const message = encodeURIComponent(
      `Nueva solicitud de evento desde la web\n\n` +
      `Nombre: ${contactName}\n` +
      `Tipo de evento: ${eventType}\n` +
      `Fecha: ${formattedDate}\n` +
      `Personas aproximadas: ${guestCount}\n` +
      `Ubicación: ${this.eventAddress}\n` +
      `Ver mapa: https://www.google.com/maps/place/${this.eventLat},${this.eventLng}/@${this.eventLat},${this.eventLng},17z\n` +
      `Tamaño del lugar: ${venueSize}\n\n` +
      `Gracias, espero tu confirmación.`
    );

    const phoneNumber = '5215523938137'; // Número oficial del cliente
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  }
}
