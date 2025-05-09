'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { Bars3Icon } from '@heroicons/react/20/solid'
import MobileMenu from './MobileMenu'

// Define the menu items in one place
export const navigationItems = [
  { name: 'Trainingen', href: '#trainings' },
  { name: 'Offerte aanvragen', href: '#lead-form' },
  { name: 'FAQ', href: '#faq' }
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const bodyOverflowRef = useRef<string | null>(null)

  // Handle body overflow in a bfcache-friendly way
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current overflow value
      bodyOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      // Restore previous overflow value
      document.body.style.overflow = bodyOverflowRef.current || ''
    }
    
    return () => {
      // Cleanup: restore original overflow value
      document.body.style.overflow = bodyOverflowRef.current || ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ph-900/80 border-b border-ph-800/50">
        <div className="w-section-xl py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-white p-1"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>

              <a href="/" className="flex items-center text-white">
                <Logo textSize="xl" />
              </a>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-white hover:text-ph-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/login" className="px-5 py-2.5 text-sm font-medium bg-ph-800 hover:bg-ph-600 text-white rounded-lg transition-all">
                Log in
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile menu component outside header for proper z-indexing */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  )
}

export default Header 