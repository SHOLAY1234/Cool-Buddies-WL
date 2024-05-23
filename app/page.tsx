'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useCallback } from "react"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const Home = () => {
  const [wallet, setWallet] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const getEligibility = useCallback(async (address: string) => {
    const jsonRes = await fetch('api/get-whitelist?address=' + address, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': "application/json"
      }
    })

    const res = await jsonRes.json()
    return res ?? false
  }, [])

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Wendy+One&display=swap');

        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-image: url('/BGwl.png');
          background-size: cover;
          background-position: center;
          filter: brightness(45%);
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          position: relative;
        }

        .wendy-one {
          font-family: 'Wendy One';
        }

        .toast-message {
          background: #A87612 !important;
          color: #fff !important;
          font-family: 'Wendy One' !important;
          font-size: large !important;
        }

        .toast-progress {
          background: #D03714 !important;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          position: relative;
        }

        @media (max-width: 640px) {
          .container {
            gap: 10px;
          }
        }

        .title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          position: relative;
          text-align: center;
        }

        .eligibility-text {
          margin-left: 10px;
        }

        .menu-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1001;
        }

        .menu-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 24px;
          width: 30px;
        }

        .menu-button span {
          background: #D03714;
          height: 3px;
          width: 100%;
          transition: all 0.3s;
        }

        .menu-button.open span:nth-child(1) {
          transform: translateY(10px) rotate(45deg);
        }

        .menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .menu-button.open span:nth-child(3) {
          transform: translateY(-10px) rotate(-45deg);
        }

        .menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 60px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          width: 200px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          opacity: ${menuOpen ? '1' : '0'};
          transform: ${menuOpen ? 'translateX(0)' : 'translateX(100%)'};
          transition: all 0.3s;
        }

        .menu a {
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          width: 100%;
          text-align: center;
          transition: background 0.3s;
          font-family: 'Wendy One';
        }

        .menu a:hover {
          background: #A87612;
        }

        .logo-container {
          position: fixed;
          top: 20px;
          left: 40px; /* Adjusted left position */
          z-index: 1001;
          border-radius: 20%;
          overflow: hidden;
        }
        
      `}</style>

      <main className="relative max-w-6xl">
        <div className="background-container"></div>
        <div className="logo-container">
          <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
        </div>
        <div className="menu-container">
          <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`menu ${menuOpen ? 'open' : ''}`} >
            <Link href="https://pitch.com/v/copy-of-residium-pitch-deck-p6c3tb" onClick={toggleMenu} target="_blank" >Pitch Deck</Link>
            <Link href="https://x.com/ResidiumFinance" onClick={toggleMenu} target="_blank" >Twitter</Link>
            <Link href="https://discord.com/invite/CWwaC2Gpsu" onClick={toggleMenu} target="_blank" >Discord</Link>
          </div>
        </div>
        <div className="container">
          <div className="title-container">
            <div className="wendy-one text-white text-4xl md:text-6xl lg:text-8xl font-semibold" style={{ color: '#D03714', fontSize: '4.3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', letterSpacing: '-0.05em', fontWeight: '500' }}>
              Resd List
            </div>
            <div className="wendy-one text-white text-4xl md:text-6xl lg:text-8xl font-semibold eligibility-text" style={{ color: '#A87612', fontSize: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', letterSpacing: '-0.05em', fontWeight: '300' }}>
              Check your OG / WL eligibility
            </div>
          </div>
          <input
            className="p-3 rounded-xl transition-all shadow-2xl wendy-one"
            onChange={(e) => setWallet(e.target.value.substring(0, 200))}
            value={wallet}
            name="wallet-input"
            type="text"
            placeholder="Enter Address!"
          />
          {!isVerifying ? (
            <button onClick={() => {
              if (isVerifying) { return }
              if (wallet === '') {
                toast('Enter your Wallet Address', { type: "warning", className: 'toast-message', progressClassName: 'toast-progress' })
                return
              }
              setIsVerifying(true)
              getEligibility(wallet).then((res) => {
                setIsVerifying(false)
                if (res) {
                  toast('Wallet Whitelisted!', { type: "success", className: 'toast-message', progressClassName: 'toast-progress' })
                } else {
                  toast('Wallet not Found!', { type: "error", className: 'toast-message', progressClassName: 'toast-progress' })
                }
              })
            }}
              className="wendy-one px-2 py-1 rounded-2xl shadow-xl bg-slate-500 text-xl md:text-3xl bg-opacity-60 transition-all hover:scale-[1.08] duration-[400ms] active:scale-100 hover:text-white hover:bg-opacity-100"
            >
              Verify
            </button>
          ) : (
            <Image priority={true} loading="eager" width={50} height={50} src={'/loader.png'} alt="loader" className="aspect-auto animate-spin" />
          )}
        </div>
        <ToastContainer
          style={{ zIndex: '1000000001', position: 'fixed' }}
          pauseOnHover
          position='bottom-center'
          limit={2}
        />
      </main>
    </>
  )
}

export default Home
