export const COLORS = {
  brand: {
    light: {
      primary: '#0f766e',
      primaryHover: '#115e59',
      muted: 'rgba(15, 118, 110, 0.12)',
      onPrimary: '#ffffff',
    },
    dark: {
      primary: '#2dd4bf',
      primaryHover: '#5eead4',
      muted: 'rgba(45, 212, 191, 0.14)',
      onPrimary: '#042f2e',
    },
  },
  gradient: {
    light: {
      primary: ['#115e59', '#0f766e', '#14b8a6'] as const,
      income: ['#047857', '#059669', '#10b981'] as const,
      expense: ['#b91c1c', '#dc2626', '#ef4444'] as const,
      balance: ['#1e3a5f', '#164e63', '#0f766e'] as const,
      card: ['#f8fafc', '#f1f5f9'] as const,
    },
    dark: {
      primary: ['#134e4a', '#0f766e', '#0d9488'] as const,
      income: ['#065f46', '#047857', '#059669'] as const,
      expense: ['#7f1d1d', '#991b1b', '#b91c1c'] as const,
      balance: ['#070b12', '#0f1729', '#134e4a'] as const,
      card: ['#18181b', '#1f1f23'] as const,
    },
  },

  income: {
    light: '#047857',
    dark: '#34d399',
    bg: { light: '#ecfdf5', dark: 'rgba(16, 185, 129, 0.12)' },
  },
  expense: {
    light: '#c2410c',
    dark: '#fb923c',
    bg: { light: '#fff7ed', dark: 'rgba(248, 113, 113, 0.12)' },
  },

  category: {
    red: {
      light: '#c43530',
      dark: '#f87171',
      bg: { light: '#fef2f2', dark: 'rgba(220, 38, 38, 0.14)' },
    },
    orange: {
      light: '#c2410c',
      dark: '#fdba74',
      bg: { light: '#fff7ed', dark: 'rgba(234, 88, 12, 0.14)' },
    },
    yellow: {
      light: '#a16207',
      dark: '#facc15',
      bg: { light: '#fefce8', dark: 'rgba(202, 138, 4, 0.14)' },
    },
    green: {
      light: '#15803d',
      dark: '#4ade80',
      bg: { light: '#f0fdf4', dark: 'rgba(34, 197, 94, 0.14)' },
    },
    blue: {
      light: '#1d4ed8',
      dark: '#60a5fa',
      bg: { light: '#eff6ff', dark: 'rgba(59, 130, 246, 0.14)' },
    },
    purple: {
      light: '#6d28d9',
      dark: '#a78bfa',
      bg: { light: '#f5f3ff', dark: 'rgba(139, 92, 246, 0.14)' },
    },
    pink: {
      light: '#be185d',
      dark: '#f472b6',
      bg: { light: '#fdf2f8', dark: 'rgba(236, 72, 153, 0.14)' },
    },
    teal: {
      light: '#0f766e',
      dark: '#2dd4bf',
      bg: { light: '#f0fdfa', dark: 'rgba(20, 184, 166, 0.14)' },
    },
  },

  surface: {
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#e2e8f0',
    },
    dark: {
      primary: '#09090b',
      secondary: '#18181b',
      tertiary: '#27272a',
      elevated: '#3f3f46',
    },
  },

  text: {
    light: {
      primary: '#18181b',
      secondary: '#52525b',
      tertiary: '#a1a1aa',
      inverse: '#fafafa',
    },
    dark: {
      primary: '#fafafa',
      secondary: '#d4d4d8',
      tertiary: '#71717a',
      inverse: '#18181b',
    },
  },

  tabBar: {
    light: {
      bg: '#ffffff',
      active: '#0f766e',
      inactive: '#71717a',
      border: '#e4e4e7',
    },
    dark: {
      bg: '#09090b',
      active: '#2dd4bf',
      inactive: '#71717a',
      border: '#27272a',
    },
  },
} as const;

export type CategoryColorName = keyof typeof COLORS.category;

export function getCategoryColor(
  name: string,
  isDark: boolean
): { color: string; bg: string } {
  const key = name as CategoryColorName;
  const entry = COLORS.category[key] ?? COLORS.category.teal;
  return {
    color: isDark ? entry.dark : entry.light,
    bg: isDark ? entry.bg.dark : entry.bg.light,
  };
}
