'use client';

import React from 'react';
import Image from 'next/image';

const galleryPhotos = [
  {
    title: 'Fine Dining & Smart Tables',
    caption: 'Guests scan ambient table QR codes to view real-time menu items, wine pairings, and active specials.',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    tag: 'TABLETOP QR',
  },
  {
    title: 'POS Terminal & Cashless Billing',
    caption: 'Front-of-house staff monitor active tab settlements, split bills, and table turnover stats.',
    src: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=85',
    tag: 'POS TERMINAL',
  },
  {
    title: 'Kitchen Expediter Station',
    caption: 'Real-time WebSocket connection fires tickets by cook station, course order, and allergen tags.',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    tag: 'KDS EXPEDITE',
  },
  {
    title: 'Cocktail Bar & Lounge Flow',
    caption: 'High-turnover bar areas handle express orders without bottlenecks or payment delays.',
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    tag: 'LOUNGE ORDERS',
  },
];

export default function ScanfeastProductionGallery() {
  return (
    <section className="sf-production-gallery" style={{
      padding: '100px 32px',
      background: '#040906',
      borderTop: '1px solid rgba(0, 255, 133, 0.15)',
      borderBottom: '1px solid rgba(0, 255, 133, 0.15)',
      color: '#fff',
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00ff85',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            marginBottom: '12px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff85', boxShadow: '0 0 10px #00ff85' }} />
            03 / PRODUCTION PHOTOGRAPHY
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}>
            Designed for the <span style={{ color: '#00ff85' }}>reality of service.</span>
          </h2>
          <p style={{
            color: '#94a3b8',
            maxWidth: '640px',
            fontSize: '16px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            Scanfeast isn’t an abstract software concept. It is built to withstand loud kitchens, rush hours, split checks, and high-frequency dining service.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(8, 16, 12, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                background: '#020503',
              }}>
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(4, 9, 6, 0.85)',
                  border: '1px solid rgba(0, 255, 133, 0.4)',
                  color: '#00ff85',
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  backdropFilter: 'blur(8px)',
                }}>
                  {photo.tag}
                </div>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  margin: '0 0 8px',
                  color: '#ffffff',
                }}>
                  {photo.title}
                </h3>
                <p style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: '#8b9bb4',
                  margin: 0,
                }}>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
