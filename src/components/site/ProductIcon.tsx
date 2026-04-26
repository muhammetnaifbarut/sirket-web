import React from 'react'
import * as Lucide from 'lucide-react'

/**
 * Single source of truth for icons across the entire site.
 * Always Lucide outline (stroke-width: 2) — no mixing with other libraries.
 *
 * Add new icon names here as needed. Maps short string keys (used in DB)
 * to Lucide React components.
 */
const ICONS: Record<string, React.ComponentType<any>> = {
  // Common
  box: Lucide.Box,
  package: Lucide.Package,
  globe: Lucide.Globe,
  star: Lucide.Star,
  heart: Lucide.Heart,
  shield: Lucide.Shield,
  bell: Lucide.Bell,
  mail: Lucide.Mail,
  phone: Lucide.Phone,
  settings: Lucide.Settings,
  search: Lucide.Search,
  check: Lucide.Check,
  x: Lucide.X,

  // Calendar / Time
  calendar: Lucide.Calendar,
  clock: Lucide.Clock,

  // People / CRM
  users: Lucide.Users,
  user: Lucide.User,
  briefcase: Lucide.Briefcase,
  contact: Lucide.Contact,

  // Charts / Analytics
  'chart-bar': Lucide.BarChart3,
  'bar-chart': Lucide.BarChart2,
  'trending-up': Lucide.TrendingUp,
  'pie-chart': Lucide.PieChart,
  activity: Lucide.Activity,

  // Money / Finance
  'dollar-sign': Lucide.DollarSign,
  wallet: Lucide.Wallet,
  receipt: Lucide.Receipt,

  // Commerce
  'shopping-cart': Lucide.ShoppingCart,
  'shopping-bag': Lucide.ShoppingBag,
  store: Lucide.Store,
  truck: Lucide.Truck,

  // Communication
  megaphone: Lucide.Megaphone,
  'message-circle': Lucide.MessageCircle,

  // Documents / Files
  'file-text': Lucide.FileText,
  file: Lucide.File,
  folder: Lucide.Folder,
  book: Lucide.Book,
  'book-open': Lucide.BookOpen,

  // Tools / System
  cpu: Lucide.Cpu,
  zap: Lucide.Zap,
  target: Lucide.Target,
  rocket: Lucide.Rocket,
  database: Lucide.Database,
  code: Lucide.Code2,

  // Project management
  kanban: Lucide.Trello,
  'check-square': Lucide.CheckSquare,
  layers: Lucide.Layers,

  // Help / Support
  'life-buoy': Lucide.LifeBuoy,
  'help-circle': Lucide.HelpCircle,

  // Sectors
  hospital: Lucide.Hospital,
  graduation: Lucide.GraduationCap,
  factory: Lucide.Factory,
  building: Lucide.Building2,
}

interface Props {
  name: string
  className?: string
  style?: React.CSSProperties
  strokeWidth?: number
}

export default function ProductIcon({
  name,
  className = 'w-5 h-5',
  style,
  strokeWidth = 2,
}: Props) {
  const Icon = ICONS[name] || Lucide.Box
  return <Icon className={className} style={style} strokeWidth={strokeWidth} />
}

// Export icon name list for admin pickers
export const AVAILABLE_ICONS = Object.keys(ICONS)
