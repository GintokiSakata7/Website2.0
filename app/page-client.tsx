'use client';

import React from 'react';
import {
  ModernNavigation,
  VelozityHero,
  VelozityCapabilities,
  VelozityWork,
  VelozityProcess,
  VelozityEstimator,
  VelozityWhyUs,
  VelozityContact,
  ModernFooter,
} from '../components/sections';
import PageAnimationsOverlay from '../components/ui/PageAnimationsOverlay';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#0a0e0c] flex flex-col selection:bg-[#00e676] selection:text-[#063d27] relative">
      {/* Scroll Progress Bar & Ambient Spotlight Animation */}
      <PageAnimationsOverlay />

      {/* Floating Pill Navigation */}
      <ModernNavigation />

      {/* Main Experience Flow */}
      <main className="flex-1 w-full">
        {/* Spacious Velozity Hero with 3D Spline Kinetic Gemstone & 6-Pillar Interactive Grid */}
        <VelozityHero />

        {/* Full-Spectrum Studio Capabilities with Interactive Simulator */}
        <VelozityCapabilities />

        {/* Flagship Production Case Studies (ScanFeast, Quantum Arena, Ads Engine) */}
        <VelozityWork />

        {/* 4-Phase Delivery Roadmap */}
        <VelozityProcess />

        {/* Interactive Scope & Timeline Estimator */}
        <VelozityEstimator />

        {/* Studio Advantage & Founder Intro */}
        <VelozityWhyUs />

        {/* High-Converting Discovery & Consultation Form */}
        <VelozityContact />
      </main>

      {/* Luxury Studio Footer */}
      <ModernFooter />
    </div>
  );
}
