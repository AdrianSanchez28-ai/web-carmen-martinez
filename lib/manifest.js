/* ============================================================================
   DATOS DEL SALÓN — Perruqueria i Estètica Carmen Martínez
   ----------------------------------------------------------------------------
   ESTE ES EL ARCHIVO QUE PUEDES EDITAR TÚ MISMA/O con el Bloc de notas.
   Cambia los textos entre comillas "..." y guarda. Después sube el archivo
   a Hostinger (carpeta lib/) y recarga la web con Ctrl+F5.

   ⚠️ Reglas de oro:
   - No borres las comas (,) ni las comillas (").
   - No borres las llaves { } ni los corchetes [ ].
   - Si dudas, copia este archivo antes de tocarlo.
   ============================================================================ */
(function () {
  "use strict";

  window.__CARMEN__ = {

    /* ------------------------------------------------------------------
       MARCA Y CONTACTO
       ------------------------------------------------------------------ */
    brand: {
      name: "Perruqueria i Estètica Carmen Martínez",
      shortName: "Carmen Martínez",
      tagline: "Cuidarte es lo nuestro.",
      kicker: "Perruqueria · Estètica · Manicura / L'Alcúdia · València",
      phoneDisplay: "962 54 10 73",
      /* Número de WhatsApp en formato internacional, SIN espacios ni "+" */
      whatsapp: "34962541073",
      instagramSalon: "perruqueriacarmenmartinez",
      instagramNails: "iirnexnails",
      address: "Carrer Cal·lígraf Antoni Sanchis, 10",
      city: "46250 L'Alcúdia (València)",
      mapsQuery: "Carrer Cal·lígraf Antoni Sanchis 10, 46250 L'Alcúdia, Valencia"
    },

    /* ------------------------------------------------------------------
       SERVICIOS (carrusel horizontal)
       serie: "Esencial" o "Especial"
       icon:  tijeras | gota | mano | pie | una | frasco | pincel | hoja | onda | trenza
       tone:  "sage" (verde) o "nude" (rosa empolvado)
       ------------------------------------------------------------------ */
    services: [
      {
        id: "corte", name: "Corte de Mujer", serie: "Esencial", icon: "tijeras",
        subtitle: "Corte a tu medida",
        includes: ["Diagnóstico", "Lavado", "Corte y acabado"],
        text: "Escuchamos primero y cortamos después. Un corte pensado para tu cara, tu pelo y tu día a día, con acabado de salón.",
        tone: "sage"
      },
      {
        id: "tinte", name: "Tinte y Color", serie: "Esencial", icon: "gota",
        subtitle: "Color que dura",
        includes: ["Color personalizado", "Matiz", "Acabado"],
        text: "Del retoque de raíz al cambio completo. Color medido, cuidado del cabello y un resultado que aguanta.",
        tone: "nude"
      },
      {
        id: "manicura", name: "Manicura", serie: "Esencial", icon: "mano",
        subtitle: "Francesa · Gel · Acrílico",
        includes: ["Limado y cutícula", "Esmaltado a elegir", "Acabado de detalle"],
        text: "Manicura clásica francesa, esmaltado en gel de larga duración o construcción en acrílico. Manos cuidadas hasta el último detalle.",
        tone: "nude"
      },
      {
        id: "pedicura", name: "Pedicura", serie: "Esencial", icon: "pie",
        subtitle: "Pies al día",
        includes: ["Baño y exfoliación", "Cutícula y limado", "Esmaltado"],
        text: "Pedicura completa con baño, exfoliación y esmaltado. Para sandalias o para ti.",
        tone: "sage"
      },
      {
        id: "acrilicas", name: "Uñas Acrílicas", serie: "Especial", icon: "una",
        subtitle: "Construcción y forma",
        includes: ["Construcción acrílica", "Forma a elegir", "Acabado brillo o mate"],
        text: "Largo y forma a tu gusto —almendra, cuadrada, coffin— con una construcción resistente que respeta tu uña.",
        tone: "nude"
      },
      {
        id: "gel", name: "Esmaltado en Gel", serie: "Especial", icon: "frasco",
        subtitle: "Semipermanente",
        includes: ["Preparación de uña", "Color gel", "Sellado en lámpara"],
        text: "Color impecable durante semanas, secado al momento en lámpara. El básico que nunca falla.",
        tone: "sage"
      },
      {
        id: "nailart", name: "Nail Art", serie: "Especial", icon: "pincel",
        subtitle: "Diseños @iirnexnails",
        includes: ["Diseño personalizado", "Detalles a mano", "Acabado sellado"],
        text: "Diseños a mano, del minimalismo a lo atrevido. Mira el Instagram @iirnexnails y trae tu idea.",
        tone: "nude"
      },
      {
        id: "cera", name: "Depilación con Cera", serie: "Especial", icon: "hoja",
        subtitle: "Piel suave, sin prisas",
        includes: ["Cera caliente o tibia", "Zonas a elegir", "Calmante posterior"],
        text: "Depilación con cera de calidad, por zonas o completa, con producto calmante al terminar.",
        tone: "sage"
      },
      {
        id: "peinado", name: "Peinado de Fiesta", serie: "Especial", icon: "onda",
        subtitle: "Bodas · Comuniones · Eventos",
        includes: ["Prueba opcional", "Recogido o suelto", "Fijación de larga duración"],
        text: "Recogidos, ondas y peinados que aguantan toda la celebración. Con prueba previa si el evento lo merece.",
        tone: "nude"
      },
      {
        id: "mechas", name: "Mechas y Matices", serie: "Especial", icon: "trenza",
        subtitle: "Luz en el cabello",
        includes: ["Mechas o balayage", "Matización", "Tratamiento de brillo"],
        text: "Reflejos y luz a medida, de lo sutil a lo visible, siempre con el cuidado del cabello por delante.",
        tone: "sage"
      }
    ],

    /* ------------------------------------------------------------------
       HORARIO SEMANAL
       day: 0=Domingo, 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado
       icon: reloj | luna | estrella | sol
       ------------------------------------------------------------------ */
    schedule: [
      { day: 1, name: "Lunes",     hours: "9:00–13:00 · 15:00–19:00", note: "Empezamos la semana.",          icon: "reloj",    tone: "sage",  closed: false },
      { day: 2, name: "Martes",    hours: "Cerrado",                  note: "Día de descanso.",              icon: "luna",     tone: "stone", closed: true  },
      { day: 3, name: "Miércoles", hours: "9:00–13:00 · 15:00–19:00", note: "Mañana y tarde.",               icon: "reloj",    tone: "nude",  closed: false },
      { day: 4, name: "Jueves",    hours: "9:00–13:00 · 15:00–19:00", note: "Mañana y tarde.",               icon: "reloj",    tone: "sage",  closed: false },
      { day: 5, name: "Viernes",   hours: "9:00–13:00 · 15:00–19:00", note: "El día de ponerse guapa.",      icon: "estrella", tone: "nude",  closed: false },
      { day: 6, name: "Sábado",    hours: "8:30–13:00",               note: "Solo mañanas, reserva pronto.", icon: "sol",      tone: "sage",  closed: false },
      { day: 0, name: "Domingo",   hours: "Cerrado",                  note: "Descansamos.",                  icon: "luna",     tone: "stone", closed: true  }
    ],

    /* ------------------------------------------------------------------
       PROMO DE FIDELIDAD
       ------------------------------------------------------------------ */
    promo: {
      title: "Tu décima manicura corre de nuestra cuenta.",
      text: "Por cada 10 visitas a la manicurista, la siguiente sesión es de regalo. La tarjeta se sella en el propio salón, visita a visita. Sin letra pequeña: vienes, te cuidamos, sellamos.",
      cta: "Empieza tu tarjeta por WhatsApp",
      whatsappMessage: "Hola! Quiero empezar mi tarjeta de fidelidad de manicura 💅"
    },

    /* ------------------------------------------------------------------
       GALERÍA — sustituye los archivos en assets/img/ por tus fotos
       (mismo nombre de archivo) o cambia aquí las rutas.
       ------------------------------------------------------------------ */
    gallery: [
      "assets/img/gal-01.webp", "assets/img/gal-02.webp", "assets/img/gal-03.webp",
      "assets/img/gal-04.webp", "assets/img/gal-05.webp", "assets/img/gal-06.webp",
      "assets/img/gal-07.webp", "assets/img/gal-08.webp", "assets/img/gal-09.webp",
      "assets/img/gal-10.webp", "assets/img/gal-11.webp", "assets/img/gal-12.webp"
    ]
  };

  /* Alias estándar de la skill (no tocar): apunta a los mismos datos */
  window.__BRAND__ = window.__CARMEN__;
})();
