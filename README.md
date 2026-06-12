# Web de Perruqueria i Estètica Carmen Martínez

Hola 👋 Esta carpeta contiene la web completa del salón. Aquí tienes todo lo que
necesitas saber, explicado paso a paso y sin tecnicismos.

---

## 1. Ver la web en tu ordenador o móvil

Haz doble clic (o toca) el archivo **index.html**. Se abrirá en tu navegador y
verás la web exactamente igual que la verán los clientes. No necesitas internet
salvo para las letras (tipografías) y el mapa.

---

## 2. Subir la web a Hostinger

1. Entra en **hostinger.com** y accede a tu panel (hPanel).
2. Ve a **Archivos → Administrador de archivos**.
3. Entra en la carpeta **public_html**.
4. Si dentro hay un archivo "default.php" o similar, bórralo.
5. Pulsa **Subir** y sube TODOS los archivos y carpetas de esta carpeta:
   - `index.html`
   - `styles.css`
   - `main.js`
   - `.htaccess`  ← importante, aunque parezca raro
   - la carpeta `lib`
   - la carpeta `assets`
   (El `README.md` no hace falta subirlo, pero no pasa nada si lo subes.)

   💡 Truco: si subes esta carpeta entera como un archivo **.zip**, el
   Administrador de archivos de Hostinger tiene la opción de descomprimirlo
   allí mismo (clic derecho sobre el zip → Extract). Es lo más cómodo desde
   el móvil. Asegúrate de que `index.html` quede directamente dentro de
   `public_html`, no dentro de una subcarpeta.

6. Abre tu dominio en el navegador. ¡Ya está!

---

## 3. Cambiar textos, servicios, horarios o la promo

Todo lo importante está en **un solo archivo**: `lib/manifest.js`.

1. Ábrelo con el **Bloc de notas** (Windows) o cualquier editor de texto.
2. Cambia el texto que quieras **entre comillas** "así".
3. Guarda el archivo.
4. Súbelo a Hostinger a la carpeta `lib/` (reemplazando el anterior).
5. Recarga la web con **Ctrl + F5** (o borra caché en el móvil).

⚠️ Reglas de oro al editar:
- No borres las comas `,` ni las comillas `"`.
- No borres llaves `{ }` ni corchetes `[ ]`.
- Haz una copia del archivo antes de tocarlo, por si acaso.

Qué hay dentro de `manifest.js`:
- **brand** → nombre, teléfono, WhatsApp, Instagram, dirección.
- **services** → los 10 servicios del carrusel (nombre, textos, qué incluye).
- **schedule** → el horario de cada día de la semana.
- **promo** → el texto de la tarjeta de fidelidad.
- **gallery** → las fotos de la galería.

---

## 4. Poner las fotos reales del salón

Las fotos están en la carpeta **assets/img/**. Las que hay ahora son
provisionales (fondos suaves de color). Para poner las tuyas:

1. Elige tus fotos (del salón, de manicuras de @iirnexnails, de peinados…).
2. Renómbralas EXACTAMENTE igual que las que quieres sustituir:
   - `hero.webp` → la foto grande de portada (horizontal, luminosa).
   - `salon-1.webp`, `salon-2.webp`, `salon-3.webp` → el collage del salón (verticales).
   - `promo.webp` → fondo de la tarjeta de fidelidad.
   - `gal-01.webp` … `gal-12.webp` → la galería (cuadradas quedan mejor).
3. Súbelas a `assets/img/` en Hostinger reemplazando las antiguas.

¿Tus fotos son .jpg y no .webp? Dos opciones:
- La fácil: conviértelas gratis en **squoosh.app** (abre la foto, elige WebP,
  descarga) y renombra.
- También puedes cambiar la terminación en `lib/manifest.js` (sección gallery)
  y en `index.html`, pero es más lioso; mejor convertir a .webp.

Consejo: fotos de menos de 1 MB cargan mucho más rápido en el móvil.

---

## 5. Cambiar el número de teléfono / WhatsApp

1. Abre `lib/manifest.js` y cambia:
   - `phoneDisplay` → cómo se ve el número en la web (con espacios).
   - `whatsapp` → el número en formato internacional SIN espacios ni "+"
     (ejemplo: "34962541073").
2. Guarda, sube y recarga con Ctrl + F5.

Con eso se actualizan solos todos los botones y enlaces de la web.
(El número también aparece escrito en `index.html` como respaldo por si el
JavaScript no carga; si quieres ser perfeccionista, ábrelo y reemplaza el
número antiguo por el nuevo con "Buscar y reemplazar".)

---

## 6. "He cambiado algo y la web no se actualiza"

Es la caché (el navegador guarda la versión vieja). De más fácil a más técnico:

1. Recarga con **Ctrl + F5** (en móvil: borrar datos de navegación del sitio).
2. Espera 1 hora: el servidor está configurado para refrescar solo.
3. Si editas `styles.css` o `main.js` y quieres forzar a TODOS los visitantes
   a ver lo nuevo ya: abre `index.html` y busca `?v=20260612`. Cámbialo por la
   fecha de hoy (ej.: `?v=20260701`) en las DOS apariciones que tiene cada
   archivo. Guarda y sube `index.html`.

---

## 7. Mapa del proyecto (por si tienes curiosidad)

```
index.html      → la página (estructura y textos de respaldo)
styles.css      → todo el diseño (colores, tamaños, animaciones)
main.js         → las animaciones y el envío de citas por WhatsApp
.htaccess       → configuración del servidor (caché). No tocar.
lib/manifest.js → ⭐ TUS DATOS. El único archivo que necesitas editar.
assets/img/     → ⭐ TUS FOTOS.
assets/credits.json → anotaciones sobre las imágenes.
assets/photos/source/ → guarda aquí tus fotos originales si quieres (no se usa en la web).
```

Cualquier duda, lo más rápido: abre `index.html` en el navegador y comprueba
cómo queda antes de subir nada a Hostinger. Y recuerda: copia de seguridad
antes de editar. 💛
