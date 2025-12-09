import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}
