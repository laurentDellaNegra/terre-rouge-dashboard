import Layout from '../components/layout'
import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import getStatus from '../lib/status'
import { User } from '../types/User'
import clsx from 'clsx'
import ShopifyIcon from '../components/icons/ShopifyIcon'
import AlgoliaIcon from '../components/icons/AlgoliaIcon'
import TrustpilotIcon from '../components/icons/TrustpilotIcon'
import GAIcon from '../components/icons/GAIcon'
import MetaIcon from '../components/icons/MetaIcon'
import MailchimpIcon from '../components/icons/MailchimpIcon'
import LaPosteIcon from '../components/icons/LaPosteIcon'
import PaypalIcon from '../components/icons/PaypalIcon'
import StripeIcon from '../components/icons/StripeIcon'
import VercelIcon from '../components/icons/VercelIcon'
import RailwayIcon from '../components/icons/RailwayIcon'
import Auth0Icon from '../components/icons/Auth0Icon'
import OVHIcon from '../components/icons/OVHIcon'
import HelloBankIcon from '../components/icons/HelloBankIcon'
import FigmaIcon from '../components/icons/FigmaIcon'

// Missing:
// https://cron-job.org/
// facebook, insta, linkedin, tiktok
// google

const actions = [
  {
    icon: ShopifyIcon,
    name: 'Shopify',
    href: 'https://terre-rouge-boutique.myshopify.com/admin',
    description:
      'Pour la gestion des produits, commandes, stocks, etc. Nous utilisons shopify en mode Headless CMS.',
  },
  {
    icon: LaPosteIcon,
    name: 'Collisimo',
    href: 'https://www.laposte.fr/professionnel/tableau-de-bord',
    description: 'Transporteur de colis',
  },
  {
    icon: TrustpilotIcon,
    name: 'Trustpilot',
    href: 'https://businessapp.b2b.trustpilot.com/dashboard',
    description:
      "Nos avis certifiés. un mail d'envoi automatique est configuré apres une commande.",
  },
  {
    icon: HelloBankIcon,
    name: 'Banque',
    href: 'https://www.hellobank.fr/',
    description: 'Compte bancaire de Terre Rouge',
  },
  {
    icon: PaypalIcon,
    name: 'Paypal',
    href: 'https://www.paypal.com/myaccount/summary',
    description: 'Paiement paypal sur Shopify',
  },
  {
    icon: StripeIcon,
    name: 'Stripe',
    href: 'https://dashboard.stripe.com/',
    description: 'Paiement par CB sur Shopify',
  },
  {
    icon: AlgoliaIcon,
    name: 'Algolia',
    href: 'https://www.algolia.com/',
    description:
      "Moteur de recherche des produits. Lors de l'ajout/modification d'un produit il faut relancer un script pour synchroniser les produits sur Algolia",
  },
  {
    icon: GAIcon,
    name: 'Google analytics',
    href: 'https://analytics.google.com/analytics/web/',
    description: 'Les analytics générales du site.',
  },
  {
    icon: MetaIcon,
    name: 'Gestionnaire Pub',
    href: 'https://business.facebook.com/adsmanager',
    description: 'Pixel facebook pour gérer la pub sur les reseaux sociaux Meta',
  },
  {
    icon: MailchimpIcon,
    name: 'Newsletter',
    href: 'https://mailchimp.com/',
    description: 'Gestion (future) de la newsletter',
  },
  {
    icon: VercelIcon,
    name: 'Vercel',
    href: 'https://vercel.com/dashboard',
    description: 'Déploiement du front',
  },
  {
    icon: RailwayIcon,
    name: 'Railway',
    href: 'https://railway.app/dashboard',
    description: 'Plateforme de déploiement de ce dashboard',
  },
  {
    icon: Auth0Icon,
    name: 'Authent dashboard',
    href: 'https://manage.auth0.com/dashboard',
    description: 'Authentification du dashboard',
  },
  {
    icon: OVHIcon,
    name: 'Domain management',
    href: 'https://www.ovh.com/manager/#/hub',
    description: 'Gestion des noms de domaine',
  },
  {
    icon: FigmaIcon,
    name: 'Design',
    href: 'https://www.figma.com/file/ZPaISlA0sMryYWfrFAwDap/Terre-Rouge?node-id=0%3A1&t=RFYNDqX2Kaok0Os1-0',
    description: 'Design du site',
  },
]

type HomeProps = {
  user: Claims | undefined | null
  status: string
}

export default function Home({ user, status }: HomeProps) {
  return (
    <Layout title="Dashboard" user={user as User} status={status}>
      <section aria-labelledby="quick-links-title">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          <h2 className="sr-only" id="quick-links-title">
            Quick links
          </h2>
          {actions.map((action, actionIdx) => (
            <div
              key={action.name}
              className={clsx(
                actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                actionIdx === actions.length - 1
                  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                  : '',
                'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
              )}
            >
              <div>
                <span className={clsx('rounded-lg inline-flex p-3 ring-4 ring-white')}>
                  <action.icon className="h-8 w-auto" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href={action.href} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.name}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">{action.description}</p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const session = getSession(req, res)
    const status = await getStatus(req, res)
    return { props: { user: session?.user, status } }
  },
})
