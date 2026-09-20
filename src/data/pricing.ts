export interface PlanLimit {
  label: string;
  value: string;
}

export interface FeatureGroup {
  category: string;
  items: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in INR. null means custom pricing. */
  priceMonthly: number | null;
  popular?: boolean;
  /** Lower plan name whose features are fully included, e.g. "Starter". */
  includesFrom?: string;
  limits: PlanLimit[];
  featureGroups: FeatureGroup[];
  ctaLabel: string;
}

export interface PricingAddon {
  id: string;
  name: string;
  priceMonthly: number;
  description: string;
  features: string[];
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDistinction {
  name: string;
  direction: string;
  purpose: string;
  steps: string[];
}

export interface PricingConfig {
  productName: string;
  currency: string;
  /** Fraction discount applied when billing annually, e.g. 0.2 = 20% off. */
  annualDiscount: number;
  usageDisclaimer: string;
  unlimitedCampaignsNote: string;
  plans: PricingPlan[];
  addons: PricingAddon[];
  faq: FaqItem[];
  voiceBot: ProductDistinction;
  callingAgent: ProductDistinction;
}

export const pricingConfig: PricingConfig = {
  productName: 'Gyan VaniAi',
  currency: 'INR',
  annualDiscount: 0.2,

  usageDisclaimer:
    'Voice, calling, WhatsApp messaging, email delivery and AI usage include the allowances shown above. Additional usage may be charged separately depending on the service and provider.',

  unlimitedCampaignsNote:
    'Unlimited WhatsApp campaigns means unlimited campaign creation — not unlimited messages. Meta/provider messaging charges apply separately.',

  plans: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Small businesses starting with CRM, WhatsApp and AI.',
      priceMonthly: 1999,
      limits: [
        { label: 'Team Members', value: '3' },
        { label: 'Contacts', value: '5,000' },
        { label: 'Emails', value: '2,000/mo' },
        { label: 'Tickets', value: '200/mo' },
        { label: 'WhatsApp Campaigns', value: '2/mo' },
        { label: 'AI/RAG Interactions', value: '2,000/mo' },
        { label: 'Voice Bot Assistant', value: '100 min/mo' },
        { label: 'AI Calling Agent', value: 'Not included' },
        { label: 'Virtual Numbers', value: '1' },
      ],
      featureGroups: [
        {
          category: 'Core Platform',
          items: ['Unified Inbox', 'WhatsApp', 'WebChat', 'Contact Management', 'Kanban Sales Pipeline'],
        },
        {
          category: 'AI & Knowledge',
          items: ['AI RAG Knowledge Base', 'AI Chatbot', 'Basic Voice Bot Assistant'],
        },
        {
          category: 'Campaigns',
          items: ['WhatsApp API', 'WhatsApp Broadcast Campaigns', 'Email Campaign Studio'],
        },
        {
          category: 'Automation & Analytics',
          items: ['Basic Automation', 'Basic Analytics'],
        },
      ],
      ctaLabel: 'Get Started',
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'Growing sales and support teams.',
      priceMonthly: 4999,
      popular: true,
      includesFrom: 'Starter',
      limits: [
        { label: 'Team Members', value: '10' },
        { label: 'Contacts', value: '25,000' },
        { label: 'Emails', value: '10,000/mo' },
        { label: 'Tickets', value: '1,000/mo' },
        { label: 'WhatsApp Campaigns', value: '10/mo' },
        { label: 'AI/RAG Interactions', value: '10,000/mo' },
        { label: 'Voice Bot Assistant', value: '500 min/mo' },
        { label: 'AI Calling Agent', value: '250 min/mo' },
        { label: 'Virtual Numbers', value: '1' },
      ],
      featureGroups: [
        {
          category: 'Analytics & Automation',
          items: ['Advanced Analytics', 'Advanced Automation', 'Advanced Lead Segmentation', 'AI Workflows'],
        },
        {
          category: 'WhatsApp & Payments',
          items: ['WhatsApp Payments'],
        },
        {
          category: 'Calling Agent',
          items: ['AI Calling Agent', 'Call Recording', 'Call Transcription', 'AI Call Summary', 'CRM Call Integration'],
        },
        {
          category: 'Developer & Branding',
          items: ['API', 'Webhooks', 'Custom Branding'],
        },
      ],
      ctaLabel: 'Get Started',
    },
    {
      id: 'scale',
      name: 'Scale',
      tagline: 'High-volume businesses.',
      priceMonthly: 9999,
      includesFrom: 'Growth',
      limits: [
        { label: 'Team Members', value: '30' },
        { label: 'Contacts', value: '100,000' },
        { label: 'Emails', value: '50,000/mo' },
        { label: 'Tickets', value: 'Unlimited' },
        { label: 'WhatsApp Campaigns', value: 'Unlimited*' },
        { label: 'AI/RAG Interactions', value: '50,000/mo' },
        { label: 'Voice Bot Assistant', value: '2,000 min/mo' },
        { label: 'AI Calling Agent', value: '1,000 min/mo' },
        { label: 'Virtual Numbers', value: '3' },
      ],
      featureGroups: [
        {
          category: 'Voice & Calling',
          items: ['Multiple AI Voice Assistants', 'Multiple Calling Agents', 'Advanced IVR', 'Call Routing', 'Advanced Call Analytics'],
        },
        {
          category: 'Automation & Reports',
          items: ['Advanced AI Automation', 'Advanced Reports'],
        },
        {
          category: 'Developer & Infrastructure',
          items: ['API Access', 'Webhooks', 'Custom Domain'],
        },
        {
          category: 'Security & Support',
          items: ['Audit Logs', 'Priority Support'],
        },
      ],
      ctaLabel: 'Get Started',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'All usage limits configurable for your volume.',
      priceMonthly: null,
      includesFrom: 'Scale',
      limits: [
        { label: 'Team Members', value: 'Custom' },
        { label: 'Contacts', value: 'Custom' },
        { label: 'Emails', value: 'Custom' },
        { label: 'Tickets', value: 'Custom' },
        { label: 'WhatsApp Campaigns', value: 'Custom' },
        { label: 'AI/RAG Interactions', value: 'Custom' },
        { label: 'Voice Bot Assistant', value: 'Custom' },
        { label: 'AI Calling Agent', value: 'Custom' },
        { label: 'Virtual Numbers', value: 'Multiple' },
      ],
      featureGroups: [
        {
          category: 'Custom Usage',
          items: ['Custom Team Members', 'Custom Contacts', 'Custom Email Volume', 'Custom AI Usage', 'Custom WhatsApp Usage', 'Custom Voice Usage', 'Custom Calling Agent Usage'],
        },
        {
          category: 'Security & Access',
          items: ['SSO/SAML', 'Advanced RBAC', 'Audit Logs'],
        },
        {
          category: 'Support & Onboarding',
          items: ['SLA', 'Dedicated Support', 'Custom Onboarding', 'Migration Assistance'],
        },
        {
          category: 'Platform',
          items: ['Custom Integrations', 'Dedicated Infrastructure Option', 'Full White-label'],
        },
      ],
      ctaLabel: 'Contact Sales',
    },
  ],

  addons: [
    {
      id: 'calling-agent',
      name: 'AI Calling Agent Add-on',
      priceMonthly: 999,
      description: 'Add outbound AI calling to your plan without a full upgrade.',
      features: [
        '1 Calling Agent',
        '1 virtual number',
        '250 calling minutes',
        'Call recording',
        'Transcription',
        'AI call summary',
        'CRM integration',
      ],
      note: 'Additional usage is billed separately.',
    },
    {
      id: 'voice-bot',
      name: 'Voice Bot Add-on',
      priceMonthly: 499,
      description: 'Add an inbound AI voice assistant to your plan.',
      features: [
        '1 Voice Bot Assistant',
        '100 minutes',
        'RAG integration',
        'Call history',
        'Basic transcription',
      ],
      note: 'Additional usage is billed separately.',
    },
  ],

  faq: [
    {
      question: 'Is WhatsApp messaging included?',
      answer:
        'The platform includes WhatsApp functionality and campaign capabilities. Applicable Meta/provider messaging charges may be separate.',
    },
    {
      question: 'Are voice calls unlimited?',
      answer:
        'No. Plans include the specified voice-minute allowance. Additional usage may be charged.',
    },
    {
      question: 'What is Voice Bot Assistant?',
      answer:
        'Voice Bot Assistant handles inbound customer conversations using AI, RAG knowledge and CRM integration — it answers calls, resolves questions, creates tickets and leads, and transfers to a human when required.',
    },
    {
      question: 'What is Calling Agent?',
      answer:
        'AI Calling Agent performs configured business calling workflows such as lead qualification and follow-up, subject to applicable laws, consent requirements and provider policies.',
    },
    {
      question: 'Can I buy Calling Agent without upgrading?',
      answer:
        'Yes. The AI Calling Agent add-on lets you add outbound calling to your current plan where supported, without moving to a higher plan.',
    },
    {
      question: 'What happens when I reach my limit?',
      answer:
        "You'll see clear options to upgrade your plan, buy an add-on, or continue with configured overage usage where available — you'll never be blocked without an explanation.",
    },
    {
      question: 'Can I change my plan?',
      answer:
        'Yes. You can upgrade or downgrade your plan at any time, and changes apply to future billing cycles.',
    },
    {
      question: 'Can I cancel?',
      answer:
        'Yes, you can cancel according to the subscription terms.',
    },
  ],

  voiceBot: {
    name: 'Voice Bot Assistant',
    direction: 'Inbound',
    purpose: 'Inbound AI customer assistant. A customer calls your business — the Voice Bot:',
    steps: [
      'Answers the call',
      'Understands the customer',
      'Uses RAG knowledge',
      'Answers questions',
      'Creates tickets & leads',
      'Updates CRM',
      'Transfers to a human when required',
    ],
  },

  callingAgent: {
    name: 'AI Calling Agent',
    direction: 'Outbound',
    purpose: 'AI-powered business calling. A lead enters your CRM — the Calling Agent:',
    steps: [
      'Calls the lead',
      'Introduces the business',
      'Qualifies the lead',
      'Asks configured questions',
      'Handles permitted follow-up',
      'Books appointments',
      'Updates CRM & records the outcome',
    ],
  },
};
