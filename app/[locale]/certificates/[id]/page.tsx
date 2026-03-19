import { certifications } from "@/data/certifications"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { IoIosArrowBack } from "react-icons/io"
import { GoArrowUpRight } from "react-icons/go"
import { getTranslations } from "next-intl/server"

interface PageProps {
  params: Promise<{ id: string; locale: string }>
}

export async function generateStaticParams() {
  return certifications.map((c) => ({ id: c.credential_id }))
}

export default async function CertificatePage({ params }: PageProps) {
  const { id, locale } = await params
  const t = await getTranslations('certificate')

  const cert = certifications.find((c) => c.credential_id === id)
  if (!cert) notFound()

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      <header className="flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/10">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 text-base font-mono"
        >
          <IoIosArrowBack />
          {t('backToPortfolio')}
        </Link>

        <div className="text-white/70 text-xs uppercase tracking-[0.3em] font-mono">
          {t('certificateLabel')}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-0">

        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsla(45, 65%, 52%, 0.06) 0%, transparent 65%)" }}
          />

          <div className="relative w-full max-w-3xl rounded overflow-hidden shadow-2xl border border-white/10"
            style={{ boxShadow: "0 0 3.75rem hsla(45, 65%, 52%, 0.12), 0 1.5rem 5rem hsla(0, 0%, 0%, 0.8)" }}
          >
            {cert.source ? (
              <Image
                src={`/${cert.source}`}
                alt={cert.name}
                width={1200}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 70vw"
                quality={95}
                className="w-full h-auto bg-[hsl(0,0%,5%)]"
                priority
              />
            ) : (
              <iframe src={cert.url} className="w-full aspect-video border-0 bg-[#0d0d0d]" title={cert.name} />
            )}

            <div className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 2.5rem hsla(0, 0%, 0%, 0.4)" }}
            />
          </div>
        </div>

        <aside className="w-full lg:w-96 xl:w-105 flex flex-col justify-center gap-8 px-8 lg:px-12 py-10 border-t lg:border-t-0 lg:border-l border-white/10">

          <div className="flex items-center gap-4">
            <div className="shrink-0 w-16 h-16 flex items-center justify-center">
              {cert.organization_image ? (
                <Image
                  src={`/${cert.organization_image}`}
                  alt={cert.issuing_organization}
                  width={64}
                  height={64}
                  quality={95}
                  className="object-contain"
                />
              ) : (
                <span className="text-yellow-400 font-bold text-lg">{cert.issuing_organization[0]}</span>
              )}
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-mono mb-1">{t('issuedBy')}</p>
              <p className="text-white/80 text-lg font-medium">{cert.issuing_organization}</p>
            </div>
          </div>

          <div className="w-12 h-px bg-linear-to-r from-yellow-400/30 to-transparent" />

          <div>
            <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-3 font-mono">{t('certificate')}</p>
            <h1 className="text-white text-3xl xl:text-4xl leading-tight">
              {cert.name}
            </h1>
          </div>

          {cert.description && cert.description !== cert.issuing_organization && (
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2 font-mono">{t('about')}</p>
              <p className="text-white/80 text-base leading-relaxed">{cert.description}</p>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-1 font-mono">{t('issueDate')}</p>
              <p className="text-white/80 text-base">{cert.issue_date}</p>
            </div>

            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-1 font-mono">{t('credentialId')}</p>
              <p className="text-white/70 text-sm font-mono break-all">{cert.credential_id}</p>
            </div>
          </div>

          <a className="mt-2 flex items-center justify-center gap-2 w-full py-4 border border-yellow-400/30 text-yellow-300/70 hover:bg-yellow-400/10 hover:text-yellow-200 hover:border-yellow-400/60 transition-all duration-300 rounded-sm text-sm uppercase tracking-widest font-mono"
            href={cert.url} target="_blank" rel="noopener noreferrer"
          >
            <GoArrowUpRight className="w-6 h-6" />
            {t('verify')}
          </a>
        </aside>
      </main>
    </div>
  )
}