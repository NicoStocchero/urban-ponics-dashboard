import Image from 'next/image'

export function SidebarHeader() {
  return (
    <div className="flex h-20 items-center border-b border-[var(--border)] px-6">
      <div className="flex items-center gap-3">
        <Image
          src="/urbanponicsLogoHorizontal.png"
          alt="Urban Ponics"
          width={160}
          height={40}
          priority
          className="h-auto w-40"
        />
      </div>
    </div>
  )
}
