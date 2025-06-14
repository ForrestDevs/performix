import Link from 'next/link'
import { PerformixLogoDark } from '@/components/logo'
import { Mail, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/icons'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <PerformixLogoDark />
            <p className="text-gray-400 text-sm">
              Connecting elite hockey talent with proven D1+ mentors to accelerate your path to
              success.
            </p>
            <div className="flex flex-col space-y-2">
              <Link
                href="mailto:mateo@performix.ca"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                mateo@performix.ca
              </Link>
              <Link
                href="tel:+16476256177"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                (647) 625-6177
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/performix.collective/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/performixcollective/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.tiktok.com/@mateo.dixon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TikTokIcon />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/mentors" className="hover:text-white transition-colors">
                  Find a Mentor
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Performix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
