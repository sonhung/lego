import ProgressBar from '@badrap/bar-of-progress'
import { polyfill } from 'interweave-ssr'
import Head from 'next/head'
import Router from 'next/router'
import '@/styles/globals.css'

polyfill()
const progress = new ProgressBar({
  size: 1,
  color: 'var(--primary)',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

const Noop = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Lego</title>
      </Head>
        <div className="font-sans">
          <Layout>
            <Component {...pageProps} />
          </Layout>        </div>
    </>
  )
}
