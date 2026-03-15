import { certifications } from "@/data/certifications"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { IoIosArrowBack } from "react-icons/io"
import { GoArrowUpRight } from "react-icons/go"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return certifications.map((c) => ({ id: c.credential_id }))
}

export default async function CertificatePage({ params }: PageProps) {
  const { id } = await params
  const cert = certifications.find((c) => c.credential_id === id)
  if (!cert) notFound()

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      <header className="flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 text-base font-mono"
        >
          <IoIosArrowBack />
          Back to portfolio
        </Link>

        <div className="text-white/70 text-xs uppercase tracking-[0.3em] font-mono">
          Certificate
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-0">

        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 65%)" }}
          />

          <div className="relative w-full max-w-3xl aspect-[1.414/1] rounded overflow-hidden shadow-2xl border border-white/10"
            style={{ boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 24px 80px rgba(0,0,0,0.8)" }}
          >
            {cert.source ? (
              <Image
                src={`/${cert.source}`}
                alt={cert.name}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                quality={95}
                className="object-contain bg-[#0d0d0d]"
                priority
              />
            ) : (
              <iframe src={cert.url} className="w-full h-full border-0 bg-[#0d0d0d]" title={cert.name} />
            )}

            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)" }} />
          </div>
        </div>

        <aside className="w-full lg:w-96 xl:w-105 flex flex-col justify-center gap-8 px-8 lg:px-12 py-10 border-t lg:border-t-0 lg:border-l border-white/10">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {cert.organization_image ? (
                <Image
                  src={`/${cert.organization_image}`}
                  alt={cert.issuing_organization}
                  width={56}
                  height={56}
                  quality={95}
                  className="object-contain"
                />
              ) : (
                <span className="text-yellow-400 font-bold text-lg">{cert.issuing_organization[0]}</span>
              )}
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-mono mb-1">Issued by</p>
              <p className="text-white/80 text-lg font-medium">{cert.issuing_organization}</p>
            </div>
          </div>

          <div className="w-12 h-px bg-linear-to-r from-yellow-400/30 to-transparent" />

          <div>
            <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-3 font-mono">Certificate</p>
            <h1 className="text-white text-3xl xl:text-4xl leading-tight ">
              {cert.name}
            </h1>
          </div>

          {cert.description && cert.description !== cert.issuing_organization && (
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2 font-mono">About</p>
              <p className="text-white/80 text-base leading-relaxed">{cert.description}</p>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-1 font-mono">Issue date</p>
              <p className="text-white/80 text-base">{cert.issue_date}</p>
            </div>

            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-1 font-mono">Credential ID</p>
              <p className="text-white/70 text-sm font-mono break-all">{cert.credential_id}</p>
            </div>
          </div>

          <a className="mt-2 flex items-center justify-center gap-2 w-full py-4 border border-yellow-400/30 text-yellow-300/70 hover:bg-yellow-400/10 hover:text-yellow-200 hover:border-yellow-400/60 transition-all duration-300 rounded-sm text-sm uppercase tracking-widest font-mono"
            href={cert.url} target="_blank" rel="noopener noreferrer" 
          >
            <GoArrowUpRight className="w-6 h-6"/>
            Verify certificate
          </a>
        </aside>
      </main>
    </div>
  )
}