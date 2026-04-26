import Link from 'next/link'
import ProductIcon from './ProductIcon'

interface Props {
  icon?: string
  title: string
  description?: string
  cta?: { label: string; href: string }
  variant?: 'default' | 'compact'
}

export default function EmptyState({
  icon = 'box',
  title,
  description,
  cta,
  variant = 'default',
}: Props) {
  const compact = variant === 'compact'

  return (
    <div
      className={`text-center ${compact ? 'py-10' : 'py-16 lg:py-20'} px-6`}
    >
      {/* Icon — slightly tilted, gradient bg */}
      <div
        className={`relative inline-flex items-center justify-center mb-5 ${
          compact ? 'w-14 h-14' : 'w-20 h-20'
        }`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 rotate-6" />
        <div className="relative rounded-2xl bg-white border border-purple-100 w-full h-full flex items-center justify-center shadow-soft">
          <ProductIcon
            name={icon}
            className={`text-purple-500 ${compact ? 'w-6 h-6' : 'w-9 h-9'}`}
          />
        </div>
      </div>

      <h3 className={`font-bold text-gray-900 ${compact ? 'text-base' : 'text-xl'}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-gray-500 mx-auto max-w-md mt-2 ${compact ? 'text-xs' : 'text-sm'}`}>
          {description}
        </p>
      )}

      {cta && (
        <Link
          href={cta.href}
          className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-button transition-colors ${
            compact ? 'text-xs' : 'text-sm'
          }`}
        >
          {cta.label}
        </Link>
      )}
    </div>
  )
}
