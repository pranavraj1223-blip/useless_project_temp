/**
 * CertiFate — Canvas Certificate Image Exporter
 * Renders an ultra-high-resolution (2800x2100) PNG directly via HTML5 Canvas
 * No external server or heavy library dependencies needed.
 */

window.CertiFateCanvasExporter = {
  /**
   * Renders the certificate onto a high-resolution canvas element
   * @param {Object} certData - Parsed certificate content
   * @returns {HTMLCanvasElement}
   */
  renderCertificateCanvas: function (certData) {
    const canvas = document.createElement('canvas');
    const width = 1600;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Background Fill: Rich Deep Astral Purple to Charcoal Gradient
    const bgGrad = ctx.createRadialGradient(width / 2, height * 0.3, 100, width / 2, height / 2, width * 0.7);
    bgGrad.addColorStop(0, '#1a1334');
    bgGrad.addColorStop(0.6, '#0f0b20');
    bgGrad.addColorStop(1, '#06040d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle background parchment texture / stars
    ctx.fillStyle = 'rgba(212, 175, 55, 0.03)';
    for (let i = 0; i < 400; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33) * 0.5 + 0.5) * height;
      const rad = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Outer Ornate Golden Borders
    const pad = 40;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d4af37';
    ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.strokeRect(pad + 10, pad + 10, width - (pad + 10) * 2, height - (pad + 10) * 2);

    // Corner Filigrees
    const drawCorner = (x, y, flipX, flipY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX, flipY);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 35);
      ctx.lineTo(10, 10);
      ctx.lineTo(35, 10);
      ctx.moveTo(18, 30);
      ctx.lineTo(18, 18);
      ctx.lineTo(30, 18);
      ctx.stroke();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(22, 22, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawCorner(pad + 18, pad + 18, 1, 1);
    drawCorner(width - pad - 18, pad + 18, -1, 1);
    drawCorner(pad + 18, height - pad - 18, 1, -1);
    drawCorner(width - pad - 18, height - pad - 18, -1, -1);

    // 3. Header: Bureau Crest
    const centerX = width / 2;
    ctx.save();
    ctx.translate(centerX, pad + 65);

    // Star Crest
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r = i % 2 === 0 ? 22 : 11;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // CF in Center
    ctx.fillStyle = '#fce49c';
    ctx.font = 'bold 12px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CF', 0, 1);
    ctx.restore();

    // 4. Titles
    ctx.textAlign = 'center';
    ctx.fillStyle = '#bfa76f';
    ctx.font = '600 12px "Outfit", sans-serif';
    ctx.letterSpacing = '3px';
    const ministry = certData.timeline === 'past'
      ? 'THE SUPREME ASTRAL COUNCIL OF RETROGRADE METEMPSYCHOSIS'
      : 'THE INTERGALACTIC DIRECTORATE OF CHRONO-ADVANCED DESTINIES';
    ctx.fillText(ministry, centerX, pad + 115);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Cinzel", Georgia, serif';
    const grandTitle = certData.timeline === 'past'
      ? 'CERTIFICATE OF ANCESTRAL & HISTORICAL REINCARNATION'
      : 'CERTIFICATE OF FORTHCOMING CYBER-COSMIC INCARNATION';
    ctx.fillText(grandTitle, centerX, pad + 155);

    ctx.fillStyle = '#d4af37';
    ctx.font = 'italic 13px "Cinzel", serif';
    ctx.fillText('THIS DULY ATTESTS THAT BY VIRTUE OF CELESTIAL AUDIT AND QUANTUM KARMIC LAW:', centerX, pad + 185);

    // 5. Subject Box
    const subY = pad + 208;
    const subWidth = 1000;
    const subHeight = 96;
    const subX = (width - subWidth) / 2;

    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
    ctx.fillRect(subX, subY, subWidth, subHeight);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(subX, subY, subWidth, subHeight);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#a49fc0';
    ctx.font = '600 11px "Outfit", sans-serif';
    ctx.fillText(`DESIGNATED SOUL / RECIPIENT • ${certData.timeline === 'past' ? 'HISTORICAL ERA' : 'FUTURISTIC ERA'} (${(certData.epoch || 'UNIVERSAL').toUpperCase()})`, centerX, subY + 24);

    ctx.fillStyle = '#ffd700';
    ctx.font = '900 28px "Cinzel", Georgia, serif';
    ctx.fillText((certData.name || 'ANONYMOUS SOUL').toUpperCase(), centerX, subY + 58);

    ctx.fillStyle = '#cfc9e2';
    ctx.font = '500 12px "Outfit", sans-serif';
    const metaStr = `Terrestrial Anchor: ${certData.dobFormatted || certData.dob}   •   Record: ${certData.serialNo}   •   Classification: IRREVOCABLE`;
    ctx.fillText(metaStr, centerX, subY + 82);

    // 6. Three Destiny Findings Cards
    const cardY = subY + 118;
    const cardWidth = 475;
    const cardHeight = 440;
    const gap = 26;
    const totalWidth = cardWidth * 3 + gap * 2;
    const startX = (width - totalWidth) / 2;

    const findings = [
      {
        badge: 'FACTOR I : REINCARNATION',
        icon: '🐾',
        headline: certData.reincarnation ? certData.reincarnation.headline : 'Sentient Capybara',
        key1: 'Allocated Form / Species:',
        val1: certData.reincarnation ? certData.reincarnation.species : 'Hydrochoerus hydrochaeris',
        key2: certData.timeline === 'past' ? 'Historical Realm / Haven:' : 'Futuristic Orbital Haven:',
        val2: certData.reincarnation ? certData.reincarnation.realm : 'Kingdom of Norway',
        desc: certData.reincarnation ? certData.reincarnation.desc : 'Granted peaceful sanctuary status.'
      },
      {
        badge: 'FACTOR II : GEOGRAPHICAL LOCATION',
        icon: '📍',
        headline: certData.geo ? certData.geo.headline : 'Bergen, Norway',
        key1: 'Chrono-Spatial Coordinates:',
        val1: certData.geo ? certData.geo.coordinates : '0.0000° N, 0.0000° E',
        key2: certData.timeline === 'past' ? 'Historical Epicenter:' : 'Galactic Epicenter:',
        val2: certData.geo ? certData.geo.location : 'Earth',
        desc: certData.geo ? certData.geo.desc : 'Geomagnetic coordinates locked.'
      },
      {
        badge: 'FACTOR III : SPECIES WEALTH',
        icon: '💰',
        headline: certData.wealth ? certData.wealth.tier : 'Thermal Lagoon Patriarch',
        key1: 'Projected Creature Hoard:',
        val1: certData.wealth ? certData.wealth.netWorth : '48,500 Soaked Melon Rinds',
        key2: 'Allocated Territory & Spoils:',
        val2: certData.wealth ? certData.wealth.holdings : 'Private Hot Spring Lagoon',
        desc: certData.wealth ? certData.wealth.decree : 'Decreed sovereign water rights and snacks by cosmic fortune.'
      }
    ];

    findings.forEach((f, index) => {
      const cx = startX + index * (cardWidth + gap);
      const isUltra = (index === 2 && certData.wealth && certData.wealth.isUltraRare);

      // Card Background
      if (isUltra) {
        const goldBg = ctx.createLinearGradient(cx, cardY, cx + cardWidth, cardY + cardHeight);
        goldBg.addColorStop(0, '#2d1e04');
        goldBg.addColorStop(0.5, '#170f28');
        goldBg.addColorStop(1, '#3b2505');
        ctx.fillStyle = goldBg;
        ctx.fillRect(cx, cardY, cardWidth, cardHeight);

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(cx, cardY, cardWidth, cardHeight);

        ctx.strokeStyle = 'rgba(255, 215, 0, 0.45)';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx + 4, cardY + 4, cardWidth - 8, cardHeight - 8);
      } else {
        ctx.fillStyle = 'rgba(14, 10, 28, 0.9)';
        ctx.fillRect(cx, cardY, cardWidth, cardHeight);

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx, cardY, cardWidth, cardHeight);
      }

      // Card Header
      ctx.textAlign = 'left';
      ctx.fillStyle = isUltra ? '#ffe066' : '#ffd700';
      ctx.font = 'bold 11px "Cinzel", serif';
      const badgeText = isUltra ? '✨ FACTOR III : WEALTH [ULTRA-RARE MYTHIC]' : `${f.icon} ${f.badge}`;
      ctx.fillText(badgeText, cx + 22, cardY + 36);

      // Headline
      ctx.fillStyle = isUltra ? '#ffd700' : '#ffffff';
      ctx.font = 'bold 18px "Cinzel", Georgia, serif';
      this.wrapText(ctx, f.headline, cx + 22, cardY + 68, cardWidth - 44, 24);

      // Divider
      ctx.strokeStyle = isUltra ? 'rgba(255, 215, 0, 0.45)' : 'rgba(212, 175, 55, 0.2)';
      ctx.beginPath();
      ctx.moveTo(cx + 22, cardY + 125);
      ctx.lineTo(cx + cardWidth - 22, cardY + 125);
      ctx.stroke();

      // Row 1
      ctx.fillStyle = '#8f88a8';
      ctx.font = '600 11px "Outfit", sans-serif';
      ctx.fillText(f.key1.toUpperCase(), cx + 22, cardY + 152);

      ctx.fillStyle = isUltra ? '#ffd700' : '#fce49c';
      ctx.font = '500 13px "Outfit", sans-serif';
      this.wrapText(ctx, f.val1, cx + 22, cardY + 172, cardWidth - 44, 18);

      // Row 2
      ctx.fillStyle = '#8f88a8';
      ctx.font = '600 11px "Outfit", sans-serif';
      ctx.fillText(f.key2.toUpperCase(), cx + 22, cardY + 220);

      ctx.fillStyle = index === 1 ? '#64ffda' : '#ffffff';
      ctx.font = index === 1 ? '500 12px "Space Mono", monospace' : '600 13px "Outfit", sans-serif';
      this.wrapText(ctx, f.val2, cx + 22, cardY + 240, cardWidth - 44, 18);

      // Description Box
      ctx.fillStyle = isUltra ? 'rgba(255, 215, 0, 0.08)' : 'rgba(212, 175, 55, 0.05)';
      ctx.fillRect(cx + 15, cardY + 280, cardWidth - 30, 140);
      ctx.strokeStyle = isUltra ? 'rgba(255, 215, 0, 0.35)' : 'rgba(212, 175, 55, 0.15)';
      ctx.strokeRect(cx + 15, cardY + 280, cardWidth - 30, 140);

      ctx.fillStyle = '#cfc9e2';
      ctx.font = 'italic 12px "Outfit", sans-serif';
      this.wrapText(ctx, `"${f.desc}"`, cx + 25, cardY + 310, cardWidth - 50, 20);
    });

    // 7. Footer: Wax Seal, Signatures, Barcode
    const footerY = height - pad - 180;

    // Wax Seal on the Left
    const sealX = startX + 70;
    const sealY = footerY + 70;
    const sealGrad = ctx.createRadialGradient(sealX - 15, sealY - 15, 5, sealX, sealY, 50);
    sealGrad.addColorStop(0, '#ffe066');
    sealGrad.addColorStop(0.6, '#b8860b');
    sealGrad.addColorStop(1, '#664600');

    ctx.beginPath();
    ctx.arc(sealX, sealY, 50, 0, Math.PI * 2);
    ctx.fillStyle = sealGrad;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffd700';
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#2a1a00';
    ctx.font = '900 8px "Cinzel", serif';
    ctx.fillText('BUREAU OF FATE', sealX, sealY - 16);
    ctx.font = '22px sans-serif';
    ctx.fillText('⚖️', sealX, sealY + 8);
    ctx.font = '800 8px "Cinzel", serif';
    ctx.fillText('VERIFIED', sealX, sealY + 26);

    // Signatures in the Center
    const sigCenterX = width / 2;
    ctx.textAlign = 'center';

    // Signature 1
    ctx.fillStyle = '#fce49c';
    ctx.font = 'italic 26px "Alex Brush", cursive';
    ctx.fillText('Pranav', sigCenterX - 140, footerY + 60);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sigCenterX - 240, footerY + 75);
    ctx.lineTo(sigCenterX - 40, footerY + 75);
    ctx.stroke();
    ctx.fillStyle = '#8f88a8';
    ctx.font = '600 10px "Cinzel", serif';
    ctx.fillText('LORD HIGH REGISTRAR OF METEMPSYCHOSIS', sigCenterX - 140, footerY + 95);

    // Signature 2
    ctx.fillStyle = '#fce49c';
    ctx.font = 'italic 26px "Alex Brush", cursive';
    ctx.fillText('Sreehari', sigCenterX + 140, footerY + 60);
    ctx.beginPath();
    ctx.moveTo(sigCenterX + 40, footerY + 75);
    ctx.lineTo(sigCenterX + 240, footerY + 75);
    ctx.stroke();
    ctx.fillStyle = '#8f88a8';
    ctx.font = '600 10px "Cinzel", serif';
    ctx.fillText('CHIEF GEOCODING CARTOGRAPHER', sigCenterX + 140, footerY + 95);

    // Barcode on the Right
    const barcodeX = startX + totalWidth - 170;
    ctx.fillStyle = '#ffffff';
    let bOffset = 0;
    const barWidths = [3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2, 3];
    for (let bw of barWidths) {
      ctx.fillRect(barcodeX + bOffset, footerY + 30, bw, 32);
      bOffset += bw + 3;
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = '#d4af37';
    ctx.font = '10px "Space Mono", monospace';
    ctx.fillText(certData.serialNo, barcodeX, footerY + 80);

    ctx.fillStyle = '#7a7593';
    ctx.font = '10px "Outfit", sans-serif';
    ctx.fillText(`Issued: ${new Date().toLocaleDateString()}`, barcodeX, footerY + 98);

    // Disclaimer at bottom of certificate
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8f88a8';
    ctx.fillText('Issued purely for recreational and reincarnational contemplation by the Supreme Astral Council.', centerX, height - pad - 25);

    return canvas;
  },

  /**
   * Generates a high-res PNG of the certificate data and triggers a download
   * @param {Object} certData - Parsed certificate content
   */
  exportToPng: function (certData) {
    const canvas = this.renderCertificateCanvas(certData);
    const cleanName = (certData.name || 'Soul').replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    link.download = `CertiFate_Certificate_${cleanName}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Asynchronously exports certificate as a Blob for native sharing
   * @param {Object} certData
   * @returns {Promise<{ blob: Blob, filename: string, dataUrl: string }>}
   */
  getCertificateBlob: function (certData) {
    return new Promise((resolve, reject) => {
      const canvas = this.renderCertificateCanvas(certData);
      canvas.toBlob((blob) => {
        if (blob) {
          const cleanName = (certData.name || 'Soul').replace(/[^a-zA-Z0-9_-]/g, '_');
          const filename = `CertiFate_Certificate_${cleanName}.png`;
          resolve({ blob, filename, dataUrl: canvas.toDataURL('image/png') });
        } else {
          reject(new Error('Canvas toBlob failed'));
        }
      }, 'image/png');
    });
  },

  /**
   * Helper function to wrap text neatly on HTML5 canvas
   */
  wrapText: function (ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return;
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }
};
