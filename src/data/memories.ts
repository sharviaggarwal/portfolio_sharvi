import type { TechMemory } from '../types/portfolio';

/**
 * Moving Memories displayed in My Tech World.
 * To add a new memory photo:
 * 1. Drop the image inside `public/assets/memories/`.
 * 2. Append a new entry below with a short factual caption and tag.
 */
export const TECH_MEMORIES_DATA: TechMemory[] = [
  {
    id: 'fpga-nexys',
    src: '/assets/memories/fpga-nexys-artix7.jpg',
    alt: 'Digilent Nexys Xilinx Artix-7 FPGA board powered on with 7-segment display',
    caption: 'Xilinx Artix-7 FPGA Lab',
    tag: 'Hardware Roots',
    accent: 'sky',
  },
  {
    id: 'n8n-workflow',
    src: '/assets/memories/n8n-agent-canvas.jpg',
    alt: 'n8n AI Agent workflow canvas connected to OpenAI Chat Model, Simple Memory, Google Sheets, and Gmail',
    caption: 'n8n AI Agent Canvas',
    tag: 'Agentic Automation',
    accent: 'lime',
  },
  {
    id: 'vr-showcase',
    src: '/assets/memories/vr-tech-showcase.jpg',
    alt: 'Sharvi testing a VR headset at an interactive tech showcase',
    caption: 'Hands-on VR Tech Showcase',
    tag: 'Exploring Tech',
    accent: 'maroon',
  },
  {
    id: 'aws-cloud-clubs',
    src: '/assets/memories/aws-cloud-clubs-mait.jpg',
    alt: 'Sharvi presenting at the podium during the AWS Cloud Clubs MAIT Introductory Event',
    caption: 'AWS Cloud Clubs MAIT Event',
    tag: 'Leadership',
    accent: 'sky',
  },
  {
    id: 'stage-speaking',
    src: '/assets/memories/stage-speaking.jpg',
    alt: 'Sharvi speaking into stage microphones at a college auditorium podium',
    caption: 'On Stage & Community Sessions',
    tag: 'Speaker & Host',
    accent: 'lime',
  },
  {
    id: 'iit-delhi',
    src: '/assets/memories/iit-delhi-trophies.jpg',
    alt: 'Sharvi and teammates holding trophies outside Indian Institute of Technology Delhi',
    caption: 'Team Moment at IIT Delhi',
    tag: 'Milestone',
    accent: 'maroon',
  },
];
