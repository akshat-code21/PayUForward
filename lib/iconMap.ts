import {
  Wallet,
  Laptop,
  TrendingUp,
  PlusCircle,
  Utensils,
  Car,
  Home,
  Zap,
  Film,
  Heart,
  ShoppingBag,
  DollarSign,
  CreditCard,
  type LucideIcon,
} from 'lucide-react-native';

const ICON_MAP: Record<string, LucideIcon> = {
  wallet: Wallet,
  laptop: Laptop,
  'trending-up': TrendingUp,
  'plus-circle': PlusCircle,
  utensils: Utensils,
  car: Car,
  home: Home,
  zap: Zap,
  film: Film,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  'dollar-sign': DollarSign,
  'credit-card': CreditCard,
};

export function getCategoryIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? DollarSign;
}

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);
