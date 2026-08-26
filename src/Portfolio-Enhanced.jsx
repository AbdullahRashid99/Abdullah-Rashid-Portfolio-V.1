// Portfolio.jsx (With Right-Click Protection, Abdullah Rashid Watermark,
// improved RESULTS touch/scroll behavior and in-modal gallery navigation
// Updates per user: modal browses all images across 3 rows, arrows/X fixed for desktop,
// auto-scroll resumes after 3s of inactivity, hold-for-3s resumes, row-specific modal sizing,
// certificates modal supports swipe between certs.

import React, { useState, useEffect, useRef } from 'react';

import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify,
  HelpCircle,
  Users,
  Layers,
  BarChart2,
  MoreHorizontal,
  ChevronLeft, ChevronRight
} from 'lucide-react';

import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';

// Import SocialCircle component (keep your path)
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Global Protection Styles ---
const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none', // Disables long-press menu on iOS
  WebkitUserSelect: 'none',
};

// --- Watermark Component (Abdullah Rashid) ---
