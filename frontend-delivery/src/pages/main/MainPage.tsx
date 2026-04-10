import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "@/cart/CartContext";

export const MainPage = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleShopNow = () => {
    navigate("/dashboard");
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/dashboard?category=${category.toLowerCase()}`);
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/cart");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-[#e7ebf3] dark:border-gray-800 px-4 md:px-10 lg:px-40 py-3">
        <div className="flex items-center justify-between gap-8 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-[#135bec]">
              <span className="material-symbols-outlined text-3xl font-bold">devices</span>
              <h2 className="text-[#0d121b] dark:text-white text-xl font-black leading-tight tracking-tight">TechStore</h2>
            </div>
            <div className="hidden lg:flex items-center gap-6 ml-4">
              <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('laptops')}>Laptops</a>
              <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('smartphones')}>Smartphones</a>
              <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('audio')}>Audio</a>
            </div>
          </div>
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#135bec] transition-colors">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="w-full bg-[#e7ebf3] dark:bg-gray-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-500" placeholder="Buscar gadgets..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300" onClick={() => navigate("/auth")}>
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300 relative" onClick={handleCartClick}>
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#135bec] text-white text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 md:px-10">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex flex-col gap-6 p-8 md:p-12 md:w-1/2">
                <div className="flex flex-col gap-3">
                  <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Nuevos Lanzamientos</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">El Futuro de la Tecnología, Hoy.</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">Descubre lo último en innovación móvil. Explora nuestra colección exclusiva de smartphones insignia con pantallas impresionantes y cámaras de nivel profesional.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleShopNow} className="bg-[#135bec] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Comprar Ahora
                  </button>
                  <button className="border border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 text-white dark:text-white">
                    <span className="material-symbols-outlined">info</span>
                    Saber Más
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[300px] md:h-[500px] bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://res.cloudinary.com/dhf1lhdbb/image/upload/v1769710630/escritorio-minimalista-1080x675_xghbjo.jpg")'}} />
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
          <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-lg transition-shadow group text-center">
            <h4 className="font-bold text-lg">Entrega Rápida</h4>
            <p className="text-sm text-gray-500">Envío gratis en pedidos mayores a $500</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-lg transition-shadow group text-center">
            <h4 className="font-bold text-lg">Pago Seguro</h4>
            <p className="text-sm text-gray-500">Pasarela de pago 100% segura</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-lg transition-shadow group text-center">
            <h4 className="font-bold text-lg">Soporte 24/7</h4>
            <p className="text-sm text-gray-500">Equipo de soporte dedicado</p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#135bec]">category</span>
              Categorías Destacadas
            </h2>
            <a 
              className="text-[#135bec] font-semibold text-sm hover:underline cursor-pointer flex items-center gap-1" 
              onClick={handleShopNow}
            >
              Ver Todas
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('laptops')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZRQvQwS62faCNFhxGsX77AOqOD_I9v9oBMjWKXdnnezcVJudMD96_THoFrKuBiRZVaas75eSh_hIUFP4APY1XQ5Gmh4gh8ihfCpmoexuAyoOf_wbO8bER-8V96r22-Tkk2DQxoF0AoSYtdcu3EgIo4QYqVzSn53ysRXGC-snNHNuAyzSCbRI-UZ1LE9vNljuhGWkr7tkQ-_eubzSiPtcLDjWdOpfk7w5EAEL-aEp5t2lzKHZZKw9xhWbrbFM54-TXHZXms3p5w")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Laptops</span>
              <span className="material-symbols-outlined text-xs text-gray-400">laptop</span>
            </div>
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('phones')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeIbVTIyWQVI8x5USyNw1aF62F6col0mgsWEJGB_7z3X2ZVxyEiuBAFQQagzmVmpQjubBdkzOKR5bnUSrZjl22IAuyObRoJ-n0xx9NVhhJ1Gb_IOfr5arn78kygBEwuTv3LlF_mP9FMd1cvFTgiI-Zq7yV0Y3DKv4A02dbLEvurAY43xJs5FrPy23uu-fQ_fijz-Mln3J9MXjb_pHm4HZMMq5KWKytJiX5buPk9GAXSRMNOdnFNHz420ajmJESZJWI00Bg0_2n6g")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Smartphones</span>
              <span className="material-symbols-outlined text-xs text-gray-400">smartphone</span>
            </div>
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('audio')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA0Gdsil5lcOt_WUM6ARgIEvM34hm--o78GWWm2IS88SeiRUk4BrZTQa3yHPurbM2muTCayCK5t7lthe12z9zFRwZSOLDqyde9XDjXtHEQoJz4Zhp2CKZWCmUMQYfuBfhVyZg64fbp9idpDkbWh2k98I76ahFlA6svLz4X6BEoAbO26PQf2lKuQzJoX30GHYiUKv9O9N_QD3tX9VYMt63AsdDEP2-HruDiKaFcz-1kmsaqj0xWhbw_vQk0uppKZ9ebgfRM9cP_qQ")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Audio</span>
              <span className="material-symbols-outlined text-xs text-gray-400">headset</span>
            </div>
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('appliances')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnShT2jvLaFCi1L0ThaLsE8icGpEFu8N2DMqOGLxOq-3pYHwSqtUHLE4Df2Fmh8R-v4KdKbRtBXyJA6ANtlxfbUrA-7HcETQtWptjShRqA9xcDzwqdzFPfq3guuFasf4dnBVMqj-RO24Sf3JqGC7rFEBivsg2hQQy6e72uk0lU75ym85HKeJpkNBrLz1XQFwUqzItgJz9iriMVYAjUfigzJL0mvWcYjPBRqk1sYjGlvWhuzQrMfIoHThzwppL9raeOp69oXgNOdA")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Electrodomésticos</span>
              <span className="material-symbols-outlined text-xs text-gray-400">kitchen</span>
            </div>
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('wearables')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5kLhSKUZ3_WnLEQhvJ7oBgU6ZRwVJelpIUi6JQmg_ukp4-4fBVZorZ-A5TmMPzoUTaaA7K-IbOLmd3Zqtx5LIQRTgobLTF2VKAvGMoReaq7NewkW-qQ_qbIjkAg95aHCSvynvD07WuHpCs7Nhp89414XNGuANURg6nH9SYZP4C0Nv_wo3MCp7fHeegzfws_P_O8pl-93C--ceFVzJ7YtFJewMpozPBHGRDpLgiqyOdyZ5MPehWDNlD3vT7JRtgrIvXFBdLwYVkQ")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Wearables</span>
              <span className="material-symbols-outlined text-xs text-gray-400">watch</span>
            </div>
            <div 
              className="group cursor-pointer flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleCategoryClick('gaming')}
            >
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <div 
                  className="size-full bg-cover bg-center" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPGP--F85S-BvGA8xT8fo5iXSlXYTUuFihsvVM2FgMZ05O3LObPY-3tHy1CS7KSoEN3MMYcmwEWLZwls8WMeNxroXeJSzROzKC1AU--TC7MqBpWga56HsmQBfx3LQifSjab9HSWj-ypW4TlbnPTuyY_sGfaH6xxynOqtcU--iCHtVnDUSd12UzZT4NpOxl1sxcnCu6haLEUhwCx_KIanlC8ilUI80QI_oZwUUQDA1d8aBbzPubG_kmlbWJVJjmgP1jb7Xte1Th5g")'
                  }}
                />
              </div>
              <span className="font-bold text-sm">Gaming</span>
              <span className="material-symbols-outlined text-xs text-gray-400">sports_esports</span>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#135bec]">local_offer</span>
              Ofertas Destacadas
            </h2>
            <div className="flex gap-2">
              <button className="size-10 flex items-center justify-center border border-[#e7ebf3] dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 flex items-center justify-center border border-[#e7ebf3] dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">REBAJA</div>
                <div 
                  className="size-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATvboikAoqitSeJdmLqsXrtUJvVcgVf5e0ixFzzq4OUyyxFZEO4Cus55NNZIAfgHR5Rb6V7q2hYLWgZwfYNO3eN2gH8lx5b8PibU2JeArBvdwDiH3WRlM1rrkhs0UnNW6H-YzO9nt1tqG3tdpOCZ6ALmX-WEBZLj-QuxJE4s9K6pOZwo4NWn6jcOXhiHfw3hgbi1Xd6Xbk9wSXlpiM0kWrClag4nY9WEJ1KREDDdn_rABW37BupRJCNp-7xIhQOssDjZmfwc11hA")'
                  }}
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[#135bec] transition-colors">Elite Audio Pro X</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star_half</span>
                    <span className="text-gray-400 text-xs ml-1">(128)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-[#135bec]">$299.00</span>
                    <span className="text-sm text-gray-400 line-through ml-2">$399.00</span>
                  </div>
                  <button className="size-10 flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-[#135bec]/20">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="size-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1wMBeJwa4JEBvRdejE-vTJeVCerTmiTAJzLC7TEoH_hboOeI5SAAo0FUJdGPPJWT8DNrb2E8s-0DmGxPnZOONCH5U6Di0kyN7gBPCHMYvVJKReJEn4v3p000RtjW1jvIQmjKWUFFIO6zB8OKz2cAfH8u0BWc9npMRE43zf3HdoILQCFoTANoMUQ1ZPfD1UMtEaBjybo6yk6Shf8UAbCiVNh3JQ1WkNrB-wnjuhEry7iQR2-XCkX1LUndm9Ra_kiOmJHtQVerBug")'
                  }}
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[#135bec] transition-colors">UltraBook 15" M2</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-gray-400 text-xs ml-1">(85)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-[#135bec]">$1,299.00</span>
                  </div>
                  <button className="size-10 flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-[#135bec]/20">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-3 right-3 bg-blue-100 text-[#135bec] text-xs font-bold px-2 py-1 rounded">NUEVO</div>
                <div 
                  className="size-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6ahM92WRXInMWRFEA4KHBZZc6DqwwrRuVrue2GcH3mw2beHWOUxkuGeN9fpCFIRjYXgFGq21ba3B3rs1LL-W9bv2Nognb73wgVA9MiR9G4wgGABhXdTjFcV-Vj49Opz3Zf651hNoE24TnI2niFuzT-gCTVjP4jq2yH9oHXMwQMRcagROG_qVRt8gX5r_wFV5W-AmM3GJ84LHZMZDdB0u0HR5YuyPPjUjBy5SnwRFs7N7QIlP9vqr4HFn4tdqPVWJR3TGWZDsRg")'
                  }}
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[#135bec] transition-colors">ProShot EOS R5</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm text-gray-300">star</span>
                    <span className="text-gray-400 text-xs ml-1">(42)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-[#135bec]">$2,450.00</span>
                  </div>
                  <button className="size-10 flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-[#135bec]/20">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="size-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZMRJCXRKGThs12loJKAP01sK46E6I5vAt2xT2dYn-qdVVv3mZcDsWxZNDuG7KIQhCsHVaTHpR5kI4NqPkEqsPWEgVrtxazei1BWE9HCeEYO7pP6sMBYaxAAjj9_B1ODc2-nRQ7AsD8cG2OC7xRGqU4ZAA4x1ygJyUZBo7rRqVoUYFS02BuaIalmEGN_w6FTnutVOJgze7fQqm5iCTiYrYFD6ZncdK7JJFzoUrTpuaDPS5s9zRaBvC_vTp3YNX5yvozA5KPak0mg")'
                  }}
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[#135bec] transition-colors">CurveMaster 34" Ultrawide</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-gray-400 text-xs ml-1">(203)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-[#135bec]">$649.00</span>
                  </div>
                  <button className="size-10 flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-[#135bec]/20">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-950 border-t border-[#e7ebf3] dark:border-gray-900 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[#135bec]">
                <span className="material-symbols-outlined text-3xl font-bold">devices</span>
                <h2 className="text-[#0d121b] dark:text-white text-xl font-black">TechStore</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">Tu destino único para lo último en electrónica y electrodomésticos inteligentes. Ofrecemos productos de alta calidad de las mejores marcas mundiales.</p>
              <div className="flex gap-4">
                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                  <span className="material-symbols-outlined text-xl">public</span>
                </a>
                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                  <span className="material-symbols-outlined text-xl">chat</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[#135bec]">shopping_bag</span>
                Tienda
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('laptops')}>Laptops y PC</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('smartphones')}>Smartphones</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('appliances')}>Electrodomésticos</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => handleCategoryClick('accessories')}>Accesorios</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={handleShopNow}>Ofertas Flash</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[#135bec]">support_agent</span>
                Soporte
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Centro de Ayuda</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Seguimiento de Pedidos</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Información de Envío</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Devoluciones y Reembolsos</a></li>
                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/auth")}>Contáctanos</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[#135bec]">campaign</span>
                Boletín
              </h4>
              <p className="text-sm text-gray-500">Suscríbete para obtener ofertas especiales y ofertas únicas de por vida.</p>
              <div className="flex gap-2">
                <input className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-[#135bec] outline-none" placeholder="Tu email" type="email" />
                <button className="bg-[#135bec] text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">© 2024 TechStore Electronics. Presentación del Proyecto Universitario.</p>
            <div className="flex gap-6">
              <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Política de Privacidad</span>
              <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Términos de Servicio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
